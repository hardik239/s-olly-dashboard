import { useState, useEffect } from "react";
import { openDB } from "idb";
import { EpicsDataType, SheetData } from "../enums/columns.enum";
import { useNavigate } from "react-router-dom";

/**
 * Note: DO NOT USE
 *
 * Keeping this for now, but not used any more.
 * Replaced this with context to make it more dynamic
 */
const useIndexedDBData = () => {
  const [adminExperienceData, setAdminExperienceData] = useState<SheetData[]>(
    []
  );
  const [wizardsData, setWizardsData] = useState<SheetData[]>([]);
  const [wizardsEpics, setWizardsEpics] = useState<Record<string, string>[]>(
    []
  );
  const [adminExperienceEpics, setAdminExperienceEpics] = useState<
    Record<string, string>[]
  >([]);
  const [error, setError] = useState<unknown>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataFromIndexedDB = async () => {
      try {
        const db = await openDB("ExcelDB", 1);
        if (db.objectStoreNames.length === 0) {
          navigate("/no-data");
        }

        const tx = db.transaction("sheets", "readonly");
        const store = tx.objectStore("sheets");
        const adminExperience = await store.get("Admin Experience(RBAC)");
        const wizardsSheet = await store.get("Wizards");
        const wizardsEpicsSheetData = (await store.get(
          "Capacity_Template_Wizards"
        )) as EpicsDataType;
        const adminExperienceEpics = (await store.get(
          "Capacity_Template_RBAC"
        )) as EpicsDataType;
        setAdminExperienceData(adminExperience?.data || []);
        setWizardsData(wizardsSheet?.data || []);
        setWizardsEpics(wizardsEpicsSheetData.data ?? []);
        setAdminExperienceEpics(adminExperienceEpics.data ?? []);
      } catch (error: unknown) {
        setError(error);
      }
    };

    fetchDataFromIndexedDB();

    // Cleanup function
    return () => {
      // Perform any cleanup if needed
    };
  }, [navigate]);

  return {
    adminExperienceData,
    wizardsData,
    wizardsEpics,
    adminExperienceEpics,
    error,
  };
};

export default useIndexedDBData;
