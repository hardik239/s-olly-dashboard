import React from "react";
import { cn } from "../../../lib/utils";
import { FILTER } from "../../../utils/utility/capacityTableUtils";

type Props = {
  filter: FILTER;
  estimated: any;
  actual: any;
};

const EstimationsCell: React.FC<Props> = ({ estimated, actual, filter }) => {
  return (
    <p className="flex items-center text-center flex-col p-1 w-full text-xs">
      <span
        className={cn(
          "p-1 flex gap-2 m-auto",
          filter === FILTER.SHOW_ACTUAL && "hidden"
        )}
      >
        <span
          className={cn(filter !== FILTER.SHOW_BOTH && "hidden", "text-xs")}
        >
          Estimated:
        </span>
        <span
          className={cn(
            "text-xs",
            filter === FILTER.SHOW_ESTIMATION &&
              "text-center w-full font-normal"
          )}
        >
          {estimated}
        </span>
      </span>
      <span
        className={cn(
          "p-1 flex gap-2 m-auto",
          filter === FILTER.SHOW_ESTIMATION && "hidden"
        )}
      >
        <span className={cn(filter !== FILTER.SHOW_BOTH && "hidden")}>
          Actual:{" "}
        </span>
        <span
          className={cn(
            "text-xs",
            filter === FILTER.SHOW_ACTUAL && "text-center w-full text-xs"
          )}
        >
          {actual}
        </span>
      </span>
    </p>
  );
};

export default EstimationsCell;
