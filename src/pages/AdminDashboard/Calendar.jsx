import { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import "../../styles/AdminDashboard/Calendar.css";
import Navbar from "../../components/AdminDashboard/Navbar";
import { FaTrash, FaEdit } from "react-icons/fa";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/CalenderRoute/events"
      );
      setCurrentEvents(response.data.Events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title && selected.startStr) {
      const eventData = {
        calenderDate: selected.startStr,
        description: title
      };

      axios
        .post(
          "https://university-project-paresh.onrender.com/University/CalenderRoute/events",
          eventData
        )
        .then((response) => {
          const newEvent = {
            _id: response.data._id,
            calenderDate: selected.startStr,
            description: title
          };

          calendarApi.addEvent(newEvent);
          setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);
        })
        .catch((error) => {
          console.error("Error creating event:", error);
        });
    } else {
      console.error("Selected date is undefined or title is empty");
    }
  };

  const handleEventClick = (id) => {
    console.log("id", id);
    if (window.confirm(`What would you like to do with this event?`)) {
      const action = prompt("Enter 'edit' to edit or 'delete' to delete:");

      if (action === "edit") {
        const newTitle = prompt("Enter a new title for your event:");
        if (newTitle) {
          axios
            .put(
              `https://university-project-paresh.onrender.com/University/CalenderRoute/events/${id}`,
              { description: newTitle }
            )
            .then(() => {
              setCurrentEvents((prevEvents) =>
                prevEvents.map((event) =>
                  event._id === id ? { ...event, description: newTitle } : event
                )
              );
            })
            .catch((error) => {
              console.error("Error updating event:", error);
            });
        }
      } else if (action === "delete") {
        axios
          .delete(
            `https://university-project-paresh.onrender.com/University/CalenderRoute/events/${id}`
          )
          .then(() => {
            setCurrentEvents((prevEvents) =>
              prevEvents.filter((event) => event._id !== id)
            );
          })
          .catch((error) => {
            console.error("Error deleting event:", error);
          });
      } else {
        console.error("Invalid action.");
      }
    }
  };
  const handleCalendarEventClick = (info) => {
    const eventId = info.event.id;

    if (window.confirm(`What would you like to do with this event?`)) {
      const action = prompt("Enter 'edit' to edit or 'delete' to delete:");

      if (action === "edit") {
        const newTitle = prompt("Enter a new title for your event:");
        if (newTitle) {
          axios
            .put(
              `https://university-project-paresh.onrender.com/University/CalenderRoute/events/${eventId}`,
              { description: newTitle }
            )
            .then(() => {
              setCurrentEvents((prevEvents) =>
                prevEvents.map((event) =>
                  event._id === eventId
                    ? { ...event, description: newTitle }
                    : event
                )
              );
            })
            .catch((error) => {
              console.error("Error updating event:", error);
            });
        }
      } else if (action === "delete") {
        axios
          .delete(
            `https://university-project-paresh.onrender.com/University/CalenderRoute/events/${eventId}`
          )
          .then(() => {
            setCurrentEvents((prevEvents) =>
              prevEvents.filter((event) => event._id !== eventId)
            );
          })
          .catch((error) => {
            console.error("Error deleting event:", error);
          });
      } else {
        console.error("Invalid action.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="calendar-container bg-login h-[87.6vh]">
        <div className="calendar-content">
          <div className="calendar">
            <FullCalendar
              height="85vh"
              className="custom-full-calendar"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleCalendarEventClick}
              events={currentEvents.map((event) => ({
                id: event._id,
                title: event.description,
                start: event.calenderDate
              }))}
              eventContent={(eventInfo) => {
                return (
                  <div style={{ textAlign: "center" }}>
                    <span>{eventInfo.event.title}</span>
                  </div>
                );
              }}
              eventDidMount={(eventInfo) => {
                eventInfo.el.style.backgroundColor = "transparent";
              }}
            />
          </div>
          <div className="sidebar">
            <h5>Events</h5>
            <ul>
              {currentEvents.map((event, index) => (
                <li key={index}>
                  <div className="event-item">
                    <span className="event-title">{event.description}</span>
                    <span className="event-date">
                      {formatDate(new Date(event.calenderDate), {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric"
                      })}
                    </span>
                    <span
                      className="action-icon"
                      onClick={() => handleEventClick(event._id)}
                    >
                      <FaTrash />
                    </span>
                    <span
                      className="action-icon"
                      onClick={() => handleEventClick(event._id)}
                    >
                      <FaEdit />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
