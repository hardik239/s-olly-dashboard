import { Badge } from "../../components/ui/badge";
import Link from "../../components/ui/link";
import { cn } from "../../lib/utils";
import { jiraBaseURL } from "../../utils/consts";
import { JiraEpicColumn, SheetData } from "../../utils/enums/columns.enum";
import {
  TicketTypeEnum,
  StatusType,
  MRType,
} from "../../utils/enums/ticket.enum";
import { variants } from "../../utils/utility/colors";
import {
  formatDate,
  getInitials,
  getUniqueValues,
  toTitleCase,
} from "../../utils/utility/sharedUtils";
import { DataTableColumnHeader } from "./components/data-table-column-header";
import { Column, ColumnDef, Row, VisibilityState } from "@tanstack/react-table";

export const getTicketBadge = (type: string) => {
  switch (type) {
    case TicketTypeEnum.BUG:
      return (
        <Badge
          className={cn("shadow-none", variants.red.bg, variants.red.text)}
        >
          Bug
        </Badge>
      );
    case TicketTypeEnum.STORY:
      return (
        <Badge
          className={cn("shadow-none", variants.green.bg, variants.green.text)}
        >
          Story
        </Badge>
      );
    case TicketTypeEnum.TASK:
      return (
        <Badge
          className={cn("shadow-none", variants.blue.bg, variants.blue.text)}
        >
          Task
        </Badge>
      );
    case TicketTypeEnum.MR:
      return (
        <Badge
          className={cn(
            "shadow-none",
            variants.purple.bg,
            variants.purple.text
          )}
        >
          MR Review
        </Badge>
      );
    case TicketTypeEnum.SPIKE_TASK:
      return (
        <Badge
          className={cn(
            "shadow-none",
            variants.orange.bg,
            variants.orange.text
          )}
        >
          Spike Task
        </Badge>
      );
    case TicketTypeEnum.SPIKE_STORY:
      return (
        <Badge
          className={cn("shadow-none", variants.teal.bg, variants.teal.text)}
        >
          Spike Story
        </Badge>
      );
    default:
      return type;
  }
};

export const getTicketStatusBadge = (status: string) => {
  const value = toTitleCase(status);
  switch (value) {
    case StatusType.TODO:
      return (
        <Badge
          className={cn("shadow-none", variants.teal.bg, variants.teal.text)}
        >
          {StatusType.TODO}
        </Badge>
      );
    case StatusType.IN_PROGRESS:
      return (
        <Badge
          className={cn("shadow-none", variants.blue.bg, variants.blue.text)}
        >
          {StatusType.IN_PROGRESS}
        </Badge>
      );
    case StatusType.IN_REVIEW:
      return (
        <Badge
          className={cn(
            "shadow-none",
            variants.fuchsia.bg,
            variants.fuchsia.text
          )}
        >
          {StatusType.IN_REVIEW}
        </Badge>
      );
    case StatusType.RESOLVED:
      return (
        <Badge
          className={cn("shadow-none", variants.green.bg, variants.green.text)}
        >
          {StatusType.RESOLVED}
        </Badge>
      );
    case StatusType.READY_FOR_ACCEPTANCE:
      return (
        <Badge
          className={cn(
            "shadow-none",
            variants.purple.bg,
            variants.purple.text
          )}
        >
          {StatusType.READY_FOR_ACCEPTANCE}
        </Badge>
      );
    case StatusType.READY_FOR_VERIFICATION:
      return (
        <Badge
          className={cn(
            "shadow-none",
            variants.orange.bg,
            variants.orange.text
          )}
        >
          {StatusType.READY_FOR_VERIFICATION}
        </Badge>
      );
    case StatusType.BLOCKED:
      return (
        <Badge
          className={cn("shadow-none", variants.red.bg, variants.red.text)}
        >
          {StatusType.READY_FOR_VERIFICATION}
        </Badge>
      );
    default:
      return status;
  }
};

export const getPRStatusBadge = (status: string) => {
  const value = toTitleCase(status);
  switch (value) {
    case MRType.Dash:
      return (
        <Badge
          className={cn("shadow-none", variants.teal.bg, variants.teal.text)}
        >
          {MRType.Dash}
        </Badge>
      );
    case MRType.MERGED:
      return (
        <Badge
          className={cn("shadow-none", variants.green.bg, variants.green.text)}
        >
          {MRType.MERGED}
        </Badge>
      );
    default:
      return status;
  }
};

export const getFormattedColumnCells = (
  key: keyof SheetData,
  row: Row<SheetData>
) => {
  const value = row.original?.[key];

  switch (key) {
    case JiraEpicColumn.JIRA:
    case JiraEpicColumn.EPIC:
      return <Link href={`${jiraBaseURL}${value}`}>{value}</Link>;

    case JiraEpicColumn.JIRA_STATUS:
      return (
        <span className="w-full block">
          {getTicketStatusBadge(value.toString())}
        </span>
      );
    case JiraEpicColumn.PR_STATUS:
      return (
        <span className="w-full block">
          {getPRStatusBadge(value as string)}
        </span>
      );
    case JiraEpicColumn.TYPE:
      return (
        <span className="w-full block">{getTicketBadge(value.toString())}</span>
      );
    case JiraEpicColumn.OWNER:
      return (
        <span className="w-full flex items-center gap-2">
          <Badge className="rounded-full size-8 font-normal bg-slate-100 shadow-none text-gray-800 flex justify-center items-center">
            {getInitials(value.toString())}
          </Badge>
          {value}
        </span>
      );
    case JiraEpicColumn.START_DATE:
    case JiraEpicColumn.END_DATE:
      return (
        <span className="w-full block">{value ? formatDate(+value) : "-"}</span>
      );
    default:
      return <span className="w-full block">{value}</span>;
  }
};

export const generateColumns = (
  filteredData: SheetData[],
  options?: {
    includeSprintColumn?: boolean;
  }
): ColumnDef<SheetData>[] => {
  const includeSprintColumn = options?.includeSprintColumn ?? false;
  if (filteredData.length) {
    const allKeys = Object.keys(
      filteredData ? filteredData?.[0] : []
    ) as JiraEpicColumn[];
    const actualKeys = includeSprintColumn
      ? allKeys
      : allKeys.filter((key) => key !== JiraEpicColumn.SPRINT);

    return actualKeys.map((key) => {
      const hasFilter = supportedFilters.includes(key);

      return {
        id: key,
        accessorKey: key,
        header: ({ column }: { column: Column<SheetData, unknown> }) => (
          <DataTableColumnHeader
            column={column}
            title={key}
            className={cn(
              "text-gray-500 text-xs min-w-32 capitalize",
              key === JiraEpicColumn.DESCRIPTION && "min-w-72",
              key === JiraEpicColumn.SPRINT && "min-w-40"
            )}
          />
        ),
        cell: ({ row }: { row: Row<SheetData> }) => {
          return getFormattedColumnCells(key as keyof SheetData, row);
        },
        enableSorting: false,
        ...{
          ...(hasFilter
            ? {
                filterFn: (row, id, value) => {
                  return value.includes(row.getValue(id));
                },
              }
            : {}),
        },
      };
    });
  }
  return [];
};

export const supportedFilters = [
  JiraEpicColumn.JIRA_STATUS,
  JiraEpicColumn.TYPE,
  JiraEpicColumn.OWNER,
  JiraEpicColumn.EPIC,
];

export const getFormattedLabel = (key: JiraEpicColumn, value: string) => {
  switch (key) {
    case JiraEpicColumn.EPIC:
      return value.toUpperCase();
    case JiraEpicColumn.OWNER:
      return toTitleCase(value);
    default:
      return value;
  }
};

export const getFilters = (data: SheetData[]) => {
  return supportedFilters.map((filter) => ({
    key: filter,
    values: getUniqueValues(data, filter).map((value) => ({
      value: filter === JiraEpicColumn.OWNER ? toTitleCase(value) : value,
      label: getFormattedLabel(filter, value),
    })),
  }));
};

const importantColumns = [
  JiraEpicColumn.JIRA,
  JiraEpicColumn.EPIC,
  JiraEpicColumn.SPRINT,
  JiraEpicColumn.DESCRIPTION,
  JiraEpicColumn.JIRA_STATUS,
  JiraEpicColumn.TYPE,
  JiraEpicColumn.OWNER,
  JiraEpicColumn.START_DATE,
  JiraEpicColumn.END_DATE,
];

export const getColumnVisibilityState = (
  columns: ColumnDef<SheetData>[]
): VisibilityState => {
  const visibilityState = {} as VisibilityState;
  columns.map((column) => {
    if ("accessorKey" in column) {
      visibilityState[column?.accessorKey] = importantColumns.includes(
        column.accessorKey as JiraEpicColumn
      );
    }
  });
  return visibilityState;
};
