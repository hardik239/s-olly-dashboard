import ExcelJS, { CellHyperlinkValue } from "exceljs";
import { saveAs } from "file-saver";
import {
  COLUMN,
  createHyperlink,
  createUndefinedArray,
  listOfWSRColumns,
} from "../../utils/utils";
import { jiraBaseURL, jiraIssueBaseURL } from "../../utils/consts";
import { DynamicFilter } from ".";
import { StatusType, TicketTypeEnum } from "../../utils/enums/ticket.enum";
import { JiraEpicColumn, SheetData } from "../../utils/enums/columns.enum";

const filterByJira = (data: unknown[][]) => {
  const uniqueData = data.filter((row, index) => {
    const jiraIndex = listOfWSRColumns.indexOf(COLUMN.JIRA);
    if (jiraIndex !== -1) {
      const currentJira = row[jiraIndex] as CellHyperlinkValue | string;
      if (typeof currentJira === "string") {
        return (
          index ===
          data.findIndex((r) => {
            if (
              typeof r[jiraIndex] === "string" &&
              r[jiraIndex] === currentJira
            ) {
              r[jiraIndex] = createHyperlink(
                currentJira,
                `${jiraBaseURL}${currentJira}`
              );
              return true;
            } else {
              const cell = r[jiraIndex] as CellHyperlinkValue;
              if (cell.text === currentJira) {
                return true;
              }
            }
            return false;
          })
        );
      }
      // Check if the current Jira ticket is not present in previous rows
      return (
        index ===
        data.findIndex((r) => {
          const cell = r[jiraIndex] as CellHyperlinkValue;
          if (cell.text === currentJira.text) {
            return true;
          }
          return false;
        })
      );
    }
    return true; // If "Jira" column is not found, consider row unique
  });
  return uniqueData;
};

const filterBlockedTickets = (data: SheetData[]) => {
  return data.filter((row) => {
    return (
      row[JiraEpicColumn.JIRA_STATUS] !== StatusType.BLOCKED &&
      row[JiraEpicColumn.EFFORT_ESTIMATION] !== 0
    );
  });
};

const filterByRequiredColumns = (data: SheetData[]) => {
  const headers = Object.keys(data[0]);
  // Filter out blocked tickets
  const actualData = filterBlockedTickets(data);

  const indices = listOfWSRColumns
    .map((name) => headers.indexOf(name))
    .filter((index) => index !== -1);

  return actualData.map((row) => {
    return indices.map((index) => {
      const key = listOfWSRColumns.find(
        (columnKey) => columnKey === headers[index]
      ) as unknown as keyof SheetData;
      return row[key];
    });
  });
};

const filterBySprint = (data: unknown[][], sprintName: string) => {
  const sprintIndex = listOfWSRColumns.indexOf(COLUMN.SPRINT);
  const sprintData = data.filter((row) => {
    const actualSprint = row[sprintIndex] as string;
    return (actualSprint || "")
      .toLowerCase()
      .includes(sprintName.toLowerCase());
  });
  return sprintData;
};

const createAggregateLink = (data: unknown[][], sprintName: string) => {
  const bugsData = new Set("");
  const nonBugsData = new Set("");
  const wsrSprintNumber = parseInt(sprintName.at(-1) ?? "");
  const jiraIndex = listOfWSRColumns.indexOf(COLUMN.JIRA);
  const sprintIndex = listOfWSRColumns.indexOf(COLUMN.SPRINT);
  const typeIndex = listOfWSRColumns.indexOf(COLUMN.TYPE);

  data.map((r) => {
    const JiraHyperLinks = r[jiraIndex] as CellHyperlinkValue | string;

    if (JiraHyperLinks) {
      const currentSprint = (r[sprintIndex] as string) ?? "";
      const currentSprintNumber = parseInt(currentSprint?.at(-1) ?? "");
      const jiraTicket =
        typeof JiraHyperLinks === "string"
          ? JiraHyperLinks
          : JiraHyperLinks.text;

      if (
        currentSprintNumber <= wsrSprintNumber &&
        r[typeIndex] !== TicketTypeEnum.MR
      ) {
        if (r[typeIndex] !== TicketTypeEnum.BUG) {
          nonBugsData.add(jiraTicket);
        } else {
          bugsData.add(jiraTicket);
        }
      }
    }
  });
  const noOfStoriesLink = `${jiraIssueBaseURL}(${encodeURIComponent(
    [...nonBugsData].join(", ")
  )})`;
  const noOfBugsLink = `${jiraIssueBaseURL}(${encodeURIComponent(
    [...bugsData].join(", ")
  )})`;
  const noOfStoriesLabel = "Total No. Of Stories Resolved:";
  const noOfBugsLabel = "Total No. Of Defects Fixed:";

  return [
    [],
    ["Summary Report:", ...createUndefinedArray(7)],
    [
      noOfStoriesLabel,
      [],
      createHyperlink(nonBugsData.size.toString(), noOfStoriesLink),
      ...createUndefinedArray(5),
    ],
    [
      noOfBugsLabel,
      [],
      createHyperlink(bugsData.size.toString(), noOfBugsLink),
      ...createUndefinedArray(5),
    ],
    [],
  ];
};

const prepareAggregateData = (data: unknown[][]) => {
  const bugsData: unknown[][] = [];
  const nonBugsData: unknown[][] = [];
  const typeIndex = listOfWSRColumns.indexOf(COLUMN.TYPE);

  for (const row of data) {
    if (typeIndex !== -1) {
      if (row[typeIndex] !== TicketTypeEnum.BUG) {
        nonBugsData.push(row);
      } else {
        bugsData.push(row);
      }
    }
  }

  const noOfStoriesLink = getNoOfJiraLink(nonBugsData);
  const noOfBugsLink = getNoOfJiraLink(bugsData);
  const noOfStoriesLabel = "No. Of Stories";
  const noOfBugsLabel = "No. Of Defects Fixed";

  return [
    [],
    [
      ...createUndefinedArray(3),
      noOfStoriesLabel,
      createHyperlink(nonBugsData.length.toString(), noOfStoriesLink),
      ...createUndefinedArray(3),
    ],
    ...nonBugsData,
    bugsData.length > 0
      ? [
          ...createUndefinedArray(3),
          noOfBugsLabel,
          createHyperlink(bugsData.length.toString(), noOfBugsLink),
          ...createUndefinedArray(3),
        ]
      : [],
    ...bugsData,
  ];
};

const replaceDynamicFilters = (
  data: unknown[][],
  dynamicFilters: DynamicFilter[]
) => {
  const ownerIndex = listOfWSRColumns.indexOf(COLUMN.OWNER);
  dynamicFilters.map((filter) => {
    if (filter.name && filter.value) {
      data.map((row) => {
        if (row[ownerIndex] === filter.name) {
          row[ownerIndex] = filter.value;
        }
        return row;
      });
    }
  });

  return data;
};

const getNoOfJiraLink = (data: unknown[][]) => {
  const jiraIndex = listOfWSRColumns.indexOf(COLUMN.JIRA);
  const JiraHyperLinks = data.map((d) => d[jiraIndex]) as CellHyperlinkValue[];
  const jiraIDS = JiraHyperLinks.map((j) => j.text);

  return `${jiraIssueBaseURL}(${encodeURIComponent(jiraIDS.join(", "))})`;
};

const addStylesToHeader = (worksheet: ExcelJS.Worksheet) => {
  worksheet.columns = [
    {
      header: COLUMN.JIRA,
      key: COLUMN.JIRA,
      width: 20,
      font: {
        bold: true,
      },
    },
    { header: COLUMN.SPRINT, key: COLUMN.SPRINT, width: 30 },
    { header: COLUMN.TYPE, key: COLUMN.TYPE, width: 10 },
    { header: COLUMN.PR_STATUS, key: COLUMN.PR_STATUS, width: 30 },
    { header: COLUMN.JIRA_STATUS, key: COLUMN.JIRA_STATUS, width: 30 },
    { header: COLUMN.OWNER, key: COLUMN.OWNER, width: 30 },
    { header: COLUMN.REVIEWER, key: COLUMN.REVIEWER, width: 30 },
    { header: COLUMN.COMMENTS, key: COLUMN.COMMENTS, width: 30 },
  ];
  return worksheet;
};

const processData = (
  data: unknown[][],
  sprintName: string,
  dynamicFilters: DynamicFilter[]
) => {
  // Filter data based on the "Sprint" column
  const filteredSprintData = filterBySprint(data, sprintName);

  // Filter out duplicate rows based on the "Jira" column
  const filteredJiraData = filterByJira(filteredSprintData);

  // replace dynamic filters
  const filteredData = replaceDynamicFilters(filteredJiraData, dynamicFilters);

  // Move all Bugs to end of report, append WSR header and add aggregate links
  return [...prepareAggregateData(filteredData)];
};

export const prepareSheetToDownload = async (
  data: SheetData[],
  sprintName: string,
  sheetName: string,
  dynamicFilters: DynamicFilter[]
) => {
  try {
    // Create new workbook and worksheet
    const newWorkbook = new ExcelJS.Workbook();
    const newWorksheet = newWorkbook.addWorksheet(sprintName);
    const filteredColumnData = filterByRequiredColumns(data);
    const linksTemplate = createAggregateLink(filteredColumnData, sprintName);
    const processedData = processData(
      filteredColumnData,
      sprintName,
      dynamicFilters
    );

    newWorksheet.addRows(processedData);
    addStylesToHeader(newWorksheet);

    newWorksheet.insertRow(0, linksTemplate[0]);
    newWorksheet.insertRow(1, linksTemplate[1]);
    newWorksheet.insertRow(2, linksTemplate[2]);
    newWorksheet.insertRow(3, linksTemplate[3]);
    newWorksheet.insertRow(4, linksTemplate[4]);

    newWorksheet.mergeCells("A1", "B1");
    newWorksheet.mergeCells("A2", "B2");
    newWorksheet.mergeCells("A3", "B3");
    newWorksheet.mergeCells("A4", "B4");

    newWorkbook.xlsx
      .writeBuffer({
        useStyles: true,
      })
      .then((buffer) => {
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        saveAs(blob, `WSR of ${sheetName} for ${sprintName}.xlsx`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
