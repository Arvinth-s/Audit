import { React, useState, useEffect } from "react";
import moment from "moment";
import CustomTextField from "./CustomTextField";
import DatePicker from "./DatePicker";
import { Button } from "@material-ui/core";

//moment(date, "dddd MM-DD-YYYY HH:mm:ss a").format("y-MM-DD HH:mm"),

const Tasks = () => {
  const [state, setState] = useState({
    newTask: {
      title: "",
      description: "",
      deadline: "",
    },
    tasks: [],
  });
  const titleHandler = (value) => {
    setState((prevState) => {
      return {
        ...prevState,
        newTask: { ...prevState.newTask, title: value },
      };
    });
  };
  const descriptionHandler = (value) => {
    setState((prevState) => {
      return {
        ...prevState,
        newTask: { ...prevState.newTask, description: value },
      };
    });
  };

  const submitHandler = async () => {
    console.log("submitting...");
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: state.newTask.title,
        description: state.newTask.description,
        deadline: moment(
          state.newTask.deadline,
          "dddd MM-DD-YYYY HH:mm:ss a"
        ).format("DD-MM-y HH:mm"),
      }),
    });
    setState((prevState) => {
      return {
        ...prevState,
        newTask: { title: "", description: "", deadline: "" },
      };
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`http://localhost:5000/tasks`, {
        method: "GET",
      });
      const data = await res.json();
      console.log("data:", data);
      setState((prevState) => {
        return { ...prevState, tasks: data };
      });
      return data;
    };
    fetchTasks();
  }, []);
  return (
    <div className="container">
      <div className="box">
        <h1>{"Tasks"}</h1>
        <div className="box-lists">
          <div className="box-lists-form">
            <div className="box-lists-form-wrapper">
              <CustomTextField
                key={1}
                label={"Title"}
                textHandler={titleHandler}
                value={state.newTask.title}
              />
            </div>
            <div className="box-lists-form-wrapper">
              <CustomTextField
                key={2}
                label={"Description"}
                textHandler={descriptionHandler}
                value={state.newTask.description}
              />
            </div>
            <div className="box-lists-form-wrapper">
              <DatePicker
                value={state.newTask.deadline}
                dateHandler={(value) => {
                  console.log(
                    "state.newTask.deadline",
                    state.newTask.deadline,
                    "value",
                    value
                  );
                  setState((prevState) => {
                    return {
                      ...prevState,
                      newTask: { ...prevState.newTask, deadline: value },
                    };
                  });
                }}
              />
              <Button variant="contained" onClick={submitHandler}>
                Submit
              </Button>
            </div>
          </div>
          {state.tasks.map((task, idx) => {
            return (
              <div className="box-lists-wrapper" key={idx}>
                <h4>{task.title}</h4>
                <h4>
                  {moment(task.deadline, "DD-MM-YYYY HH:mm:ss").fromNow()}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
