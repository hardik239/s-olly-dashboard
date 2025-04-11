export interface IProcessedSheetRow {
  sprint: string;
  noOfSP: number;
  noOfHours: number;
  userTickets: Record<string, Set<string>>;
  userEfforts: Record<string, number>;
  estimatedHours: number;
  estimatedReviewHoursByUser: Record<string, number>;
  actualReviewHoursByUser: Record<string, number>;
  epicEstimatedHours: Record<string, number>;
  epicActualHours: Record<string, number>;
  estimatedUserEfforts: Record<string, number>;
  taskByCategory: Record<string, number>;
}
