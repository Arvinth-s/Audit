import moment from "moment";
import { React, useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";

const Stats = () => {
  const [state, setState] = useState({
    pauseResponse: [],
    startResponse: [],
    intervals: [],
    average: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const dayTimeAverage = async (intervals) => {
    const targetIntervals = [];
    var i;
    for (i = 0; i < 10; i++) {
      targetIntervals.push("0" + i + ":00:00");
    }
    for (i = 10; i < 24; i++) {
      targetIntervals.push(i + ":00:00");
    }
    const momentIntervals = targetIntervals.map((interval) => {
      return moment(interval, "HH:mm:ss");
    });
    const testInterval = intervals.filter((value) => {
      return (
        moment(value.startTime, "DD-MM-YYYY HH:mm:ss").hour() <
        moment(targetIntervals[14], "HH:mm:ss").hour()
      );
    });

    console.log("testInterval", testInterval);
  };

  const fetchStats = async () => {
    let res = await fetch(`http://localhost:5000/interval`, { method: "GET" });
    const intervals = await res.json();

    console.log("intervals", intervals);

    let sum = 0;
    intervals.map((interval) => {
      const date1 = moment(interval.pauseTime, "DD-MM-YYYY HH:mm:ss"),
        date2 = moment(interval.startTime, "DD-MM-YYYY HH:mm:ss");

      sum += date1.diff(date2, "seconds");

      // console.log(
      //   // "date1",
      //   // date1,
      //   // "date2",
      //   // date2,
      //   "diff",
      //   date1.diff(date2, "seconds"),
      //   "sum",
      //   sum
      // );
    });

    let avg = (sum / intervals.length).toFixed(2);

    setState((prevState) => {
      return {
        ...prevState,
        pauseResponse: intervals.pauseTime,
        startResponse: intervals.startTime,
        average: avg,
        intervals: intervals,
      };
    });

    dayTimeAverage(intervals);

    console.log("average session length: ", avg);
  };

  return (
    <div className="container">
      <div className="box">
        <h1>{"Stats"}</h1>
        <div className="box-items">
          <p>{"Average Session Time"}</p>
          <p>{state.average}</p>
        </div>
        <div className="box-items">
          <p>{"Number of sessions"}</p>
          <p>{state.intervals.length}</p>
        </div>
        {/* <div className="box-items">
          
        </div> */}
      </div>
    </div>
  );
};

export default Stats;
