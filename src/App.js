import "./App.css";
import Timer from "./components/Timer";
import Header from "./components/Header";
import Stats from "./components/Stats";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="page">
        <Stats />
        <Timer />
        {/* <Stats /> */}
      </div>
    </div>
  );
}

export default App;
