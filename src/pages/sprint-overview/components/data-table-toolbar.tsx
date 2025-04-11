import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { JiraEpicColumn, SheetData } from "../../../utils/enums/columns.enum";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { getFilters } from "../utils";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const data = table.options.data;
  const filters = getFilters(data as SheetData[]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by description"
          value={
            (table
              .getColumn(JiraEpicColumn.DESCRIPTION)
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn(JiraEpicColumn.DESCRIPTION)
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filters.map(({ key, values }) => {
          return (
            table.getColumn(key) && (
              <DataTableFacetedFilter
                key={key}
                column={table.getColumn(key)}
                title={key}
                options={values}
              />
            )
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
