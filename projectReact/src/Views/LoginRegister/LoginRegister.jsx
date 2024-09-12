import { useState } from "react";
import { Formulario } from "../../Components/Login/Formulario"; 

const LoginRegister = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="LoginRegister">
      <Formulario setUser={setUser} isLogin={isLogin} />
    </div>
  );
};

export default LoginRegister; 




