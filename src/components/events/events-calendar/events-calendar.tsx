"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback, useState } from "react";

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

export interface CalendarEvent {
  start: Date | null;
  end: Date | null;
  title: string;
}

const EventsCalendar = ({ eventList }: { eventList: CalendarEvent[] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleNavigate = (newDate: Date) => {
    console.log(
      `Current month: ${newDate.getMonth().toString()} / ${newDate
        .getFullYear()
        .toString()}`
    );
    setCurrentMonth(newDate);
  };
  return (
    <>
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
      />
    </>
  );
};

export default EventsCalendar;
