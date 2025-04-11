import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { openDB } from "idb";
import { useNavigate } from "react-router-dom";
import { SheetData } from "../utils/enums/columns.enum";
import { Data, DataSourceContext, defaultData } from "./utils";

const DataSourceProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data>(defaultData);
  const [error, setError] = useState<unknown>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataFromIndexedDB = async () => {
      try {
        const db = await openDB("ExcelDB", 1);
        const tx = db.transaction("sheets", "readonly");
        const store = tx.objectStore("sheets");
        const teams = (await store.getAllKeys())
          .filter((teamName) => teamName.toString().endsWith("_tickets"))
          .map((teamName) => teamName.toString().replace("_tickets", ""));

        const tickets = {} as Record<string, SheetData[]>;
        const capacity = {} as Record<string, Record<string, string>[]>;

        for (let index = 0; index < teams.length; index++) {
          const team = teams[index];
          const ticketResponse = await store.get(`${team}_tickets`);
          const capacityResponse = await store.get(`${team}_capacity`);
          tickets[team] = structuredClone(ticketResponse?.data) ?? [];
          capacity[team] = structuredClone(capacityResponse?.data) ?? [];
        }

        setData({
          teams,
          tickets,
          capacity,
        });
      } catch (error: unknown) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataFromIndexedDB();
  }, [navigate]);

  const value = useMemo(
    () => ({ data, isLoading, error }),
    [data, error, isLoading]
  );

  return (
    <DataSourceContext.Provider value={value}>
      {children}
    </DataSourceContext.Provider>
  );
};

export default DataSourceProvider;
