import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { createSlug } from "../../../utils/utils";
import { UserStats } from "../../user-details";
import { getInitials, toTitleCase } from "../../../utils/utility/sharedUtils";
import { cn } from "../../../lib/utils";
import { ColorVariant, variants } from "../../../utils/utility/colors";

export interface Props {
  username: string;
  stats: UserStats;
  variant: ColorVariant;
}

const OverviewCard: FC<Props> = ({ username, stats, variant }) => {
  const navigate = useNavigate();
  const { team } = useParams<{ team: string }>();

  return (
    <Card
      className={cn(
        "w-80 lg:w-64 p-0 lg:flex-1 cursor-pointer border-0 border-t-4 max-w-96",
        variants[variant].border ?? variants.blue.border
      )}
      onClick={() =>
        navigate(`/dashboard/user-overview/${team}/${createSlug(username)}`)
      }
    >
      <CardHeader className="flex flex-row items-center space-y-0 p-4 gap-4">
        <CardTitle className="flex items-center gap-4 font-medium">
          <div
            className={cn(
              "w-12 h-12 rounded-full text-xs lg:text-base flex justify-center items-center",
              variants[variant].bg ?? variants.blue.bg,
              variants[variant].text ?? variants.blue.text
            )}
          >
            {getInitials(username)}
          </div>
          <span className="text-sm lg:text-base">{toTitleCase(username)}</span>
        </CardTitle>
      </CardHeader>
      <Separator className="h-[0.5px] bg-black/20" />
      <CardContent className="mt-5">
        <div className="flex flex-wrap flex-col gap-2 text-xs lg:text-sm">
          <div className="flex items-center justify-between gap-2">
            <p className="leading-none">Total Tickets</p>
            <p
              className={cn(
                stats.totalTickets.size && "font-medium lg:font-semibold"
              )}
            >
              {stats.totalTickets.size}
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-2 text-xs lg:text-sm">
            <p className="leading-none">Total Actual Work Hours</p>
            <p
              className={cn(
                stats.totalActualHours && "font-medium lg:font-semibold"
              )}
            >
              {stats.totalActualHours}
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-2 text-xs lg:text-sm">
            <p className="leading-none">Total Ticket Reviewed</p>
            <p
              className={cn(
                stats.totalReviewedTickets.size &&
                  "font-medium lg:font-semibold"
              )}
            >
              {stats.totalReviewedTickets.size}
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-2 text-xs lg:text-sm">
            <p className="leading-none">Total Estimated Review Hours</p>
            <p
              className={cn(
                stats.estimatedReviewHours && "font-medium lg:font-semibold"
              )}
            >
              {stats.estimatedReviewHours}
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-2 text-xs lg:text-sm">
            <p className="leading-none">Total Actual Review Hours</p>
            <p
              className={cn(
                stats.actualReviewHours && "font-medium lg:font-semibold"
              )}
            >
              {stats.actualReviewHours}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
