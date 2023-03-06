import "./App.css";
import React, { useState, useEffect } from "react";
import { useInterval } from "usehooks-ts";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import {
  MdRestartAlt,
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from "react-icons/md";

function App() {
  let count = 25;
  const [changeSession, setChangeSession] = useState(false);
  const [sessionCount, setSessionCount] = useState(count);
  const [counter, setCounter] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [breakInput, setBreakInput] = useState(5);
  const [input, setInput] = useState(count);

  useInterval(
    () => {
      if (counter > 0) {
        setCounter((counter) => counter - 1);
      } else {
        setCounter(59);
        setSessionCount((sessionCount) => sessionCount - 1);
      }
    },
    isPaused ? 1000 : null
  );

  useEffect(() => {
    if (sessionCount === 0 && counter === 0) {
      alarmPlay();
      setIsPaused(false);
      setTimeout(() => {
        setChangeSession((prev) => !prev);
        setSessionCount(!changeSession ? breakInput : input);
        setIsPaused(true);
      }, 3000);
    }
  }, [counter, breakInput, changeSession, input, sessionCount]);

  function clickPause() {
    setIsPaused((prev) => !prev);
  }

  function inputWheelUp() {
    if (sessionCount < 60) {
      setSessionCount(sessionCount + 1);
      setInput(input + 1);
      setSessionCount(input + 1);
      setCounter(0);
    }
  }

  function inputWheelDown() {
    if (sessionCount > 1) {
      setSessionCount(sessionCount - 1);
      setInput(input - 1);
      setSessionCount(input - 1);
      setCounter(0);
    }
  }

  function breakWheelUp() {
    if (breakInput < 60) {
      setBreakInput(breakInput + 1);
    }
  }
  function breakWheelDown() {
    if (breakInput > 1) {
      setBreakInput(breakInput - 1);
    }
  }

  function alarmPlay() {
    const onPlay = document.getElementById("alarm");
    onPlay.play();
  }

  function restarClock() {
    setSessionCount(25);
    setInput(25);
    setBreakInput(5);
    setCounter(0);
    setIsPaused(false);
  }

  return (
    <div className="App">
      <audio src="sounds/alarm-2.mp3" id="alarm"></audio>
      <div id="belt-up"></div>
      <div id="display-box">
        <p>Session Length</p>
        <div className="session-time">
          <div onWheel={!isPaused ? inputWheelUp : null}>
            <MdOutlineKeyboardDoubleArrowUp />
          </div>
          <h3>{input}</h3>
          <div onWheel={!isPaused ? inputWheelDown : null}>
            <MdOutlineKeyboardDoubleArrowDown />
          </div>
        </div>
        <div className="clock-time">
          <h4 style={sessionCount === 0 ? { color: "#FF3232" } : null}>
            {!changeSession ? "Session" : "Break"}
          </h4>
          <h1
            style={sessionCount === 0 ? { color: "#FF3232" } : null}
            className="prueba"
          >
            {sessionCount}:{counter < 10 ? "0" + counter : counter}
          </h1>
          <button
            onClick={clickPause}
            disabled={sessionCount === 0 && counter === 0 ? true : false}
          >
            {!isPaused ? <BsPlayFill /> : <BsPauseFill />}
          </button>
          <button onClick={restarClock}>
            <MdRestartAlt />
          </button>
        </div>
        <div className="break-time">
          <div onWheel={!isPaused ? breakWheelUp : null}>
            <MdOutlineKeyboardDoubleArrowUp />
          </div>
          <h3>{breakInput}</h3>
          <div onWheel={!isPaused ? breakWheelDown : null}>
            <MdOutlineKeyboardDoubleArrowDown />
          </div>
        </div>
        <p>Break Length</p>
      </div>
      <div id="belt-down">
        <div className="dot">▄▄</div>
        <div className="dot">▄▄</div>
      </div>
    </div>
  );
}

export default App;
