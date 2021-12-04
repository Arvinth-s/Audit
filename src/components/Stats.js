import moment from "moment";
import { React, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  Tooltip,
  CategoryScale,
  LinearScale,
  Title,
  registerables,
} from "chart.js";
import { fetchAPI } from "./fetchAPI";

import "@testing-library/react";

Chart.register(Tooltip, CategoryScale, LinearScale, Title);
Chart.register(...registerables);

const Stats = () => {
  const [state, setState] = useState({
    pauseResponse: [],
    startResponse: [],
    intervals: [],
    average: 0,
    chartdata: {
      type: "bar",
      data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            label: "Time in seconds",
            data: [65, 59, 80, 81, 56],
            backgroundColor: [
              "#50AF95",
              "#f3ba2f",
              "#50AF95",
              "#f3ba2f",
              "#50AF95",
            ],
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Time spent [Hour]",
          },
          legend: {
            display: true,
            position: "bottom",
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchStats = async () => {
      const intervals = await fetchAPI("interval", {
        method: "GET",
      });

      let sum = 0;
      intervals.map((interval) => {
        const date1 = moment(interval.pauseTime, "DD-MM-YYYY HH:mm:ss"),
          date2 = moment(interval.startTime, "DD-MM-YYYY HH:mm:ss");
        sum += date1.diff(date2, "seconds");
        return 0;
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
    fetchStats();
  }, []);

  const dayTimeAverage = async (intervals) => {
    const targetIntervals = [];
    for (let i = 1; i < 10; i++) {
      targetIntervals.push("0" + i + ":00:00");
    }
    for (let i = 10; i < 24; i++) {
      targetIntervals.push(i + ":00:00");
    }

    var testIntervals = [];
    for (let i = 0; i < 23; i++) {
      let temp_intervals = intervals.filter((value) => {
        return (
          moment(value.startTime, "DD-MM-YYYY HH:mm:ss").hour() <
            moment(targetIntervals[i + 1], "HH:mm:ss").hour() &&
          moment(value.startTime, "DD-MM-YYYY HH:mm:ss").hour() >=
            moment(targetIntervals[i], "HH:mm:ss").hour()
        );
      });
      let temp_sum = 0;
      temp_intervals.map((interval) => {
        var a = Math.min(
          60 *
            60 *
            (moment(interval.startTime, "DD-MM-YYYY HH:mm:ss").hour() + 1),
          60 * 60 * moment(interval.pauseTime, "DD-MM-YYYY HH:mm:ss").hour() +
            60 * moment(interval.pauseTime, "DD-MM-YYYY HH:mm:ss").minute() +
            moment(interval.pauseTime, "DD-MM-YYYY HH:mm:ss").seconds()
        );
        var b =
          60 * 60 * moment(interval.startTime, "DD-MM-YYYY HH:mm:ss").hour() +
          60 * moment(interval.startTime, "DD-MM-YYYY HH:mm:ss").minute() +
          moment(interval.startTime, "DD-MM-YYYY HH:mm:ss").seconds();
        var ts = a - b;
        temp_sum += Math.log10(1 + ts);

        // console.log("moments", a, b, "tempsum", temp_sum, "ts", ts, i);
        return 0;
      });
      testIntervals.push(temp_sum);
    }

    console.log("testIntervals", testIntervals);
    plotGraph({
      labels: targetIntervals,
      data: testIntervals,
    });
  };

  const plotGraph = ({ labels, data }) => {
    // console.log("labels", labels, "data", data);
    const colors = ["#50AF95", "#f3ba2f"];
    const backgroundColor = [
      labels.map((label, idx) => {
        return colors[idx % 2];
      }),
    ];

    console.log("bgcolor", backgroundColor);
    setState((prevState) => {
      return {
        ...prevState,
        chartdata: {
          ...prevState.chartdata,
          data: {
            ...prevState.chartdata.data,
            labels: labels,
            datasets: [
              {
                label: "Time in log (seconds)",
                data: data,
                backgroundColor: backgroundColor[0],
              },
            ],
          },
        },
      };
    });
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
        <div>
          <Bar data={state.chartdata.data} options={state.chartdata.options} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
