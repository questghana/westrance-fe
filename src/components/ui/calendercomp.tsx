import * as React from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

// CalendarComponent (unchanged)
interface CalendarComponentProps {
  range?: { from?: Date; to?: Date };
  setRange?: (range: { from?: Date; to?: Date }) => void;
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({
  range,
  setRange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm"
        >
          <CalendarIcon className="size-5" />
          <span>
            {range?.from ? format(range.from, "MMM d, yyyy") : "Start Date"} -{" "}
            {range?.to ? format(range.to, "MMM d, yyyy") : "End Date"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="range"
          className="flex justify-center items-center"
          selected={range as DateRange}
          onSelect={(newRange) => setRange?.(newRange || {})}
        />
      </PopoverContent>
    </Popover>
  );
};
