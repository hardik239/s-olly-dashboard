import { CellHyperlinkValue } from "exceljs";

export enum COLUMN {
  JIRA = "Jira",
  SPRINT = "Sprint",
  TYPE = "Type",
  OWNER = "Owner",
  REVIEWER = "Reviewer",
  COMMENTS = "Comments",
  STATUS = "Status",
  PR_STATUS = "PR Status",
  MR_STATUS = "MR Status",
  JIRA_STATUS = "JIRA Status",
}

export const listOfWSRColumns = [
  COLUMN.JIRA,
  COLUMN.SPRINT,
  COLUMN.TYPE,
  COLUMN.PR_STATUS,
  COLUMN.JIRA_STATUS,
  COLUMN.OWNER,
  COLUMN.REVIEWER,
  COLUMN.COMMENTS,
];

export const createUndefinedArray = (count: number): undefined[] => {
  return Array(count).fill(undefined);
};

export const createHyperlink = (
  text: string,
  link: string
): CellHyperlinkValue => {
  return {
    text: text,
    hyperlink: link,
    tooltip: text,
  };
};

export const getLinkFormatter = (text: string, link: string) => {
  return {
    t: text,
    v: text,
    l: { Target: link, Tooltip: text },
  };
};

export const createSlug = (slug: string) => {
  return slug.toLocaleLowerCase().split(" ").join("-");
};

export const decodeSlug = (slug: string) => {
  return slug.split("-").join(" ");
};

export const beautifySlug = (slug: string) => {
  return slug.replace(" ", "+").toLowerCase();
};

export const navItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
    matchKey: "dashboard",
    exact: true,
  },
  {
    title: "Capacity Planning",
    to: "/dashboard/capacity-planning",
    matchKey: "capacity-planning",
  },
  {
    title: "Sprint Overview",
    to: "/dashboard/sprint-overview",
    matchKey: "sprint-overview",
  },
  {
    title: "User Overview",
    to: `/dashboard/user-overview`,
    matchKey: "user-overview",
  },
  {
    title: "WSR Report",
    to: `/dashboard/wsr-report`,
    matchKey: "wsr-report",
  },
];
