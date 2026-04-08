"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface DatePickerRangeProps {
  value?: DateRange | undefined
  onChange?: (date: DateRange | undefined) => void
  placeholder?: string
  label?: string
  className?: string
  fieldClassName?: string
}

export function DatePickerWithRange({
  value,
  onChange,
  placeholder = "Pick a date",
  label,
  className,
  fieldClassName,
}: DatePickerRangeProps) {
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(
    value,
  )

  const selectedDate = value ?? internalDate

  const handleSelect = (date: DateRange | undefined) => {
    if (onChange) {
      onChange(date)
    } else {
      setInternalDate(date)
    }
  }

  return (
    <Field className={`mx-auto w-full ${fieldClassName ?? "w-60"}`}>
      {label ? (
        <FieldLabel htmlFor="date-picker-range">{label}</FieldLabel>
      ) : null}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className={`justify-start px-2.5 font-normal ${className ?? "w-full"}`}
          >
            <CalendarIcon />
            {selectedDate?.from ? (
              selectedDate.to ? (
                <>
                  {format(selectedDate.from, "LLL dd, y")} -{" "}
                  {format(selectedDate.to, "LLL dd, y")}
                </>
              ) : (
                format(selectedDate.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={selectedDate?.from}
            selected={selectedDate}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
