import React, { useState, useCallback, useRef } from "react";
import { toPng } from "html-to-image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { cn } from "../../../lib/utils";
import { JiraEpicColumn, SheetData } from "../../../utils/enums/columns.enum";
import {
  FILTER,
  getHours,
  getSprintWiseData,
  processData,
  processSprintCapacity,
} from "../../../utils/utility/capacityTableUtils";
import {
  getUniqueValues,
  toTitleCase,
} from "../../../utils/utility/sharedUtils";
import { Badge } from "../../../components/ui/badge";
import TableSprintRow from "./sprint-row";
import { Button } from "../../../components/ui/button";
import { formatter } from "../../../utils/utility/formatters";
import NoTableData from "../../../components/table-no-data";

type Props = {
  team: string;
  data: SheetData[];
  epicsTemplate?: Record<string, string>[];
};

const CapacityTable: React.FC<Props> = ({ team, data, epicsTemplate }) => {
  const [filter, setFilter] = useState(FILTER.SHOW_ESTIMATION);
  const sprints = getUniqueValues(data, JiraEpicColumn.SPRINT);
  const headers = Object.keys(epicsTemplate?.[0] ?? []);
  const totalIndex = epicsTemplate?.findIndex((v) => v.Epics === "Total") ?? 0;
  const epicData = [...(epicsTemplate ?? [])]?.splice(0, totalIndex);
  const sprintCapacity = [...(epicsTemplate ?? [])]?.splice(totalIndex + 1);
  const newCapacityData = processData(data, epicData, sprints);
  const totalDays = newCapacityData.reduce(
    (prev, current) => prev + +current.estimatedDays,
    0
  );
  const actualHeaders = [
    ...headers.slice(0, 2),
    ...headers.slice(2, headers.length - 2).slice(0, sprints.length),
    ...headers.slice(headers.length - 2, headers.length),
  ];
  const { sprintWiseData } = getSprintWiseData(data, sprints);
  const totalHoursBySprint = sprints.reduce((prev, current) => {
    const totalActual =
      Object.values(sprintWiseData[current]).reduce(
        (x, y) => +x + +y.actual,
        0
      ) || 0;
    const totalEstimated =
      Object.values(sprintWiseData[current]).reduce(
        (x, y) => +x + +y.estimated,
        0
      ) || 0;

    prev[current] = {
      totalActual,
      totalEstimated,
    };
    return prev;
  }, {} as Record<string, Record<string, number>>);

  const sumOfTotalPlannedDays = newCapacityData.reduce((prev, current) => {
    if (Object.keys(prev).length === 0) {
      prev = {
        actual: current.totalPlannedDays.actual,
        estimated: current.totalPlannedDays.estimated,
      };
    } else {
      prev.actual = prev.actual + current.totalPlannedDays.actual;
      prev.estimated = prev.estimated + current.totalPlannedDays.estimated;
    }
    return prev;
  }, {});

  const sumOfTotalDifference = newCapacityData.reduce((prev, current) => {
    if (Object.keys(prev).length === 0) {
      prev = {
        actual: current.difference.actual,
        estimated: current.difference.estimated,
      };
    } else {
      prev.actual = prev.actual + current.difference.actual;
      prev.estimated = prev.estimated + current.difference.estimated;
    }
    return prev;
  }, {});

  const epicTableRef = useRef<HTMLDivElement>(null);
  const sprintCapacityRef = useRef<HTMLDivElement>(null);

  const handleDownloadEpicData = useCallback(() => {
    if (epicTableRef.current === null) {
      return;
    }

    toPng(epicTableRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${team}_capacity_planning.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [epicTableRef, team]);

  const handleDownloadSprintCapacity = useCallback(() => {
    if (sprintCapacityRef.current === null) {
      return;
    }

    toPng(sprintCapacityRef.current, {
      cacheBust: true,
      quality: 1,
      canvasWidth: 3000,
      width: 3000,

      style: {
        overflow: "hidden",
      },
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${team}_sprint_capacity_planning.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sprintCapacityRef, team]);

  const processedSprintCapacity = processSprintCapacity(
    sprintCapacity,
    sprints
  );
  const showNoData = data.length > 0 && newCapacityData.length === 0;

  if (showNoData) {
    return (
      <NoTableData
        content={`No template found for ${toTitleCase(team)} team`}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex gap-3 items-center">
        <label
          htmlFor="filter"
          className="text-sm lg:text-base text-gray-800 font-semibold"
        >
          Select a filter:
        </label>
        <Select onValueChange={(value: FILTER) => setFilter(value)}>
          <SelectTrigger id="filter" className=" bg-white w-[220px]">
            <SelectValue placeholder={filter} defaultValue={filter} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER.SHOW_ESTIMATION}>
              {FILTER.SHOW_ESTIMATION}
            </SelectItem>
            <SelectItem value={FILTER.SHOW_ACTUAL}>
              {FILTER.SHOW_ACTUAL}
            </SelectItem>
            <SelectItem value={FILTER.SHOW_BOTH}>{FILTER.SHOW_BOTH}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        <div className="w-full flex justify-end">
          <Button onClick={handleDownloadEpicData} variant="outline">
            Download as PNG
          </Button>
        </div>
        <div
          ref={epicTableRef}
          className="bg-white flex-1 h-full relative pb-6"
        >
          <Table className="">
            <TableHeader className="sticky -top-6">
              <TableRow className="bg-slate-100">
                {actualHeaders.map((header) => (
                  <TableHead
                    key={header}
                    className="border text-gray-500 text-center p-2 text-xs"
                  >
                    <span className="block">{header.split("(")[0]}</span>
                    <span>
                      {header.split("(")[1] ? `(${header.split("(")[1]}` : ""}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {newCapacityData.map((row, rowIndex) => {
                return (
                  <TableRow key={rowIndex} className="lg:text-sm">
                    <TableCell className="border w-72 text-xs">
                      {row.epic}
                    </TableCell>
                    <TableCell className="border w-36 text-center text-xs">
                      {row.estimatedDays}
                    </TableCell>
                    {sprints.map((sprint, cellIndex) => {
                      return (
                        <TableCell
                          key={cellIndex}
                          className="border w-36 text-center pl-3 text-xs"
                        >
                          <TableSprintRow
                            filter={filter}
                            actual={row[sprint].actual}
                            estimated={row[sprint].estimated}
                          />
                        </TableCell>
                      );
                    })}
                    <TableCell className="border w-36 text-xs">
                      <TableSprintRow
                        filter={filter}
                        actual={row.totalPlannedDays.actual}
                        estimated={row.totalPlannedDays.estimated}
                      />
                    </TableCell>

                    <TableCell className="border w-36 bg-red-50 text-xs">
                      <TableSprintRow
                        filter={filter}
                        actual={row.difference.actual * 8}
                        estimated={row.difference.estimated * 8}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="border-t-4 lg:border-t-2 text-xs lg:text-sm">
                <TableCell className="border max-w-60 text-xs">Total</TableCell>
                <TableCell className="border max-w-60 text-xs text-center">
                  {totalDays}
                </TableCell>
                {Object.values(totalHoursBySprint).map((v, i) => {
                  return (
                    <TableCell key={i} className="border w-36 text-center pl-3">
                      <TableSprintRow
                        filter={filter}
                        actual={v.totalActual}
                        estimated={v.totalEstimated}
                      />
                    </TableCell>
                  );
                })}
                <TableCell className="border max-w-60 text-xs">
                  <TableSprintRow
                    filter={filter}
                    actual={sumOfTotalPlannedDays.actual}
                    estimated={sumOfTotalPlannedDays.estimated}
                  />
                </TableCell>
                <TableCell className="border max-w-60 text-xs bg-red-50">
                  <TableSprintRow
                    filter={filter}
                    actual={sumOfTotalDifference.actual * 8}
                    estimated={sumOfTotalDifference.estimated * 8}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="space-y-4">
        <div className="w-full flex justify-end">
          <Button onClick={handleDownloadSprintCapacity} variant="outline">
            Download as PNG
          </Button>
        </div>
        <div
          ref={sprintCapacityRef}
          className="bg-white flex-1 h-full relative pb-6"
        >
          <Table className="">
            <TableHeader className="sticky -top-6">
              <TableRow className="bg-slate-100">
                <TableHead className="border text-gray-500 text-center p-2 text-xs" />
                {sprints.map((sprint) => (
                  <TableHead
                    key={sprint}
                    className="border text-gray-500 text-center p-2 text-xs"
                  >
                    <span className="block">{formatter("sprint", sprint)}</span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedSprintCapacity.map((row, rowIndex) => {
                if (row.name === "Actual capacity (Days)") {
                  return (
                    <TableRow key={rowIndex} className="text-xs lg:text-sm">
                      <TableCell className="border max-w-60 text-xs">
                        {row.name}
                      </TableCell>
                      {Object.values(totalHoursBySprint).map((v, i) => {
                        return (
                          <TableCell
                            key={i}
                            className="border w-36 text-center pl-3"
                          >
                            <TableSprintRow
                              filter={filter}
                              actual={v.totalActual}
                              estimated={v.totalEstimated}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }

                if (row.name === "Capacity Delta") {
                  const capacityPlanned = processedSprintCapacity.find(
                    (v) => v.name === "Capacity Planned (Days)"
                  );
                  return (
                    <TableRow key={rowIndex} className="text-xs lg:text-sm">
                      <TableCell className="border max-w-60 text-xs">
                        {row.name}
                      </TableCell>
                      {Object.values(totalHoursBySprint).map((v, i) => {
                        const sprint = sprints[i];
                        const value =
                          capacityPlanned?.[sprint] -
                          getHours(
                            filter === FILTER.SHOW_ACTUAL
                              ? v.totalActual
                              : v.totalEstimated
                          );
                        return (
                          <TableCell key={i} className="border text-center">
                            <Badge
                              className={cn(
                                "shadow-none text-zinc-700 bg-zinc-100",
                                value < 0 && "text-red-700 bg-red-100"
                              )}
                            >
                              {value}
                            </Badge>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }

                return (
                  <TableRow key={rowIndex} className="text-xs lg:text-sm">
                    <TableCell className="border w-72 text-xs">
                      {row.name}
                    </TableCell>
                    {sprints.map((sprint, cellIndex) => {
                      return (
                        <TableCell
                          key={cellIndex}
                          className="border w-36 text-center pl-3"
                        >
                          {row[sprint]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CapacityTable;
