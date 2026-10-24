import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  let val = 1;

  // value persisit across renders, useRef is used to store a mutable value that does not cause a re-render when updated. It can be useful for keeping track of values that need to persist across renders without triggering a re-render. 
  let useRefVal = useRef(1);

  const btnRef = useRef();

  const handleClick = () => {
    setCount(count + 1)
    val = val +1;
    useRefVal.current = useRefVal.current + 1;
    console.log(val);
    console.log(useRefVal.current);
  }

  useEffect(() => {
    console.log('I render every time')
  })

  const ChangeColor = () => {
    btnRef.current.style.backgroundColor = 'red';
  }

  const [time, setTime] = useState(0);
  let timerRef = useRef(null);
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTime(time => time + 1);
    }, 1000);
  }

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  }

  return (
    <div>

      <h1>Stop Watch : {time} seconds</h1>
      <button onClick={startTimer}>Start</button> <br/> <br />
      <button onClick={stopTimer}>Stop</button> <br /> <br />
      <button onClick={resetTimer}>Reset</button>


      {/* <button ref={btnRef} onClick={handleClick}>count is: {count}</button>
      <p>val is: {val}</p>
      <p>useRefVal is: {useRefVal.current}</p>

      <button onClick={ChangeColor}>Change Color of 1 at </button> */}
    </div>
  )
}

export default App
