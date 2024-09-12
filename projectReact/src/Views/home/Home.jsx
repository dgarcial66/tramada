export function Home ({ user, setUser }) {

  const handlelogout = () =>{
    setUser([])
  }
    return(
      <div>
        <h1>bienvenido</h1>
        <h2>{user}</h2>
        <button onClick={handlelogout}>cerrar sesion</button>
      </div>  
    )
}