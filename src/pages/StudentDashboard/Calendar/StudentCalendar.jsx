import { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import "./StudentCalendar.css";

const StudentCalendar = () => {
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

  return (
    <>
      <div className="calendarContainer">
        <div className="calendarContent">
          <div className="calendar">
            <FullCalendar
              height="85vh"
              className="customFullCalendar"
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
              events={currentEvents.map((event) => ({
                id: event._id,
                title: event.description,
                start: event.calenderDate
              }))}
              eventContent={(eventInfo) => {
                return (
                  <div
                    style={{
                      textAlign: "center",
                      backgroundColor: eventInfo.event.backgroundColor
                    }}
                  >
                    <span>{eventInfo.event.title}</span>
                  </div>
                );
              }}
            />
          </div>
          <div className="sidebar">
            <h5>Events</h5>
            <ul>
              {currentEvents.map((event, index) => (
                <li key={index}>
                  <div className="eventItem">
                    <span className="eventTitle">{event.description}</span>
                    <span className="eventDate">
                      {formatDate(new Date(event.calenderDate), {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric"
                      })}
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

export default StudentCalendar;
