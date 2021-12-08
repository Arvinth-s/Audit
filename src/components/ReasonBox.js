import { React, useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Dialog,
  Button,
  TextField,
} from "@material-ui/core";
import { fetchAPI } from "./fetchAPI";

const ReasonBox = ({ props, openHandle }) => {
  const [state, setState] = useState({
    reason: "",
  });

  const handleSubmit = async () => {
    const pauseTime = props.pauseTime;
    const pauseReason = state.reason;
    const intervalid = await fetchAPI(`interval`, { method: "id" });
    const pause = {
      startTime: props.startTime,
      pauseTime: pauseTime,
      reason: pauseReason,
      session: props.id,
      id: intervalid,
    };
    console.log("pause", pause);
    const res = await fetchAPI(`interval`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(pause),
    });

    console.log("fetch response", res);
    setState((prevState) => {
      return { ...prevState, reason: "" };
    });
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
