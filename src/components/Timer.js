import moment from "moment";
import React, { useState, useEffect } from "react";
import ReasonBox from "./ReasonBox";
import { TextField } from "@material-ui/core";

const Timer = () => {
  const sessionTime = 10 * 1,
    relaxTime = 5 * 1;
  const [state, setState] = useState({
    running: false,
    started: false,
    time: { h: "0", m: "0", s: "10" },
    seconds: sessionTime,
    id: -1,
    open: false,
    startTime: 0,
    sessionId: -1,
    relax: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/interval`, {
        method: "GET",
      });
      let max = 0;
      const data = await res.json();
      data.map((interval) => {
        max = max < interval.session ? interval.session : max;
        return interval.session;
      });
      const ssid = max + 1;
      console.log("ssid", ssid);
      setState((prevState) => {
        return {
          ...prevState,
          sessionId: ssid,
        };
      });
    };
    fetchData();
  }, []);

  const countDown = () => {
    setState((prevState) => {
      return {
        ...prevState,
        time: secondsToTime(prevState.seconds),
        seconds:
          prevState.seconds !== 0
            ? prevState.seconds - 1
            : prevState.relax
            ? sessionTime
            : relaxTime,
        relax: (prevState.seconds === 0) ^ prevState.relax,
      };
    });
  };

  const secondsToTime = (seconds) => {
    let hours = Math.floor(seconds / (60 * 60));
    seconds %= 60 * 60;
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  const openHandle = (value) => {
    setState((prevState) => {
      return { ...prevState, open: value };
    });
  };

  const toggleTimer = async () => {
    if (!state.started) {
      let id = setInterval(countDown, 1000);
      setState((prevState) => {
        return {
          ...prevState,
          started: true,
          running: true,
          id: id,
          startTime: moment().format("DD-MM-YYYY HH:mm:ss"),
        };
      });
    } else {
      //clicked stop
      setState((prevState) => {
        return {
          ...prevState,
          running: false,
          started: false,
          time: secondsToTime(sessionTime),
          sessionId: prevState.sessionId + 1,
          // open: true,
        };
      });
      clearInterval(state.id);
    }
  };

  const pauseTimer = async () => {
    if (!state.running) {
      //clicked resume
      let id = setInterval(countDown, 1000);
      setState((prevState) => {
        return {
          ...prevState,
          running: true,
          id: id,
          startTime: moment().format("DD-MM-YYYY HH:mm:ss"),
        };
      });
    } else {
      //clicked pause
      setState((prevState) => {
        return {
          ...prevState,
          running: false,
          open: true,
        };
      });
      clearInterval(state.id);
    }
  };

  return (
    <div className="container">
      <ReasonBox
        props={{
          open: state.open,
          id: state.sessionId,
          pauseTime: moment().format("DD-MM-YYYY HH:mm:ss"),
          startTime: state.startTime,
        }}
        openHandle={openHandle}
      />
      <div className="timer-glow">
        <div className="timer">
          <h2>{state.relax ? "Relax..." : "Focus..."}</h2>
          <h2>
            {state.time.h}
            {"h"} {state.time.m}
            {"m"} {state.time.s} {"s"}
          </h2>
          <div style={{ display: "flex" }}>
            {state.started && (
              <button className="secondary-btn" onClick={pauseTimer}>
                {state.running ? "PAUSE" : "RESUME"}
              </button>
            )}
            <button className="btn" onClick={toggleTimer}>
              {!state.started ? "START" : "STOP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
