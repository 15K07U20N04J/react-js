import { useState } from 'react'
import LogoutBtn from './components/LogoutBtn'
import LoginBtn from './components/LoginBtn'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div>
      {/* {isLoggedIn ? <LogoutBtn onClick={() => setIsLoggedIn(false)}/> : <LoginBtn onClick={() => setIsLoggedIn(true)}/>} */}

      {/* if(isLoggedIn){
        <LogoutBtn onClick={() => setIsLoggedIn(false)}/>
      } else {
        <LoginBtn onClick={() => setIsLoggedIn(true)}/>
      } */}

      {isLoggedIn && <LogoutBtn onClick={() => setIsLoggedIn(false)}/>}
      {!isLoggedIn && <LoginBtn onClick={() => setIsLoggedIn(true)}/>}
      
    </div>
  )
}

export default App
