import { SheetData, JiraEpicColumn } from "../enums/columns.enum";
import { safeParseNumber } from "./sharedUtils";

export type SprintData = {
  [epic: string]: { estimated: number; actual: number };
};

export type SprintWiseData = {
  [sprint: string]: SprintData;
};

type SprintAndUniqueEpicData = {
  sprintWiseData: SprintWiseData;
  uniqueEpic: string[];
};

export const getSprintWiseData = (
  data: SheetData[],
  uniqueSprint: string[]
): SprintAndUniqueEpicData => {
  const sprintWiseData: SprintWiseData = {};
  const uniqueEpic: string[] = [];

  uniqueSprint.forEach((sprint) => {
    const sprintData = data.filter((row) => row.Sprint === sprint && row.Jira);
    const epicData: SprintData = {};

    sprintData.forEach((row) => {
      const epic = row.Epic || "Unknown Epic";
      const actual = safeParseNumber(
        row[JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]
      );
      const estimated = safeParseNumber(row[JiraEpicColumn.EFFORT_ESTIMATION]);
      uniqueEpic.push(epic);
      if (!epicData[epic]) {
        epicData[epic] = { estimated: 0, actual: 0 };
      }

      epicData[epic].estimated += estimated;
      epicData[epic].actual += actual;
    });

    sprintWiseData[sprint] = epicData;
  });

  return { sprintWiseData, uniqueEpic };
};

export const getHours = (number: number) => {
  return safeParseNumber(number) / 8;
};

export enum FILTER {
  SHOW_ESTIMATION = "Show Estimated Capacity",
  SHOW_ACTUAL = "Show Actual Capacity",
  SHOW_BOTH = "Show Difference",
}

export const processSprintCapacity = (
  sprintCapacity: Record<string, string>[],
  sprints: string[]
) => {
  const extractedData = sprintCapacity.map((d) => ({
    name: d.Epics,
  })) as Record<string, any>[];

  sprintCapacity.map((data: any, i) => {
    const keys = Object.keys(data);
    sprints.forEach((sprint) => {
      const sprintNumber = sprint.at(-1);
      const matchedKey =
        keys.find((key) => key.includes(`S${sprintNumber}`)) ?? "";
      extractedData[i][sprint] = data[matchedKey];
    });
  });

  return extractedData;
};

export const processData = (
  data: SheetData[],
  capacityData: Record<string, string>[],
  sprints: string[]
) => {
  const { sprintWiseData } = getSprintWiseData(data, sprints);
  const extractedData = capacityData.map((d) => ({
    epic: d.Epics,
    estimatedDays: d?.["Estimated (days)"],
  })) as Record<string, any>[];

  extractedData.map((data: any) => {
    const epic = data.epic;
    let totalActualDays = 0;
    let totalEstimatedDays = 0;
    sprints.map((sprint) => {
      const sprintWiseDataEpicKeys = Object.keys(sprintWiseData[sprint]);
      const matchedIndex = sprintWiseDataEpicKeys.findIndex((sprintEpic) =>
        epic.includes(sprintEpic)
      );
      const sprintData = structuredClone(sprintWiseData[sprint]);
      const epicData = sprintData[sprintWiseDataEpicKeys[matchedIndex]];
      totalActualDays += safeParseNumber(epicData?.actual);
      totalEstimatedDays += safeParseNumber(epicData?.estimated);

      data[sprint] = {
        estimated: safeParseNumber(epicData?.estimated),
        actual: safeParseNumber(epicData?.actual),
      };
    });
    data["totalPlannedDays"] = {
      actual: totalActualDays,
      estimated: totalEstimatedDays,
    };
    data["difference"] = {
      actual: data.estimatedDays - getHours(totalActualDays),
      estimated: data.estimatedDays - getHours(totalEstimatedDays),
    };
  });
  return extractedData;
};
