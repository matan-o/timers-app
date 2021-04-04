import { useEffect, useState } from "react";

function Tabata(){
    // user inputs
    const [prepare, setPrepare] = useState(10)
    const [work, setWork ] = useState(20)
    const [rest, setReset] = useState(10)
    const [cycles, setCycles] = useState(8)
    const [tabatas, setTabatas] = useState(1)
    const [active, setActive] = useState(false)
    // logic states
    const [totalSeconds, setTotalSeconds] = useState(0)
    const [onPrepare, setOnPrepare] = useState(false)
    const [onWork, setOnWork] = useState(false)
    const [onRest, setOnRest] = useState(false)

    const userInput = [
        {name: "Prepare", value: prepare, set: setPrepare},
        {name: "Work", value: work, set: setWork},
        {name: "Rest", value: rest, set: setReset},
        {name: "Cycles", value: cycles, set: setCycles},
        {name: "Tabatas", value: tabatas, set: setTabatas},
    ]

    useEffect(()=>{
        setTotalSeconds(prepare + ((work + rest) * cycles ) * tabatas)
    })

    useEffect(()=>{
        
        let timeout = null
        if(active){
            timeout = setTimeout(() => {
                timerLogic()
            }, 1000);
        return ()=>{!timeout || clearTimeout(timeout)} 
        }
    },[active, prepare, work, rest, cycles, tabatas, totalSeconds]);

    function timerLogic(){
        setTotalSeconds(totalSeconds-1)
    }

    function renderTimer(){
        let sec = totalSeconds 
        let m = Math.floor(sec/60)
        let s = sec-(60*m)
        let minute = m >= 10 ? m : `0${m}`
        let second = s >= 10 ? s : `0${s}`
        return <h2>{minute} : {second}</h2>
    }

    function toggle(){
        setActive(!active)
    };

    return(
        <div>
            <h2>Tabata</h2>
            { renderTimer()}
            {userInput.map((prop, i)=>{
                return (
                    <div key={i}>
                        <span> 
                        <button disabled={active} onClick={()=>prop.set(prop.value +1)}>+</button>
                        <button disabled={active} onClick={()=>prop.value !== 0 ? prop.set(prop.value -1) : null}>-</button>
                        {prop.name} : {prop.value}
                        </span>
                    </div>
                )
            })
                
            }
            <button onClick={toggle}>{active ? 'Pause':'Run'}</button>
        </div>
        
    )

};

export default Tabata;