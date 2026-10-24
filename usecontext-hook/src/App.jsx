import { createContext, useState } from "react"
import ChildA from "./components/ChildA"

const UserContext = createContext()

function App() {
  const [user, setUser] = useState({ name: "Jee" })

  return (
    <div>
      Hello Jee
      <UserContext.Provider value={{ user, setUser }}>
        <ChildA />
      </UserContext.Provider>
    </div>
  )
}

export default App
export { UserContext }
