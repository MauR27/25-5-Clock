import "./App.css";
import React, { useState, useEffect } from "react";
import { useInterval } from "usehooks-ts";

function App() {
  let count = 5;
  let play;
  const [input, setInput] = useState(count);
  const [counter, setCounter] = useState("00");

  useEffect(() => {
    if (counter > 0) {
      play = setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setCounter(59);
      setInput(input - 1);
    }
  }, [counter]);

  function clickPlay() {
    // clearTimeout(play);
  }
  function clickPause() {}

  function onWheelUp() {
    if (input < 60) {
      setInput(input + 1);
    }
  }

  function onWheelDown() {
    if (input > 0) {
      setInput(input - 1);
    }
  }

  return (
    <div className="App">
      <div id="belt-up"></div>
      <div id="display-box">
        <p>Session Time</p>
        <div className="session-time">
          <div onWheel={onWheelUp}>▲</div>
          <div>{input}</div>
          <div onWheel={onWheelDown}>▼</div>
        </div>
        <div className="clock-time">
          <h1>
            {input} : {counter}
          </h1>
          <button onClick={clickPlay}>P</button>
          <button onClick={clickPause}>R</button>
        </div>
        <div className="break-time">
          <div onWheel={onWheelUp}>▲</div>
          <div>{input}</div>
          <div onWheel={onWheelDown}>▼</div>
        </div>
        <p>Break Time</p>
      </div>
      <div id="belt-down">
        <div className="dot">.</div>
        <div>.</div>
        <div>.</div>
      </div>
    </div>
  );
}

export default App;
