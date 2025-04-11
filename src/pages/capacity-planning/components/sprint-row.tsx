import React from "react";
import { FILTER, getHours } from "../../../utils/utility/capacityTableUtils";
import EstimationsCell from "./estimations-cell";

type TableSprintRowProps = {
  filter: FILTER;
  actual: number;
  estimated: number;
};

const SprintRow: React.FC<TableSprintRowProps> = ({
  filter,
  actual,
  estimated,
}) => {
  const estimatedByHours = getHours(estimated);
  const actualByHours = getHours(actual);
  const showNA = estimatedByHours === 0 && actualByHours === 0;

  if (showNA) {
    return (
      <p className="w-full flex items-center text-center flex-col p-1">
        <span className="p-1 flex gap-2 m-auto text-xs">0</span>
      </p>
    );
  }

  return (
    <EstimationsCell
      estimated={estimatedByHours}
      actual={actualByHours}
      filter={filter}
    />
  );
};

export default SprintRow;
