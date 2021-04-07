import React from "react";

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
      <h2>
        {m} : {s}
      </h2>
    );
  }

  function Inputs() {
    return (
      <>
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
                {prop.name} : {prop.value}
              </span>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div>
      <h1>אימון מחזורי</h1>
      <RenderTimer/>
      <Inputs/>
      <button onClick={toggle}>{active ? "Pause" : "Run"}</button>
    </div>
  );
}

export default Tabata;
