import { useState, useMemo } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState();

  const expensiveComputation = (num) => {
    console.log('Performing expensive computation...');
    for (let i = 0; i < 1000000000; i++) { };
    return num * 2;
  }

  // let doubleValue = expensiveComputation(inputValue);

  const doubleValue = useMemo(() => expensiveComputation(inputValue), [inputValue]);

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>count is: {count}</button>
      <input type="number" onChange={(e) => setInputValue(e.target.value)} />
      <p>Computed Value: {doubleValue}</p>
    </div>
  )
}

export default App
