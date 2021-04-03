import { useState } from "react";
import Tabata from "./components/Tabata";
import Timer from "./components/timer";




function App() {


  const [prepare, setPrepare] = useState(0)
  const [work, setWork] = useState(0)
  const [rest, setRest] = useState(0)
  const [cycles, setCycles] = useState(0)
  const [tabatas, setTabatas] = useState(0)


  return (
    <Tabata/>
  );
}

export default App;
