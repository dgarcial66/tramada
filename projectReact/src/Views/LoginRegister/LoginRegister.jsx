import { useState } from "react";
import { Formulario } from "../../Components/Login/Formulario"; 
import { Registro } from "../../Components/Registro/Registro";

const LoginRegister = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  

  return (
    <div className="LoginRegister">
      {
        !isRegister
        ? <Formulario setUser={setUser} isLogin={isLogin} setIsRegister={setIsRegister} />
        : <Registro/>
      }
    </div>
  );
};

export default LoginRegister; 




