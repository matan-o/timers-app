import React from "react";
import './tabata.css';

import useTabataState from "./useTabataState";

function Tabata() {
  let {
    userInputs,
    totalSeconds,
    active,
    handleOnClick,
    toggle,
  } = useTabataState();

  function RenderTimer() {
    let m = Math.floor(totalSeconds / 60);
    let s = totalSeconds - 60 * m;
    m = m >= 10 ? m : `0${m}`;
    s = s >= 10 ? s : `0${s}`;
    return (
      <h1 className="tabataTimer">
        {m} : {s}
      </h1>
    );
  }

  function Inputs() {
    return (
      <div className="tabataInputs">
        {userInputs.map((prop, i) => {
          return (
            <div key={i}>
              <span>
                <button
                  disabled={active}
                  onClick={() =>
                    handleOnClick(prop.name, prop.value + 1, prop.set)
                  }
                >
                  +
                </button>
                <button
                  disabled={active}
                  onClick={() =>
                    handleOnClick(prop.name, prop.value - 1, prop.set)
                  }
                >
                  -
                </button>
                {prop.text} : {prop.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <h1 className="heading">אימון מחזורי</h1>
      <div className="tabataContainer">
        <RenderTimer/>
        <Inputs/>
        <button className="activeButton" onClick={toggle}>{active ? "Pause" : "Run"}</button>
      </div>
      
    </div>
  );
}

export default Tabata;
