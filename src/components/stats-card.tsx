import { FC } from "react";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { cn } from "../lib/utils";
import { ColorVariant, variants } from "../utils/utility/colors";

export interface Props {
  label: string;
  value: string;
  icon: any;
  className?: string;
  variant: ColorVariant;
  onClick?: () => void;
}

const StatsCard: FC<Props> = ({
  label,
  value,
  icon,
  className,
  variant,
  onClick,
}) => {
  return (
    <Card
      className={cn(
        "lg:flex-1 h-20 shadow rounded-md border p-0",
        "lg:min-w-60 flex-grow-0 min-w-80",
        onClick && value !== "0" ? "cursor-pointer group" : "",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex gap-5 items-center h-full p-4">
        <div
          className={cn(
            "flex justify-center items-center size-10 lg:size-12 rounded-md",
            variants[variant].bg ?? variants.blue.bg,
            variants[variant].text ?? variants.blue.text
          )}
        >
          {icon}
        </div>
        <Separator orientation="vertical" className="bg-slate-200" />
        <div>
          <div
            className={cn(
              "text-xl font-medium lg:text-2xl lg:font-semibold",
              onClick && "group-hover:underline underline-offset-2"
            )}
          >
            {value}
          </div>
          <div className="text-xs font-medium text-muted-foreground">
            {label}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
