import Button from "./components/Button"
import Card from "./components/Card"
import { useState } from "react"


function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>

      <h1>Count: {count}</h1>
      <Button handleClick={handleClick} text="Increment Count" />

      <Card name="John Doe">
        <h1>Welcome to React</h1>
        <p>This is a simple example of using props as children in React.</p>
      </Card>

      <Card name="John Smith">
        <p>Hello, John!</p>
      </Card>
    </div>
  )
}

export default App
