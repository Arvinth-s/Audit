import { React, useState, useEffect } from "react";
import moment from "moment";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/daygrid/main.css";

const CustomCalendar = () => {
  const [state, setState] = useState({
    tasks: [],
    events: [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`http://localhost:5000/tasks`, {
        method: "GET",
      });
      const data = await res.json();
      let event = [];
      console.log("data", data);
      data.map((task) => {
        event.push({
          title: task.title,
          date: new Date(
            moment(task.deadline, "DD-MM-y HH:mm").format(
              "ddd MMMM DD yy hh:mm:ss a"
            )
          ),
        });
        return task;
      });
      setState((prevState) => {
        return { ...prevState, tasks: data, events: event };
      });
      console.log("event", event);
      return state.tasks;
    };
    fetchTasks();
  }, []);

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
          events={state.events}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default CustomCalendar;
