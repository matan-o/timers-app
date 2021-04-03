import { useEffect, useState } from "react";

function Tabata(){

    const [prepare, setPrepare] = useState(10)
    const [work, setWork ] = useState(20)
    const [rest, setRest] = useState(10)
    const [cycles, setCycles] = useState(8)
    const [tabatas, setTabatas] = useState(1)

    const userInput = [
        {name: "Prepare", value: prepare, set: setPrepare},
        {name: "Work", value: work, set: setWork},
        {name: "Rest", value: rest, set: setRest},
        {name: "Cycles", value: cycles, set: setCycles},
        {name: "Tabatas", value: tabatas, set: setTabatas},
    ]

  
    

    return(
        <div>
            <h2>Tabata</h2>
            {userInput.map(prop=>{
                return (
                    <div>
                        <span> 
                        <button onClick={()=>prop.set(prop.value +1)}>+</button>
                        <button onClick={()=>prop.value != 0 ? prop.set(prop.value -1) : null}>-</button>
                        {prop.name} : {prop.value}
                        </span>
                    </div>
                )
            })
                
            }
        </div>
        
    )

};

export default Tabata;