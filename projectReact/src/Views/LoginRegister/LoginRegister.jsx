import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../Components/Login/Login"; 
import { Registro } from "../../Components/Registro/Registro";

const LoginRegister = ({ user, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!Object.values(user).every(value => value === '' || value === null || value === undefined)) {
      navigate('/home')
    }
  }, [user, navigate])

  console.log(Object.values(user).every(value => value === '' || value === null || value === undefined));

   return (
     <div className="LoginRegister">
      {
        !isRegister
        ? <Login setUser={setUser} isLogin={isLogin} setIsRegister={setIsRegister} user={user}/>
        : <Registro/>
      }
    </div>
  );

};

export default LoginRegister; 




