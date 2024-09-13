import {Menu} from '../../Components/Menu/Menu.jsx'
export function Home ({ user, setUser }) {

  const handlelogout = () =>{
    setUser([])
  }
    return(
      <>
      <Menu/>
      </>
    )
}