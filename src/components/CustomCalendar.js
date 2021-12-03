import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/daygrid/main.css";

const CustomCalendar = () => {
  const events = [{ title: "today's event", date: new Date() }];

  return (
    <div className="container">
      {/* <div className="box"> */}
      <div
        style={{
          height: "60vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FullCalendar
          initialView="timeGridWeek"
          plugins={[timeGridPlugin]}
          events={events}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default CustomCalendar;
