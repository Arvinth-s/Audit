import moment from "moment";
import { React, useState, useEffect } from "react";

const Stats = () => {
  const [state, setState] = useState({
    pauseResponse: [],
    startResponse: [],
    average: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    let res = await fetch(`http://localhost:5000/pause`, { method: "GET" });
    const pauseData = await res.json();

    res = await fetch(`http://localhost:5000/startTime`, { method: "GET" });
    const startData = await res.json();

    console.log("startData", startData);
    console.log("pauseData", pauseData);

    const intervals = pauseData.map((data, idx) => {
      return [startData[idx], data.time];
    });
    console.log("intervals", intervals);

    let sum = 0;
    intervals.map((interval) => {
      console.log("interval", interval);

      const date1 = moment(interval[1], "DD-MM-YYYY HH:mm:ss"),
        date2 = moment(interval[0].time, "DD-MM-YYYY HH:mm:ss");

      sum += date1.diff(date2, "seconds");

      console.log(
        "date1",
        date1,
        "date2",
        date2,
        "diff",
        date1.diff(date2, "seconds"),
        "sum",
        sum
      );
    });

    let avg = (sum / intervals.length).toFixed(2);

    setState((prevState) => {
      return {
        ...prevState,
        pauseResponse: pauseData,
        startResponse: startData,
        average: avg,
      };
    });

    console.log("average session length: ", avg);
  };

  return (
    <div className="container">
      <div className="box">
        <h1>{"Stats"}</h1>
        <div>
          <p>
            {"Average"} {state.average}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
