import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import calender from "/companyside/calender.svg"
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { format } from "date-fns";

type CalendarPopOverProps = {
  selected: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  onApply: () => void;
  onReset: () => void;
};

export const CalendarPopOver = ({ selected, onChange, onApply, onReset }: CalendarPopOverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="default"
          variant="outline"
          className="ml-auto flex bg-gradient-to-t from-[#ECECEC] to-slate-50"
        >
          {selected?.from ? format(selected.from, "LLL dd") : "Start"} - {selected?.to ? format(selected.to, "LLL dd") : "End"}{" "}
          <img src={calender} alt="calender" className="text-muted-foreground w-4" />        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className="w-full">
        <Calendar
          mode="range"
          selected={selected}
          onSelect={(r) => onChange(r)}
        />
        <Flex className="mt-3 justify-center gap-2 bg-muted px-3 py-1 rounded-sm text-sm font-medium text-primary">
          <span className="text-muted-foreground">
            {selected?.from ? format(selected.from, "dd LLL") : "--"}
          </span>
          <span className="text-accent-foreground">/</span>
          <span className="text-muted-foreground">
            {selected?.to ? format(selected.to, "dd LLL") : "--"}
          </span>
        </Flex>
        <Flex>
          <Button className="flex-1 mt-5" variant="outline" onClick={onReset}>
            Reset
          </Button>
          <Button className="flex-1 mt-5" onClick={onApply}>Apply Filter</Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};
