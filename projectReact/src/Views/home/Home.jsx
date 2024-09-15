import {Menu} from '../../Components/Menu/Menu.jsx'
import { MenuProductos } from '../MenuProductos/MenuProductos.jsx'
export function Home ({ user, setUser, ClickProducts, setClickProducts}) {

  const handlelogout = () =>{
    setUser([])
  }
    return(
      <>
      {
      setClickProducts
      ?<Productos ClickProducts={ClickProducts} setClickProducts={setClickProducts}/>
      :<Menu/>
      }
      </>
    )
}