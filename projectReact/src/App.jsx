import { Home } from './Views/home/Home.jsx'
import { useState } from 'react'
import LoginRegister from './Views/LoginRegister/LoginRegister';


function App() {

  const [user, setUser] = useState([])


  return (
    <div className="App">
      {
    !user.length > 0
    ? <LoginRegister setUser={setUser} />
    :<Home user={user} setUser={setUser} /> 
      }   
    </div>
  )
}

export default App

