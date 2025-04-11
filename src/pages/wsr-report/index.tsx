import React, { useState } from "react";
import toast from "react-hot-toast";
import { Download, Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import {
  SOMETHING_BAD_ERROR,
  SUCCESSFULLY_DOWNLOADED,
  UPLOAD_FILE_ERROR,
  defaultSprint,
} from "../../utils/consts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import FormRow from "./components/form-row";
import { useDataSource } from "../../context/useDataSource";
import { prepareSheetToDownload } from "./utils";

export type DynamicFilter = {
  id: string;
  name: string;
  value: string;
};

const WsrReport: React.FC = () => {
  const {
    data: { tickets, teams },
  } = useDataSource();
  const [isProcessing, setIsProcessing] = useState(false);
  const [sheetName, setSheetName] = useState(teams[0]);
  const [sprintName, setSprintName] = useState(defaultSprint);
  const [dynamicFilters, setDynamicFilters] = useState<DynamicFilter[]>([
    {
      id: uuidv4(),
      name: "",
      value: "",
    },
  ]);
  const isAddDisabled = dynamicFilters.some(
    (prevFilters) => !prevFilters.name || !prevFilters.value
  );

  const handleDownload = async () => {
    const data = tickets[sheetName];
    if (data.length === 0) {
      toast.error(UPLOAD_FILE_ERROR);
      return;
    }
    try {
      setIsProcessing(true);
      await prepareSheetToDownload(data, sprintName, sheetName, dynamicFilters);
      toast.success(SUCCESSFULLY_DOWNLOADED);
    } catch (error) {
      toast.error(SOMETHING_BAD_ERROR);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddFilter = () => {
    setDynamicFilters((prevFilters) => [
      ...prevFilters,
      {
        id: uuidv4(),
        name: "",
        value: "",
      },
    ]);
  };

  const handleRemoveFilter = (id: string) => {
    setDynamicFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.id !== id)
    );
  };

  const handleChange = (newFilter: DynamicFilter) => {
    setDynamicFilters((prevFilters) =>
      prevFilters.map((prevFilter) => {
        if (prevFilter.id === newFilter.id) {
          return newFilter;
        }
        return prevFilter;
      })
    );
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <Card className="max-w-xl lg:max-w-3xl">
        <CardHeader className="pb-0">
          <CardTitle className="flex gap-2 items-center text-base lg:text-xl">
            Create Work Status Report
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="grid gap-2">
              <Label htmlFor="sheetName" className="text-xs lg:text-sm">
                Sheet name
              </Label>
              <Select
                value={sheetName}
                onValueChange={(value) => {
                  setSheetName(value);
                }}
              >
                <SelectTrigger id="sheetName" className="capitalize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {teams.map((team) => {
                      return (
                        <SelectItem
                          key={team}
                          value={team}
                          className="text-xs lg:text-sm capitalize"
                        >
                          {team}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sprintName" className="text-xs lg:text-sm">
                Sprint
              </Label>
              <Input
                value={sprintName}
                onChange={({ target }) => setSprintName(target.value)}
              />
            </div>
          </div>

          {dynamicFilters.map((filter) => (
            <FormRow
              key={filter.id}
              id={filter.id}
              name={filter.name}
              value={filter.value}
              handleRemoveFilter={handleRemoveFilter}
              handleChange={handleChange}
            />
          ))}

          <div>
            <Button
              disabled={isAddDisabled}
              onClick={handleAddFilter}
              variant="outline"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span className="text-xs lg:text-sm">Add Filter </span>
            </Button>
          </div>

          <Button
            color="primary"
            onClick={handleDownload}
            className="mt-4 w-full flex gap-2 text-white"
            disabled={isProcessing}
          >
            <Download className="w-4 h-4" />
            <span className="text-xs lg:text-sm">Download</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const WsrReportContainer: React.FC = () => {
  const {
    data: { teams },
  } = useDataSource();

  if (teams.length === 0) {
    return <></>;
  }

  return <WsrReport />;
};

export default WsrReportContainer;
