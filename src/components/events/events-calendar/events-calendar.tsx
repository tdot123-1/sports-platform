"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";

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

const myEventsList = [
  {
    title: "Test Event",
    start: new Date("2025-03-01T10:00:00"),
    end: new Date("2025-03-01T12:00:00"),
  },
];

const EventsCalendar = ({ eventList }: { eventList: any[] }) => {
  return (
    <>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month"]}
        style={{ height: "100%", width: "100%" }}
      />
    </>
  );
};

export default EventsCalendar;
