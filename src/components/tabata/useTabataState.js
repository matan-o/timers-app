import { useEffect, useState } from "react";

let timeout = null;

export default function useTabataState() {
  const [prepare, setPrepare] = useState(10);
  const [work, setWork] = useState(20);
  const [rest, setReset] = useState(10);
  const [cycles, setCycles] = useState(8);
  const [tabatas, setTabatas] = useState(1);
  const [active, setActive] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(
    prepare + (work + rest) * cycles * tabatas
  );
  const [onPrepare, setOnPrepare] = useState(false);
  const [onWork, setOnWork] = useState(false);
  const [onRest, setOnRest] = useState(false);

  const userInputs = [
    { name: "Prepare", value: prepare, set: setPrepare },
    { name: "Work", value: work, set: setWork },
    { name: "Rest", value: rest, set: setReset },
    { name: "Cycles", value: cycles, set: setCycles },
    { name: "Tabatas", value: tabatas, set: setTabatas },
  ];

  const changeValues = {
    Prepare: (val) => val + (work + rest) * cycles * tabatas,
    Work: (val) => prepare + (val + rest) * cycles * tabatas,
    Rest: (val) => prepare + (val + work) * cycles * tabatas,
    Cycles: (val) => prepare + (work + rest) * val * tabatas,
    Tabatas: (val) => prepare + (work + rest) * cycles * val,
  };

  useEffect(() => {
    if (active) {
      timeout = setTimeout(() => timerLogic(), 1000);
    } else {
      clearTimerTimeout();
    }

    return () => clearTimerTimeout();
  }, [active, totalSeconds]);

  function clearTimerTimeout() {
    !timeout || clearTimeout(timeout);
  }

  function timerLogic() {
    if (active) {
      setTotalSeconds(totalSeconds - 1);
    }
  }

  function handleOnClick(name, val, set) {
    set(val);
    setTotalSeconds(changeValues[name](val));
  }

  function toggle() {
    setActive(!active);
  }

  return {
    userInputs,
    totalSeconds,
    active,
    handleOnClick,
    toggle,
  };
}
