import { React, useState, useEffect } from "react";
import moment from "moment";
import CustomTextField from "./CustomTextField";
import DatePicker from "./DatePicker";
import { Button } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { fetchAPI } from "./fetchAPI";

//moment(date, "dddd MM-DD-YYYY HH:mm:ss a").format("y-MM-DD HH:mm"),

const Tasks = () => {
  const [state, setState] = useState({
    newTask: {
      title: "",
      description: "",
      deadline: "",
    },
    tasks: [],
    opened: -1,
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
    let taskid = await fetchAPI(`tasks`, { method: "id" });
    console.log("taskid", taskid);
    const data = await fetchAPI(`tasks`, {
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
        id: taskid,
      }),
    });
    console.log("data", data);
    setState((prevState) => {
      console.log({
        ...prevState,
        newTask: { title: "", description: "", deadline: "" },
        tasks: [...prevState.tasks, data[data.length - 1]],
      });
      return {
        ...prevState,
        newTask: { title: "", description: "", deadline: "" },
        tasks: [...prevState.tasks, data[data.length - 1]],
      };
    });
  };

  const deleteTask = async (id) => {
    const res = await fetchAPI(`tasks`, { method: "DELETE", id: id });
    res.status === 200
      ? setState((prevState) => {
          return {
            ...prevState,
            tasks: prevState.tasks.filter((task) => task.id !== id),
          };
        })
      : alert("Error deleting tasks");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("box-lists-wrapper" + (1 === state.opened ? "-opened" : ""));
      const data = await fetchAPI(`tasks`, { method: "GET" });
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
          {state.tasks &&
            state.tasks.map((task, idx) => {
              console.log("task idx", idx, task);
              return (
                <div
                  className={
                    "box-lists-wrapper" +
                    (task.id === state.opened ? "-opened" : "")
                  }
                  key={idx}
                  onDoubleClick={() => {
                    setState((prevState) => {
                      return {
                        ...prevState,
                        opened: prevState.opened !== task.id ? task.id : -1,
                      };
                    });
                  }}
                >
                  <div className={"box-lists-wrapper-content"}>
                    <h4>{task.title}</h4>
                    <div>
                      <p style={{ display: "inline-block" }}>
                        {moment(task.deadline, "DD-MM-YYYY HH:mm:ss").fromNow()}
                      </p>
                      <CloseIcon
                        onClick={(e) => {
                          deleteTask(task.id);
                        }}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                  {state.opened === task.id && (
                    <div className="box-lists-wrapper-content">
                      {" "}
                      {task.description}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
