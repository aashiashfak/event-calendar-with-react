import React, {useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./EventCalendar.css";

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [editEventIndex, setEditEventIndex] = useState(null);
  const [editEventTitle, setEditEventTitle] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addEvent = () => {
    if (eventTitle.trim()) {
      setEvents([...events, {date: selectedDate, title: eventTitle}]);
      setEventTitle("");
    }
  };

  const handleEditEvent = (index) => {
    setEditEventIndex(index);
    setEditEventTitle(events[index].title); // Set the current event title to the input field for editing
  };

  const saveEditEvent = () => {
    const updatedEvents = [...events];
    updatedEvents[editEventIndex].title = editEventTitle; // Update the event title
    setEvents(updatedEvents);
    setEditEventIndex(null); // Reset edit mode
    setEditEventTitle(""); // Clear edit input
  };

  const deleteEvent = (index) => {
    setEvents(events.filter((_, i) => i !== index)); // Remove the selected event
  };

  const tileContent = ({date, view}) => {
    if (view === "month") {
      const dayEvents = events.filter((event) => {
        return (
          date.getFullYear() === new Date(event.date).getFullYear() &&
          date.getMonth() === new Date(event.date).getMonth() &&
          date.getDate() === new Date(event.date).getDate()
        );
      });

      if (dayEvents.length > 0) {
        return <div className="event-marker"></div>;
      }
    }
    return null;
  };

  return (
    <div className="event-calendar">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={tileContent}
        className="custom-calendar"
      />
      <div className="event-form">
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Add event title"
        />
        <button onClick={addEvent}>Add Event</button>
      </div>
      <div className="event-list">
        <h3>Events:</h3>
        <ul>
          {events.map((event, index) => (
            <li key={index} className="event-item">
              {editEventIndex === index ? (
                // Only show the edit input and save button when the event is being edited
                <div className="edit-form">
                  <input
                    type="text"
                    value={editEventTitle}
                    onChange={(e) => setEditEventTitle(e.target.value)}
                    placeholder="Edit event title"
                  />
                  <button onClick={saveEditEvent}>Save</button>
                </div>
              ) : (
                // Show event details and edit/delete buttons when not editing
                <>
                  <div className="event-details">
                    <span>
                      {new Date(event.date).toDateString()}: {event.title}
                    </span>
                  </div>
                  <div className="event-actions">
                    <i
                      onClick={() => handleEditEvent(index)}
                      id="edit-icon"
                      className="fa-solid fa-pen-to-square"
                    ></i>
                    <i
                      onClick={() => deleteEvent(index)}
                      id="delete-icon"
                      className="fa-solid fa-trash-can"
                    ></i>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventCalendar;
