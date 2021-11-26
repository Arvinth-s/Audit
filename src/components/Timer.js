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
      await fetch(`http://localhost:5000/startTime`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ time: moment().format("DD-MM-YYYY HH:mm:ss") }),
      }).then((res) => {
        console.log("response: ", res);
      });

      let id = setInterval(countDown, state.seconds);
      setState((prevState) => {
        return {
          ...prevState,
          running: true,
          id: id,
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
          time: moment().format("DD-MM-YYYY HH:mm:ss"),
        }}
        openHandle={openHandle}
      />
      <div className="timer-glow">
        <div className="timer">
          <h3>
            {state.time.h}
            {"h"} {state.time.m}
            {"m"} {state.time.s} {"s"}
          </h3>
          <button className="btn" onClick={toggleTimer}>
            {!state.running ? "START" : "PAUSE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
