import moment from "moment";
import React, { useState } from "react";
import ReasonBox from "./ReasonBox";

const Timer = () => {
  const [state, setState] = useState({
    running: false,
    time: { h: "1", m: "0", s: "0" },
    seconds: 3600,
    id: -1,
    open: false,
    startTime: 0,
  });

  const countDown = () => {
    setState((prevState) => {
      return {
        ...prevState,
        time: secondsToTime(prevState.seconds),
        seconds: prevState.seconds - 1,
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
    if (!state.running) {
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
          pauseTime: moment().format("DD-MM-YYYY HH:mm:ss"),
          startTime: state.startTime,
        }}
        openHandle={openHandle}
      />
      <div className="timer-glow">
        <div className="timer">
          <h2>
            {state.time.h}
            {"h"} {state.time.m}
            {"m"} {state.time.s} {"s"}
          </h2>
          <button className="btn" onClick={toggleTimer}>
            {!state.running ? "START" : "PAUSE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
