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

const ReasonBox = (props) => {
  const [state, setState] = useState({
    pauseTime: 0,
    reason: "",
    startTime: 0,
  });

  // const handleSubmit = async () => {
  //   const pause = {
  //     time: new Date(),
  //     reason: state.reason,
  //   };
  //   //write to db

  //   const res = await fetch("http://localhost:5000/pause", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(pause),
  //   });

  //   console.log("fetch response", res);
  //   setState((prevState) => {
  //     const reason = "RELAX";
  //     return {
  //       ...prevState,
  //       running: false,
  //       open: false,
  //       pauseTime: 0,
  //       reason: "",
  //     };
  //   });
  // };

  const handleSubmit = async () => {
    const pauseTime = new Date();
    const pauseReason = state.reason;
    const pause = {
      time: pauseTime,
      reason: pauseReason,
    };

    //write to the db

    const res = await fetch("http://localhost:5000/pause", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(pause),
    });

    console.log("fetch response", res);

    // //update state
    // setState((prevState) => {
    //   return {
    //     ...prevState,
    //     running: false,
    //     open: false,
    //     pauseTime: 0,
    //     reason: "",
    //   };
    // });
  };

  return (
    <div>
      <Dialog open={true} onClose={handleSubmit} fullWidth>
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
