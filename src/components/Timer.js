import React, { useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Dialog,
  Button,
  TextField,
} from "@material-ui/core";
import ReasonBox from "./ReasonBox";

const Timer = () => {
  const [state, setState] = useState({
    running: false,
    time: {},
    seconds: 3600,
    id: -1,
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

  // const handleClose = () => {
  //   setState((prevState) => {
  //     const reason = "RELAX";
  //     return {
  //       ...prevState,
  //       running: false,
  //       open: false,
  //       pauseTimes: [...state.pauseTimes, new Date()],
  //       pauseReason: [...state.pauseReason, reason],
  //       reason: "",
  //     };
  //   });
  // };

  // const handleSubmit = () => {
  //   setState((prevState) => {
  //     const reason = prevState.reason;
  //     return {
  //       ...prevState,
  //       running: false,
  //       open: false,
  //       pauseTimes: [...state.pauseTimes, new Date()],
  //       pauseReason: [...state.pauseReason, reason],
  //       reason: "",
  //     };
  //   });
  // };

  const toggleTimer = () => {
    if (!state.running) {
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
        };
      });
      clearInterval(state.id);
    }
    console.log(state);
  };

  return (
    <div className="container">
      <ReasonBox props={{}} />
      <div className="timer-glow">
        <div className="timer">
          <h3>{state.seconds}</h3>
          <button className="btn" onClick={toggleTimer}>
            {!state.running ? "START" : "PAUSE"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
