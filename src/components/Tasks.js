import { React, useState, useEffect } from "react";
import moment from "moment";

const Tasks = () => {
  const [state, setstate] = useState({
    tasks: [],
  });

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
          {state.tasks.map((task) => {
            return (
              <div className="box-lists-wrapper">
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
