import { FC } from "react";
import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";

const variants = {
  orange: "bg-orange-100",
  green: "bg-green-100",
  blue: "bg-blue-100",
  slate: "bg-slate-100",
  yellow: "bg-yellow-100",
  purple: "bg-purple-100",
  pink: "bg-pink-100",
  teal: "bg-teal-100",
};

export interface Props {
  label: string;
  value: string;
  variant: keyof typeof variants;
  isLargeCard?: boolean;
  onClick?: () => void;
}

const FancyStatsCard: FC<Props> = ({
  label,
  value,
  isLargeCard,
  variant,
  onClick,
}) => {
  return (
    <Card
      className={cn(
        "w-[120px] flex-1 lg:w-[150px] h-[100px] shadow-sm rounded-xl border-none p-0",
        isLargeCard ? "p-4 shadow-md min-w-56 flex-grow-0" : "",
        `${variants[variant] ?? variants.blue}`,
        onClick && value !== "0" && "cursor-pointer group"
      )}
      {...(value && value !== "0" ? { onClick } : {})}
    >
      <CardContent className="flex justify-center items-center flex-col h-full p-0 gap-1">
        <div
          className={cn(
            "text-xl lg:text-2xl font-semibold",
            isLargeCard && "text-2xl font-medium",
            onClick && "group-hover:underline underline-offset-4"
          )}
        >
          {value}
        </div>
        <div
          className={cn(
            "text-xs text-center w-[100px] text-gray-500 font-[500]",
            isLargeCard ? "w-auto" : ""
          )}
        >
          {label}
        </div>
      </CardContent>
    </Card>
  );
};

export default FancyStatsCard;
