import { createContext } from "react";
import { SheetData } from "../utils/enums/columns.enum";

export type Data = {
  teams: string[];
  tickets: Record<string, SheetData[]>;
  capacity: Record<string, Record<string, string>[]>;
};

type DataSourceContextType = {
  data: Data;
  error: unknown;
  isLoading: boolean;
};

export const defaultData = {
  capacity: {},
  teams: [],
  tickets: {},
};

export const DataSourceContext = createContext<DataSourceContextType>({
  data: defaultData,
  error: null,
  isLoading: false,
});
