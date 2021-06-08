import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) => {
  return React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "#eee",
    },
  });
}

const genEvents = (data) => {
  return data.schedule.map((event, index) => ({
    id: index, title: event.engineer, start: event.start, end: event.end, allDay: false
  }));
};

const CustomCalendar = props => (
  <Calendar
    defaultView="month"
    views={["month", "day"]}
    events={genEvents(props.data)}
    showMultiDayTimes
    defaultDate={new Date(2021, 5)}
    components={{ timeSlotWrapper: ColoredDateCellWrapper }}
    localizer={localizer}
    style={{ height: "80vh", width: "90vw" }}
  />
);

export default CustomCalendar;