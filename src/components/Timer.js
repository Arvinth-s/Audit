import React, { useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Dialog,
  Button,
} from "@material-ui/core";

const Timer = () => {
  const [state, setState] = useState({
    running: false,
    time: {},
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

  const handleClose = () => {
    setState((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const startTimer = () => {
    if (!state.running) {
      let id = setInterval(countDown, state.seconds);
      setState((prevState) => {
        return { ...prevState, running: true, id: id };
      });
    } else {
      setState((prevState) => {
        return { ...prevState, running: false, open: true };
      });
      clearInterval(state.id);
    }
  };

  return (
    <div className="container">
      <div className="timer-glow">
        <div className="timer">
          <h3>{state.seconds}</h3>
          <button className="btn" onClick={startTimer}>
            {!state.running ? "START" : "PAUSE"}
          </button>
        </div>
      </div>
      <Dialog open={state.open} onClose={handleClose}>
        <DialogTitle>Reason</DialogTitle>
        <DialogContent>
          <DialogContentText>Why do you want to pause?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Timer;
