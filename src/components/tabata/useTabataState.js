import { useEffect, useState } from "react";

let timeout = null;

export default function useTabataState() {
  const [prepare, setPrepare] = useState(2);
  const [work, setWork] = useState(2);
  const [rest, setReset] = useState(2);
  const [cycles, setCycles] = useState(2);
  const [tabatas, setTabatas] = useState(1);
  const [active, setActive] = useState(false);

  const [totalSeconds, setTotalSeconds] = useState(
    prepare + (work + rest) * cycles * tabatas
  );
  const [secondsCalc, setSecondsCalc] = useState(
    prepare + (work + rest) * cycles * tabatas
  );
  const [postPrepare, setPostPrepare] = useState(secondsCalc - prepare)
  const [currentCycle, setCurrentCycle] = useState(work+rest)
  const [timerState, setTimerState] = useState("pre");
  
  const userInputs = [
    { name: "Prepare", value: prepare, set: setPrepare, text:"הכנה"},
    { name: "Work", value: work, set: setWork, text:"פעילות" },
    { name: "Rest", value: rest, set: setReset, text:"מנוחה" },
    { name: "Cycles", value: cycles, set: setCycles, text:"מס' מחזורים" },
    { name: "Tabatas", value: tabatas, set: setTabatas, text:"מס' אימונים" },
  ];

  const changeValues = {
    Prepare: (val) => val + (work + rest) * cycles * tabatas,
    Work: (val) => prepare + (val + rest) * cycles * tabatas,
    Rest: (val) => prepare + (val + work) * cycles * tabatas,
    Cycles: (val) => prepare + (work + rest) * val * tabatas,
    Tabatas: (val) => prepare + (work + rest) * cycles * val,
  };

  useEffect(() => {
    if (active && totalSeconds > 0) {
      timeout = setTimeout(() => timerLogic(), 1000);
    } else {
      clearTimerTimeout();
    }
    return () => clearTimerTimeout();
  }, [active, totalSeconds, postPrepare, currentCycle, timerState]);


  function clearTimerTimeout() {
    !timeout || clearTimeout(timeout);
  }


  function timerLogic() {
      const runningSec = totalSeconds - 1

      setTotalSeconds(runningSec);
      if(runningSec > postPrepare){
        setTimerState("prepare")
      }
      if(runningSec <= postPrepare){
        currentCycle - 1 === 0 ? setCurrentCycle(work+rest) : setCurrentCycle(currentCycle-1) 
      }if(currentCycle > rest){
        setTimerState("work")
      }else{
        setTimerState("rest")
      }
      console.log(runningSec, timerState)
  }

  function handleOnClick(name, val, set) {
    set(val);
    setTotalSeconds(changeValues[name](val));
    setSecondsCalc(changeValues[name](val))
    setCurrentCycle(work+rest)
    setPostPrepare(secondsCalc - prepare)
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
