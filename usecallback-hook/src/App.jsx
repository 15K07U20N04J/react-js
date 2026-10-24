import { useState, useCallback } from 'react'
import ChildComponent from './components/ChildComponent'
import ExpensiveTask from './components/ExpensiveTask'

function App() {
  const [count, setCount] = useState(0)

  const handleIncrement = useCallback(
    () => {
      setCount(count + 1)
    }, [count]
  ) 

  return (
    <div>
      {/* <div>
        Count is: {count}
      </div>
      <br />
      <button onClick={handleIncrement}>
        Increment
      </button>

      <div>
        <ChildComponent buttonName="Click Me" handleClick={handleIncrement} />
      </div> */}
      <ExpensiveTask />
    </div>
  )
}

export default App
