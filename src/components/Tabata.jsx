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

    const userInput = [
        {name: "Prepare", value: prepare, set: setPrepare},
        {name: "Work", value: work, set: setWork},
        {name: "Rest", value: rest, set: setReset},
        {name: "Cycles", value: cycles, set: setCycles},
        {name: "Tabatas", value: tabatas, set: setTabatas},
    ]

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

    function setValues(set, val, operator){
        set(eval(`${val}${operator}1`))
        switch(set){
            case setPrepare:
                setTotalSeconds(eval(`${totalSeconds}${operator}1`))
                break;
            case setWork:
                setTotalSeconds(eval(`${prepare}+(((${val}${operator}1+${rest})*${cycles}))*${tabatas}`))
                break;
            case setReset:
                setTotalSeconds(eval(`${prepare}+(((${val}${operator}1+${work})*${cycles}))*${tabatas}`))
                break;
            case setCycles:
                setTotalSeconds(eval(`${prepare}+(((${rest}+${work})*(${val}${operator}1)))*${tabatas}`))
                break;
            case setTabatas:
                setTotalSeconds(eval(`${prepare}+(((${rest}+${work})*(${val}${operator}1)))*${cycles}`))
                break;
                

        }
    }
    
    return(
        <div>
            <h2>Tabata</h2>
            { renderTimer()}
            {userInput.map((prop, i)=>{
                return (
                    <div key={i}>
                        <span> 
                        <button disabled={active} onClick={()=>setValues(prop.set, prop.value,'+')}>+</button>
                        <button disabled={active} onClick={()=>setValues(prop.set, prop.value,'-')}>-</button>
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