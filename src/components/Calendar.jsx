import React, { useState } from 'react';
import moment from 'moment';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      start: new Date(),
      end: new Date(moment().add(1, 'hours')),
      title: 'Evento 1',
      status: 'reservado',
    },
    {
      id: 2,
      start: new Date(moment().add(1, 'days')),
      end: new Date(moment().add(1, 'days').add(1, 'hours')),
      title: 'Evento 2',
      status: 'en ejecución',
    },
  ]);

  const [editingEvent, setEditingEvent] = useState(null);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Agregar título del evento');
    if (title) {
      setEvents([
        ...events,
        {
          id: events.length + 1,
          start,
          end,
          title,
          status: 'reservado',
        },
      ]);
    }
  };

  const handleSelectEvent = (event) => {
    setEditingEvent(event);
  };

  const handleEventChange = (event) => {
    const updatedEvent = {
      ...event,
      title: editingEvent.title,
      status: editingEvent.status,
    };
    const updatedEvents = events.map((e) => (e.id === editingEvent.id ? updatedEvent : e));
    setEvents(updatedEvents);
    setEditingEvent(null);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = '#3174ad';
    switch (event.status) {
      case 'reservado':
        backgroundColor = '#3174ad';
        break;
      case 'confirmado':
        backgroundColor = '#6bbf56';
        break;
      case 'en ejecución':
        backgroundColor = '#ffc107';
        break;
      case 'finalizado':
        backgroundColor = '#007bff';
        break;
      case 'facturado':
        backgroundColor = '#dc3545';
        break;
      case 'cobrado':
        backgroundColor = '#17a2b8';
        break;
      default:
        break;
    }
  
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };

  return (
    <div>
      {editingEvent && (
        <div>
          <h3>Edit Event</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleEventChange(editingEvent);
          }}>
            <input type="text" value={editingEvent.title} onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })} />
            <select value={editingEvent.status} onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value })}>
              <option value="reservado">Reservado</option>
              <option value="confirmado">Confirmado</option>
              <option value="en ejecución">En Ejecución</option>
              <option value="finalizado">Finalizado</option>
              <option value="facturado">Facturado</option>
              <option value="cobrado">Cobrado</option>
            </select>
            <button type="submit">Save</button>
            <button onClick={() => setEditingEvent(null)}>Cancel</button>
          </form>
        </div>
      )}
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
        style={{ height: '100vh' }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default Calendar;
