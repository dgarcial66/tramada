import { useState } from 'react'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { Home } from './Views/home/Home.jsx'
import LoginRegister from './Views/LoginRegister/LoginRegister';
import { Products } from './Components/Products/Products.jsx'
import { ListClients } from './Components/ListClients/ListClients.jsx';

//ClickProducts={ClickProducts} setClickProducts={setClickProducts}

function App() {

  const [user, setUser] = useState({
    name: '',
    password: '',
  })
  console.log(user);

  const AppRouter = () => {
    const routes = useRoutes([
      { path: '/', element: <LoginRegister setUser={setUser} user={user} />},
      { path: '/home', element: <Home user={user} setUser={setUser} /> },
      { path: '/products', element: <Products /> },
      { path: 'clients', element: <ListClients />}
    ])
    return routes;
  }


  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App

