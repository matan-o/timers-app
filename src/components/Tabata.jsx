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
    const [totalSeconds, setTotalSeconds] = useState(prepare + ((work + rest) * cycles ) * tabatas)
    const [onPrepare, setOnPrepare] = useState(false)
    const [onWork, setOnWork] = useState(false)
    const [onRest, setOnRest] = useState(false)

    const userInputs = [
        {name: "Prepare", value: prepare, set: setPrepare},
        {name: "Work", value: work, set: setWork},
        {name: "Rest", value: rest, set: setReset},
        {name: "Cycles", value: cycles, set: setCycles},
        {name: "Tabatas", value: tabatas, set: setTabatas},
    ];
    
    const changeValues = {
        Prepare: (val) => {return(val + ((work + rest) * cycles ) * tabatas)},
        Work: (val) =>{return(prepare + ((val + rest) * cycles ) * tabatas)},
        Rest: (val) =>{return(prepare + ((val + work) * cycles ) * tabatas)},
        Cycles: (val) => {return(prepare + ((work + rest) * val ) * tabatas)},
        Tabatas: (val) => {return(prepare + ((work + rest) * cycles ) * val)}
    };

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
    };

    function renderTimer(){
        let m = Math.floor(totalSeconds/60)
        let s = totalSeconds-(60*m)
        m = m >= 10 ? m : `0${m}`
        s = s >= 10 ? s : `0${s}`
        return <h2>{m} : {s}</h2>
    };

    function handleOnClick(name, val, set){
        set(val)
        setTotalSeconds(changeValues[name](val))
    };
    
    function toggle(){
        setActive(!active)
    };

    return(
        <div>
            <h2>Tabata</h2>
            { renderTimer()}
            {userInputs.map((prop, i)=>{
                return (
                    <div key={i}>
                        <span> 
                        <button disabled={active} onClick={()=>handleOnClick(prop.name, prop.value+1, prop.set)}>+</button>
                        <button disabled={active} onClick={()=>handleOnClick(prop.name, prop.value-1, prop.set)}>-</button>
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