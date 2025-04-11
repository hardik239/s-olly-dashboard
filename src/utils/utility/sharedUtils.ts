import moment from "moment";
import { JiraEpicColumn, SheetData } from "../enums/columns.enum";
import { IProcessedSheetRow } from "../types/ProcessSheetRow.type";
import { UserStats } from "../../pages/user-details";
import { MRType, TicketTypeEnum } from "../enums/ticket.enum";
import { jiraIssueBaseURL } from "../consts";

const getCodeReviewHours = (sprintData: SheetData[], key: JiraEpicColumn) => {
  const codeReviewHoursByUser: Record<string, number> = {};

  // Iterate over each object in the data array
  sprintData.forEach((item) => {
    // Extract the reviewer and code review status
    const { Owner, [key]: Effort } = item;
    const userName = Owner.toLowerCase();

    // If it's a code review ticket
    if (isCodeReviewTicket(item)) {
      // Split the reviewers by comma and trim any whitespace

      // Iterate over each reviewer
      // If the reviewer already exists in the object, add the effort, otherwise initialize it
      codeReviewHoursByUser[userName] =
        (codeReviewHoursByUser[userName] || 0) + safeParseNumber(Effort);
    }
  });

  const totalCodeReviewHours = Object.values(codeReviewHoursByUser).reduce(
    (total, hours) => total + hours,
    0
  );
  // Output the code review hours by each user and the total
  codeReviewHoursByUser["total"] = totalCodeReviewHours;

  return codeReviewHoursByUser;
};

const getEpicHours = (
  sprintData: SheetData[],
  column: JiraEpicColumn
): Record<string, number> => {
  return sprintData.reduce((acc, row) => {
    const epic = row.Epic || "Unknown Epic";
    const hours = safeParseNumber(row[column as unknown as JiraEpicColumn]);
    acc[epic] = (acc[epic] || 0) + (Number(hours) || 0);
    return acc;
  }, {} as Record<string, number>);
};

export const processSheetData = (data: SheetData[]): IProcessedSheetRow[] => {
  // Extract unique users and sprints from the data
  const users = getUniqueValues(data, JiraEpicColumn.OWNER);
  const sprints = getUniqueValues(data, JiraEpicColumn.SPRINT);

  // Process each sprint
  return sprints.map((sprint) => processSprint(data, sprint, users));
};

// Function to extract unique values for a given key from the data
export const getUniqueValues = (
  data: SheetData[],
  key: keyof SheetData
): string[] => {
  if (key === JiraEpicColumn.OWNER) {
    return [
      ...new Set(data.map((row) => (row[key] ?? "").toLowerCase())),
    ].filter(Boolean) as string[];
  }
  return [...new Set(data.map((row) => row[key]))]
    .filter(Boolean)
    .filter((v) => (v as string).trim().length) as string[];
};

// Function to process each sprint
export const processSprint = (
  data: SheetData[],
  sprint: string,
  users: string[]
): IProcessedSheetRow => {
  const sprintData = getSprintData(data, sprint);
  const estimatedReviewHoursByUser =
    getCodeReviewHours(sprintData, JiraEpicColumn.EFFORT_ESTIMATION) || {};
  const actualReviewHoursByUser =
    getCodeReviewHours(sprintData, JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION) ||
    {};

  const totalSP = getTotalStoryPoints(sprintData);

  const { noOfHours, estimatedHours } =
    getTotalAndEstimatedEffortHours(sprintData);

  const userTickets = getUserTickets(sprintData, users);

  const epicEstimatedHours = getEpicHours(
    sprintData,
    JiraEpicColumn.EFFORT_ESTIMATION
  );
  const epicActualHours = getEpicHours(
    sprintData,
    JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION
  );

  const getUserEfforts = (
    sprintData: SheetData[],
    users: string[],
    isEstimated: boolean
  ): Record<string, number> => {
    return users.reduce((acc, user) => {
      const hours = sprintData
        .filter((row) => row.Owner.toLowerCase() === user && row.Jira)
        .reduce(
          (sum, row) =>
            sum +
            safeParseNumber(
              row[
                isEstimated
                  ? JiraEpicColumn.EFFORT_ESTIMATION
                  : JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION
              ]
            ),
          0
        );
      acc[user] = hours;
      return acc;
    }, {} as Record<string, number>);
  };

  const userEfforts = getUserEfforts(sprintData, users, false);
  const estimatedUserEfforts = getUserEfforts(sprintData, users, true);

  const taskByCategory = {
    Story: 0,
    Task: 0,
    Bug: 0,
    [TicketTypeEnum.SPIKE_STORY]: 0,
    [TicketTypeEnum.SPIKE_TASK]: 0,
  };

  sprintData.map((ticket) => {
    switch (ticket.Type) {
      case TicketTypeEnum.STORY:
        taskByCategory.Story++;
        break;
      case TicketTypeEnum.TASK:
        taskByCategory.Task++;
        break;
      case TicketTypeEnum.BUG:
        taskByCategory.Bug++;
        break;
      case TicketTypeEnum.SPIKE_STORY:
        taskByCategory[TicketTypeEnum.SPIKE_STORY]++;
        break;
      case TicketTypeEnum.SPIKE_TASK:
        taskByCategory[TicketTypeEnum.SPIKE_TASK]++;
        break;
      default:
        break;
    }
  });
  return {
    sprint,
    noOfSP: Math.round(totalSP),
    noOfHours,
    userTickets,
    userEfforts,
    estimatedHours,
    estimatedUserEfforts,
    estimatedReviewHoursByUser,
    actualReviewHoursByUser,
    epicEstimatedHours,
    epicActualHours,
    taskByCategory,
  };
};

// Function to filter sprint data based on sprint name
const getSprintData = (data: SheetData[], sprint: string): SheetData[] => {
  return data.filter((row) => row.Sprint === sprint && row.Jira);
};

// Function to calculate total story points for the sprint
const getTotalStoryPoints = (sprintData: SheetData[]): number => {
  return (
    sprintData.reduce((sum, row) => {
      return (
        sum +
        (row[JiraEpicColumn.EFFORT_ESTIMATION] &&
        row[JiraEpicColumn.EFFORT_ESTIMATION]! > 6
          ? row[JiraEpicColumn.EFFORT_ESTIMATION]!
          : 0)
      );
    }, 0) / 8
  );
};

// Function to calculate total and estimated effort hours for the sprint
const getTotalAndEstimatedEffortHours = (
  sprintData: SheetData[]
): { noOfHours: number; estimatedHours: number } => {
  const noOfHours = sprintData.reduce(
    (sum, row) =>
      sum + safeParseNumber(row[JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]),
    0
  );
  const estimatedHours = sprintData.reduce(
    (sum, row) => sum + safeParseNumber(row[JiraEpicColumn.EFFORT_ESTIMATION]),
    0
  );
  return { noOfHours, estimatedHours };
};

// Functions to calculate user tickets and efforts
const getUserTickets = (
  sprintData: SheetData[],
  users: string[]
): Record<string, Set<string>> => {
  const userTickets = {} as Record<string, Set<string>>;
  users.map((user) => {
    const tickets = sprintData.filter(
      (row) =>
        row.Owner.toLowerCase() === user && row.Jira && !isCodeReviewTicket(row)
    );
    const ticketIds = tickets.map((ticket) => ticket[JiraEpicColumn.JIRA]);
    userTickets[user] = new Set(ticketIds);
  });
  return userTickets;
};

export const formatDate = (serialDate: number): string => {
  // Convert serial date to milliseconds since January 1, 1970
  const milliseconds = (serialDate - 25569) * 24 * 60 * 60 * 1000;
  // Create a new Date object
  const date = new Date(milliseconds);
  // Format date using Moment.js
  return moment(date).format("Do MMM YYYY");
};

export const safeParseNumber = (number: string | number): number => {
  return isNaN(+number) ? 0 : +number;
};

export const calculateUserStats = (
  tickets: SheetData[],
  username?: string
): UserStats => {
  const userStats: UserStats = {
    totalTickets: new Set<string>(),
    totalEstimatedHours: 0,
    totalActualHours: 0,
    totalReviewedTickets: new Set<string>(),
    estimatedReviewHours: 0,
    actualReviewHours: 0,
    sprintStats: {},
    averageEffortEstimationAccuracy: 0,
    components: [],
    epics: [],
    totalStories: new Set<string>(),
    totalTasks: new Set<string>(),
    totalBugs: new Set<string>(),
  };

  const componentMap: { [component: string]: number } = {};
  const epicMap: { [epic: string]: number } = {};

  tickets.forEach((ticket) => {
    if (
      ticket &&
      (username
        ? ticket[JiraEpicColumn.OWNER]?.toLowerCase() === username
        : true)
    ) {
      // Count type of tickets
      if (
        (ticket[JiraEpicColumn.TYPE] === TicketTypeEnum.TASK &&
          ticket[JiraEpicColumn.PR_STATUS] === MRType.MERGED) ||
        ticket[JiraEpicColumn.TYPE] === TicketTypeEnum.SPIKE_TASK
      ) {
        userStats.totalTasks?.add(ticket[JiraEpicColumn.JIRA]);
      }
      if (
        (ticket[JiraEpicColumn.TYPE] === TicketTypeEnum.STORY &&
          ticket[JiraEpicColumn.PR_STATUS] === MRType.MERGED) ||
        ticket[JiraEpicColumn.TYPE] === TicketTypeEnum.SPIKE_STORY
      ) {
        userStats.totalStories?.add(ticket[JiraEpicColumn.JIRA]);
      }
      if (
        ticket[JiraEpicColumn.TYPE] === TicketTypeEnum.BUG &&
        ticket[JiraEpicColumn.PR_STATUS] === MRType.MERGED
      ) {
        userStats.totalBugs?.add(ticket[JiraEpicColumn.JIRA]);
      }

      // Calculate stats for each ticket
      if (!isCodeReviewTicket(ticket)) {
        userStats.totalTickets.add(ticket[JiraEpicColumn.JIRA]);
      }
      userStats.totalEstimatedHours += safeParseNumber(
        ticket[JiraEpicColumn.EFFORT_ESTIMATION]
      );
      userStats.totalActualHours += safeParseNumber(
        ticket[JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]
      );

      // Helper function to get top components worked on
      if (!componentMap[ticket.Component]) {
        componentMap[ticket.Component] = 1;
      } else {
        componentMap[ticket.Component]++;
      }

      // Helper function to get top epics or projects contributed to
      if (!epicMap[ticket.Epic]) {
        epicMap[ticket.Epic] = 1;
      } else {
        epicMap[ticket.Epic]++;
      }

      // Calculate stats for each sprint
      if (!userStats.sprintStats[ticket.Sprint]) {
        userStats.sprintStats[ticket.Sprint] = {
          totalTickets: new Set(),
          estimatedHours: 0,
          actualHours: 0,
          totalEstimatedReviewHours: 0,
          totalActualReviewHours: 0,
          totalReviewedTickets: new Set(),
        };
      }

      if (isCodeReviewTicket(ticket)) {
        userStats.totalReviewedTickets.add(ticket[JiraEpicColumn.JIRA]);
        userStats.estimatedReviewHours += safeParseNumber(
          ticket[JiraEpicColumn.EFFORT_ESTIMATION]
        );
        userStats.actualReviewHours += safeParseNumber(
          ticket[JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]
        );
        userStats.sprintStats[ticket.Sprint].totalReviewedTickets.add(
          ticket[JiraEpicColumn.JIRA]
        );
        userStats.sprintStats[ticket.Sprint].totalEstimatedReviewHours +=
          safeParseNumber(ticket[JiraEpicColumn.EFFORT_ESTIMATION]);
        userStats.sprintStats[ticket.Sprint].totalActualReviewHours +=
          safeParseNumber(ticket[JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]);
      }
      if (!isCodeReviewTicket(ticket)) {
        userStats.sprintStats[ticket.Sprint].totalTickets.add(
          ticket[JiraEpicColumn.JIRA]
        );
      }
      userStats.sprintStats[ticket.Sprint].estimatedHours += safeParseNumber(
        ticket[JiraEpicColumn.EFFORT_ESTIMATION]
      );
      userStats.sprintStats[ticket.Sprint].actualHours += safeParseNumber(
        ticket[JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]
      );
    }
  });

  // Iterate through tickets again to calculate reviewed tickets and hours

  userStats.averageEffortEstimationAccuracy =
    (userStats.totalActualHours / userStats.totalEstimatedHours) * 100;
  userStats.components = Object.entries(componentMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((entry) => entry[0]);
  userStats.epics = Object.entries(epicMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((entry) => entry[0]);

  return userStats;
};

export function toCapitalCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const removeUndefinedColumns = (data: SheetData[]): SheetData[] => {
  return data.filter((row) => row[JiraEpicColumn.JIRA] !== undefined);
};

export const getInitials = (name: string) => {
  return name
    .toUpperCase()
    .split(" ")
    .map((v) => v[0])
    .join("");
};

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export const removeUndefinedRows = (data: SheetData[]): SheetData[] => {
  return data.filter((row) => row.Jira);
};

export const isCodeReviewTicket = (ticket: SheetData) =>
  ticket[JiraEpicColumn.TYPE] === TicketTypeEnum.MR;

export const bytesToMegaBytes = (bytes: number, digits: number) =>
  (bytes / (1024 * 1024)).toFixed(digits);

export const redirectUser = (data: Set<unknown>) => {
  if (data.size !== 0) {
    const link = getJiraLink(data);
    window.open(link, "_blank");
  }
};

export const getJiraLink = (data: Set<unknown>) => {
  return `${jiraIssueBaseURL}(${encodeURIComponent([...data].join(", "))})`;
};
