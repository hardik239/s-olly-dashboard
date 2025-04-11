import { useContext } from "react";
import { DataSourceContext } from "./utils";

export const useDataSource = () => {
  return useContext(DataSourceContext);
};
