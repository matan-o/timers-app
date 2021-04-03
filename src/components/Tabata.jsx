import { useEffect, useState } from "react";

function Tabata(){

    const [prepare, setPrepare] = useState(10)
    const [work, setWork ] = useState(20)
    const [rest, setReset] = useState(10)
    const [cycles, setCycles] = useState(8)
    const [tabatas, setTabatas] = useState(1)

    const [active, setActive] = useState(false)
    const [onWork, setOnWork] = useState(false)
    const [onRest, setOnRest] = useState(false)
    const [seconds, setSeconds] = useState()

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
                console.log("1")
            }, 1000);
        return ()=>{!timeout || clearTimeout(timeout)} 
        }
    },[active]);

    function toggle(){
        setActive(!active)
    };



  
    

    return(
        <div>
            <h2>Tabata</h2>
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
            <button onClick={toggle}>{active ? 'pause':'run'}</button>
        </div>
        
    )

};

export default Tabata;