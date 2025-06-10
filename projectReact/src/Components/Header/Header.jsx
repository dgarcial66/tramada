import { useNavigate } from "react-router-dom";
import { ApiFetch } from "../../services/api";
import './header.css'

export const Header = ({user, setUser }) => {

  const apiFetch = new ApiFetch();

  const navigate = useNavigate();

  const handlelogout = async () => {
    await apiFetch.logOut();
    setUser({
      email: '',
      roles: ''
    })

    navigate('/');
  }

  return (
    <header className="iconos-menu">
      <section className="logo-menu">
        <figure>
          <img src="../../../asset/iconoemp.png" alt="" />
        </figure>
      </section>
      <section className="perfil-menu">
          {user?.email && <span> {user.email}</span>}
        <button
          onClick={() => handlelogout()}
        >Cerrar sesión</button>
        <img src="https://i.pinimg.com/564x/e8/7a/b0/e87ab0a15b2b65662020e614f7e05ef1.jpg" alt="" />

      </section>
    </header>
  )
}