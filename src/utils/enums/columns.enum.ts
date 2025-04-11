export enum JiraEpicColumn {
  JIRA = "Jira",
  EPIC = "Epic",
  DESCRIPTION = "Description",
  COMPONENT = "Component",
  SPRINT = "Sprint",
  EFFORT_ESTIMATION = "Effort estimation (Hours)",
  ACTUAL_EFFORT_ESTIMATION = "Actual Effort estimation (Hours)",
  JIRA_STATUS = "JIRA Status",
  OWNER = "Owner",
  TYPE = "Type",
  PR_STATUS = "PR Status",
  REVIEWER = "Reviewer",
  COMMENTS = "Comments",
  START_DATE = "Start date",
  END_DATE = "End date",
  UNIT_TEST_CASES = "Unit Test cases",
  CYPRESS_TEST_CASES = "Cypress Test cases",
  FEASIBILITY_REQUIRED = "Feasibility required?",
}

export type SheetData = {
  [JiraEpicColumn.JIRA]: string;
  [JiraEpicColumn.EPIC]: string;
  [JiraEpicColumn.DESCRIPTION]: string;
  [JiraEpicColumn.COMPONENT]: string;
  [JiraEpicColumn.SPRINT]: string;
  [JiraEpicColumn.EFFORT_ESTIMATION]: number;
  [JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]: number;
  [JiraEpicColumn.JIRA_STATUS]: string;
  [JiraEpicColumn.OWNER]: string;
  [JiraEpicColumn.TYPE]: string;
  [JiraEpicColumn.PR_STATUS]: string;
  [JiraEpicColumn.REVIEWER]: string;
  [JiraEpicColumn.COMMENTS]: string;
  [JiraEpicColumn.START_DATE]: number;
  [JiraEpicColumn.END_DATE]: number;
  [JiraEpicColumn.UNIT_TEST_CASES]: string;
  [JiraEpicColumn.CYPRESS_TEST_CASES]: string;
  [JiraEpicColumn.FEASIBILITY_REQUIRED]: string;
};

export type EpicsDataType = {
  data: Record<string, string>[];
  headers: string[];
  sheetName: string;
};
