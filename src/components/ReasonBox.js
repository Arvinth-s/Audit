import { React, useState, useEffect } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Dialog,
  Button,
  TextField,
} from "@material-ui/core";

const ReasonBox = ({ props, openHandle }) => {
  const [state, setState] = useState({
    pauseTime: 0,
    reason: "",
    startTime: 0,
  });

  const handleSubmit = async () => {
    const pauseTime = new Date();
    const pauseReason = state.reason;
    const pause = {
      time: pauseTime,
      reason: pauseReason,
    };
    console.log("reason", state.reason);

    const res = await fetch(`http://localhost:5000/pause`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(pause),
    });

    console.log("fetch response", res);
    openHandle(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          handleSubmit(false);
        }}
        fullWidth
      >
        <DialogTitle>Reason</DialogTitle>
        <DialogContent>
          <DialogContentText>Why do you want to pause?</DialogContentText>
        </DialogContent>
        <TextField
          id="filled-basic"
          variant="filled"
          style={{ margin: "20px" }}
          value={props.reason}
          onChange={(e) => {
            console.log("reason", state.reason);
            setState((prevState) => {
              return { ...prevState, reason: e.target.value };
            });
          }}
        />
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Relax
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReasonBox;
