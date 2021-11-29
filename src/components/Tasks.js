import { React, useState, useEffect } from "react";
import moment from "moment";
import CustomTextField from "./CustomTextField";
import DateTimePicker from "react-datetime-picker";
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
                props={{
                  label: "Title",
                  textHandler: titleHandler,
                }}
              />
              <CustomTextField
                key={2}
                props={{
                  label: "Description",
                  textHandler: descriptionHandler,
                }}
              />
              <DateTimePicker
                onChange={(date) => {
                  console.log(
                    "date",
                    date,
                    moment(date, "dddd MM-DD-YYYY HH:mm:ss a").format(
                      "y-MM-DD HH:mm"
                    )
                  );
                  setState((prevState) => {
                    return {
                      ...prevState,
                      newTask: {
                        ...prevState.newTask,
                        deadline: date,
                      },
                    };
                  });
                }}
                value={state.newTask.deadline}
              />
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
