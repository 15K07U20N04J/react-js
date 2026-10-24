import { useState, useEffect } from 'react'


function App() {
  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)

  // first - mounted - run once (side - effect function)
  // second - unmounted - cleanup function
  // third - dependacy array (comma separated list of variables) - run when any of the variables in the array change

  const handleClick = () => {
    setCount(count + 1)
  }

  // various useEffect examples
  // variation 1 - run once when component is mounted (run on every render)
  // useEffect(() => { 
  //   alert('run on every render')
  // })

  // variation 2 - run once when component is mounted (run only on first render)
  // useEffect(() => { 
  //   alert('run only on first render')
  // },[])

  // variation 3 - run when count changes (run on first render and when count changes)
  // useEffect(() => { 
  //   alert('run on first render and when count changes')
  // },[count])

  // variation 4 -cleanup function - run when component is unmounted (run on first render and when count changes)
  // useEffect(() => { 
  //   alert('run on first render and when count changes')
  //   return () => {
  //     alert('cleanup function - run when component is unmounted')
  //   }
  // },[count])

  // variation 5 - multiple dependencies - run when count or total changes (run on first render and when count or total changes)
  useEffect(() => { 
    alert('run on first render and when count or total changes')
  },[count, total])


  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>
        Click me
      </button>
      <br />
      <p>Total: {total}</p>
      <button onClick={() => setTotal(total + 1)}>
        Increase Total
      </button>
    </div>
  )
}

export default App
