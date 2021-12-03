import "./App.css";
import Timer from "./components/Timer";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Tasks from "./components/Tasks";
import CustomCalendar from "./components/CustomCalendar";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="page">
        <Stats />
        <Timer />
      </div>
      <div className="page">
        <Tasks />
      </div>
      <div className="page">
        <CustomCalendar />
      </div>
    </div>
  );
}

export default App;
