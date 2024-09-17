import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {Menu} from '../../Components/Menu/Menu.jsx'
export function Home ({ user, setUser, ClickProducts, setClickProducts}) {
  const navigate = useNavigate()

  useEffect(() => {
    if(Object.values(user).every(value => value === '' || value === null || value === undefined)) {
      navigate('/')
    }
  }, [])

  return(
    <>
      <Menu setUser={setUser}/>
    </>
  )
}