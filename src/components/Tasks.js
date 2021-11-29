import { React, useState, useEffect } from "react";
import moment from "moment";
import CustomTextField from "./CustomTextField";

const Tasks = () => {
  const [state, setstate] = useState({
    newTask: {
      title: "",
      description: "",
    },
    tasks: [],
  });
  const textHandler = (value) => {
    setstate((prevState) => {
      console.log("prevState.title", prevState.title);
      return {
        ...prevState,
        newTask: { ...prevState.newTask, title: value },
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
      setstate((prevState) => {
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
                props={{
                  textHandler: textHandler,
                }}
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