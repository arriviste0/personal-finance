"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
    buttonClassName?: string; // Allow custom button class
}


export function DatePickerWithRange({
  className,
  date,
  setDate,
  buttonClassName
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
           <Button
            id="date"
            variant={"outline"}
             className={cn(
              "retro-button w-full justify-start text-left font-normal", // Base retro style
              !date && "text-muted-foreground",
              buttonClassName // Allow overriding button style
             )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
         <PopoverContent className="w-auto p-0 retro-window border-foreground" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="border-0 shadow-none" // Remove default calendar border/shadow inside popover
             classNames={{
                 // Optional: Style calendar elements if needed
                 // day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90",
                 // day_today: "bg-accent text-accent-foreground",
                 // ...
             }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
