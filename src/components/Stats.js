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
Chart.register(Tooltip, CategoryScale, LinearScale, Title);
Chart.register(...registerables);

const Stats = () => {
  const [state, setState] = useState({
    pauseResponse: [],
    startResponse: [],
    intervals: [],
    average: 0,
    metadata: {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category",
            display: true,
            scaleLabel: {
              display: false,
            },
            offset: true,
            autoSkip: false,
            ticks: {
              display: true,
              font: {
                size: 16,
              },
            },
            gridLines: {
              display: false,
            },
          },
          y: {
            type: "category",
            offset: true,
            autoSkip: false,
            ticks: {
              display: true,
            },
            gridLines: {
              display: false,
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchStats = async () => {
      let res = await fetch(`http://localhost:5000/interval`, {
        method: "GET",
      });
      const intervals = await res.json();

      console.log("intervals", intervals);

      let sum = 0;
      intervals.map((interval) => {
        const date1 = moment(interval.pauseTime, "DD-MM-YYYY HH:mm:ss"),
          date2 = moment(interval.startTime, "DD-MM-YYYY HH:mm:ss");
        sum += date1.diff(date2, "seconds");
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
    var i;
    for (i = 0; i < 10; i++) {
      targetIntervals.push("0" + i + ":00:00");
    }
    for (i = 10; i < 24; i++) {
      targetIntervals.push(i + ":00:00");
    }

    const testInterval = intervals.filter((value) => {
      return (
        moment(value.startTime, "DD-MM-YYYY HH:mm:ss").hour() <
        moment(targetIntervals[14], "HH:mm:ss").hour()
      );
    });

    console.log("testInterval", testInterval);
    plotGraph({ labels: targetIntervals, data: [1] * 24 });
  };

  const plotGraph = ({ labels, data }) => {
    const graphData = {
      labels: labels,
      datasets: [
        {
          label: "Effective Hours",
          backgroundColor: "rgba(0, 0, 0, 1)",
          data: data,
        },
      ],
    };
    // setState((prevState) => {
    //   return {
    //     ...prevState,
    //     metadata: graphData,
    //     showGraph: true,
    //   };
    // });
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
          <Bar
            data={{
              labels: ["1", "2", "3", "4", "5"],
              datasets: [
                {
                  label: "Price in USD",
                  data: [65, 59, 80, 81, 56],
                  backgroundColor: [
                    "#ffbb11",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Cryptocurrency prices",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;
