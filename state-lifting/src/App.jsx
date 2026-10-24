import { useState } from 'react'
import Card from './components/Card'

function App() {
  const [name, setName] = useState('')
  return (
    <div>
      <h1>Value in parent : {name}</h1>
      <Card name={name} setName={setName} />
      <Card name={name} setName={setName} />
    </div>
  )
}

export default App
