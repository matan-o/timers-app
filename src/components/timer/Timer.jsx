import { useState, useEffect } from "react";

function Timer(){

    const [isRunning, setIsRunning] = useState(false)
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    const [cent, setCent] = useState(0)


    useEffect(()=>{
        let timeout = null
        if(isRunning) {
            timeout = setTimeout(() => {
                timerLogic()
            }, 10) 

            return ()=>{!timeout || clearTimeout(timeout)}
        }
    }, [isRunning, second, minute, cent]);


    function timerLogic(){
        let c = cent;
        let s = second;
        let m = minute;
        c++;

        if(c === 100){
            c = 0;
            s++

            if(s === 60){
                s = 0;
                m++
                m = m === 60 ? 0 : m
            }
        }
        if(isRunning){
            setCent(c);
            setSecond(s);
            setMinute(m);
        }
    }

    function renderTime(){
        const m = minute >= 10 ? minute.toString() : `0${minute}`;
        const s = minute >= 10 ? second.toString() : `0${second}`;
        const c = cent >=10 ? cent.toString(): `0${cent}`;
        return <span>{m}:{s}:{c}</span>
    };

    function run(){
        setIsRunning(true);
    };

    function pause(){
        setIsRunning(false)
    }

    function reset(){
        setIsRunning(false)
        setCent(0);
        setSecond(0);
        setMinute(0);
    }
    

    return(
        <div className="timer">

          <div>{renderTime()}</div>

          <button onClick={reset}>Reset</button>

            {isRunning ?
                <button onClick={pause}>Pause</button>
                :
                <button onClick={run}>Run</button>
            }
        </div>
    )
}

export default Timer;