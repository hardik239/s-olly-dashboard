import { Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { DynamicFilter } from "..";

type Props = {
  id: string;
  name: string;
  value: string;
  handleRemoveFilter: (id: string) => void;
  handleChange: (name: DynamicFilter) => void;
};

const FormRow: React.FC<Props> = ({
  id,
  name,
  value,
  handleRemoveFilter,
  handleChange,
}) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="grid col-span-5">
          <div>
            <Label htmlFor="key" className="text-xs lg:text-sm">
              Internal Owner
            </Label>
            <Input
              id="key"
              name={name}
              value={name}
              onChange={({ target }) =>
                handleChange({
                  id,
                  value,
                  name: target.value,
                })
              }
            />
          </div>
        </div>
        <div className="grid col-span-5">
          <div>
            <Label htmlFor="value" className="text-xs lg:text-sm">
              Actual Owner
            </Label>
            <Input
              id="value"
              name={value}
              value={value}
              onChange={({ target }) =>
                handleChange({
                  id,
                  name,
                  value: target.value,
                })
              }
            />
          </div>
        </div>
        <div className="grid col-span-2 place-content-end items-center">
          <Button
            disabled={!name || !value}
            variant="outline"
            onClick={() => handleRemoveFilter(id)}
          >
            <Trash className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormRow;
