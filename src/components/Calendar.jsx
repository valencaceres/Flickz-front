import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: "Evento 1",
    start: moment().toDate(),
    end: moment().add(1, "hours").toDate(),
    reservado: true,
    confirmado: false,
    enEjecucion: false,
    finalizado: false,
    facturado: false,
    cobrado: false
  },
  {
    id: 2,
    title: "Evento 2",
    start: moment().add(1, "days").toDate(),
    end: moment().add(1, "days").add(2, "hours").toDate(),
    reservado: false,
    confirmado: true,
    enEjecucion: false,
    finalizado: false,
    facturado: false,
    cobrado: false
  }
];

const MyCalendar = () => {
  const [updatedEvents, setUpdatedEvents] = useState(events);

  const handleEventChange = ({ event, start, end, isAllDay }) => {
    const updatedEvent = { ...event, start, end, isAllDay };
    const index = updatedEvents.findIndex((e) => e.id === updatedEvent.id);
    const updatedArray = [...updatedEvents];
    updatedArray.splice(index, 1, updatedEvent);
    setUpdatedEvents(updatedArray);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "";
    let borderColor = "";
    if (event.reservado) {
      backgroundColor = "#FFEBCD";
      borderColor = "#FFDAB9";
    } else if (event.confirmado) {
      backgroundColor = "#98FB98";
      borderColor = "#90EE90";
    } else if (event.enEjecucion) {
      backgroundColor = "#87CEFA";
      borderColor = "#6495ED";
    } else if (event.finalizado) {
      backgroundColor = "#F08080";
      borderColor = "#CD5C5C";
    } else if (event.facturado) {
      backgroundColor = "#FFD700";
      borderColor = "#FFA500";
    } else if (event.cobrado) {
      backgroundColor = "#87CEEB";
      borderColor = "#00BFFF";
    }
    return {
      style: {
        backgroundColor,
        borderColor
      }
    };
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={updatedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        resizable
        onEventDrop={handleEventChange}
        onEventResize={handleEventChange}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default MyCalendar;

