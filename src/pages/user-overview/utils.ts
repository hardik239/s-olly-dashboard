import { SheetData } from "../../utils/enums/columns.enum";
import { calculateUserStats } from "../../utils/utility/sharedUtils";
import { UserStats } from "../user-details";

export type ChartDataType = {
  totalTickets: number[];
  estimatedHours: number[];
  actualHours: number[];
  reviewedTickets: number[];
  actualReviewHours: number[];
};

export const getChipData = (data: string[]): string[] => {
  const values = [] as string[];
  data.map((value) => {
    if (value === "-" || !value || value === "undefined") {
      return null;
    }
    if (typeof value === "string" && value.includes(",")) {
      return values.push(...getChipData(value.split(",")));
    }
    return values.push(value);
  });
  return [...new Set(values)];
};

export const getUserStats = (data: SheetData[]) => {
  const groupedByUser = data.reduce((acc, ticket) => {
    const owner = ticket.Owner?.toLowerCase();
    if (owner) {
      if (!acc[owner]) {
        acc[owner] = [];
      }
      acc[owner].push(ticket);
    }
    return acc;
  }, {} as { [owner: string]: SheetData[] });

  const userStats: { [owner: string]: UserStats } = {};
  for (const owner in groupedByUser) {
    const tickets = groupedByUser[owner];
    userStats[owner] = calculateUserStats(tickets);
  }
  return userStats;
};

export const getChartData = (
  userStats: { [owner: string]: UserStats },
  usernames: string[]
) => {
  const data: ChartDataType = {
    totalTickets: [],
    estimatedHours: [],
    actualHours: [],
    reviewedTickets: [],
    actualReviewHours: [],
  };
  usernames.forEach((username) => {
    data.totalTickets.push(userStats[username].totalTickets.size);
    data.estimatedHours.push(userStats[username].totalEstimatedHours);
    data.actualHours.push(userStats[username].totalActualHours);
    data.reviewedTickets.push(userStats[username].totalReviewedTickets.size);
    data.actualReviewHours.push(userStats[username].actualReviewHours);
  });
  return data;
};
