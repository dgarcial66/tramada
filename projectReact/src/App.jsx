import { useState } from 'react'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { Home } from './Views/Home/Home.jsx'
import LoginRegister from './Views/LoginRegister/LoginRegister';
import { Products } from './Components/Products/Products.jsx'
import { ListClients } from './Components/ListClients/ListClients.jsx';
import { RawMaterials } from './Components/RawMaterials/RawMaterials.jsx';
import { OrdenProduccion } from './Components/OrdenProduccion/OrdenProduccion.jsx';
import { Config } from './Components/Configuration/Config.jsx';
import { Suppliers } from './Components/suppliers/Suppliers.jsx';
import { InventoryMovements } from './Components/InventoryMovements/InventoryMovements.jsx';
import { Ventas } from './Components/Ventas/Ventas.jsx';
import { Historicalprices } from './Components/historicalPrice/Historicalprices.jsx';


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
      { path: '/products', element: <Products user={user} setUser={setUser}/> },
      { path: '/clients', element: <ListClients user={user} setUser={setUser} />},
      { path: '/rawMaterials', element: <RawMaterials user={user} setUser={setUser} />},
      { path: '/OrdenProduccion', element: <OrdenProduccion user={user} setUser={setUser}/> },
      { path: '/Config', element: <Config user={user} setUser={setUser}/>},
      { path: '/suppliers', element: <Suppliers user={user} setUser={setUser} /> },
      { path: '/Inventory', element: <InventoryMovements user={user} setUser={setUser} />},
      { path: '/Ventas', element: <Ventas user={user} setUser={setUser} />},
      { path: '/historical-prices', element: <Historicalprices user={user} setUser={setUser} /> },
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

