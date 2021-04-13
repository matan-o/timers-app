function timerLogic() {
    console.log(currentCycle, timerState)

    if (active) {
      setTotalSeconds(totalSeconds - 1);
    
      if(totalSeconds > postPrepare){
        setTimerState("prepare")
      }
      if(totalSeconds <= postPrepare){
        currentCycle - 1 === 0 ? setCurrentCycle(work+rest) : setCurrentCycle(currentCycle-1)
        if(currentCycle > rest){
          setTimerState("work")
        }else{
          setTimerState("rest")

        } 
 
      }
      
    }
  }