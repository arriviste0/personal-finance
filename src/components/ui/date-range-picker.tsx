
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

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
    <div className={cn(className)}> {/* Changed from "grid gap-2" */}
      <Popover>
        <PopoverTrigger asChild>
           <Button
            id="date"
            variant={"outline"}
             className={cn(
              "w-full justify-start text-left font-normal", // Base styles for this button instance
              !date && "text-muted-foreground",
              buttonClassName // User-provided classes from expenses/page.tsx for height etc.
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
            className="border-0 shadow-none"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
