"use client";

import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterOptions, SportsEventType } from "@/lib/types";
import SelectedDateEvents from "./selected-date-events";
import EventsBatchSelect from "./events-batch-select";
import ToolbarFilter from "@/components/toolbar/toolbar-filter";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const eventStyleGetter = () => {
  return {
    style: {
      backgroundColor: `hsl(var(--primary))`,
      fontSize: "0.9rem",
      // color: "white",
      // borderRadius: "6px",
      // padding: "2px 5px",
    },
  };
};

export interface CalendarEvent {
  start: Date;
  end: Date | null;
  title: string;
  id: string;
  event_type: SportsEventType;
  address_city: string;
  address_country: string;
  event_logo_url: string | null;
}

interface EventsCalendarProps {
  month?: number;
  year?: number;
  batch?: number;
  eventList: CalendarEvent[];
  totalBatches?: number;
}

const EventsCalendar = ({
  eventList,
  month,
  year,
  batch,
  totalBatches = 1,
}: EventsCalendarProps) => {
  // initialize start month
  const startMonth = month && year ? new Date(year, month - 1, 1) : new Date();

  const [currentMonth, setCurrentMonth] = useState(startMonth);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // open modal and set date on click of slot/event/+X more text
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedDate(slotInfo.start);
    setIsDialogOpen(true);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedDate(event.start);
    setIsDialogOpen(true);
  };

  const handleDrillDown = (date: Date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const handleOpenChange = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleNavigate = (newDate: Date) => {
    // console.log(
    //   `Current month: ${newDate.getMonth().toString()} / ${newDate
    //     .getFullYear()
    //     .toString()}`
    // );
    setCurrentMonth(newDate);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const month = currentMonth.getMonth() + 1;
    params.set("month", month.toString());
    params.set("year", currentMonth.getFullYear().toString());
    params.set("batch", "1");

    replace(`${pathname}?${params.toString()}`);
  }, [currentMonth]);

  return (
    <>
      <div className="mb-1 px-4 flex justify-between">
        <ToolbarFilter maxPrice={1000} batch />
        <EventsBatchSelect totalBatches={totalBatches} />
      </div>

      <Calendar
        date={currentMonth}
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month"]}
        style={{ height: "100%", width: "100%" }}
        onNavigate={handleNavigate}
        eventPropGetter={eventStyleGetter}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onDrillDown={handleDrillDown}
      />
      <SelectedDateEvents
        selectedDate={selectedDate}
        isDialogOpen={isDialogOpen}
        handleOpenChange={handleOpenChange}
        events={eventList}
      />
    </>
  );
};

export default EventsCalendar;
