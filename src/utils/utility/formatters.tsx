import { Badge } from "../../components/ui/badge";
import { cn } from "../../lib/utils";

export const formatter = (key: string, value: string) => {
  if (key === "sprint") {
    return `Sprint ${value.charAt(value.length - 1)}`;
  }
  return value;
};

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const renderBadge = (data: string[]) => {
  return data.map((x) => {
    return (
      <Badge key={x} className={cn("shadow-sm bg-zinc-100 text-zinc-700")}>
        {x}
      </Badge>
    );
  });
};
