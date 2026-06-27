import UserCard from "./components/UserCard"
import './App.css'

function App() {
  return (
    <div className="user-cards">
      <UserCard name="John Doe" desc="Developer"/>
      <UserCard name="Jane Smith" desc="Designer"/>
      <UserCard name="Bob Johnson" desc="Manager"/>
    </div>
  )
}

export default App
