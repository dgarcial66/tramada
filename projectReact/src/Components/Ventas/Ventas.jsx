import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import Axios from "axios";

export function Ventas ({setUser, user}){
    const [id, setId] = useState("");
    const [fecha, setFecha] = useState("");
    const [estado, setEstado] = useState("");
    const [tipoV, setTipoV] = useState("");
    const [totalV, setTotalV] = useState("");
    const [comentarios, setComentarios] = useState("");
    const [client, setClient] = useState("");
    const [ventalist, setVentalist] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if(Object.values(user).every(value => value === '' || value === null || value === undefined)) {
          navigate('/')
        }
      }, [user, navigate])


    return(
        <>
        <Header setUser={setUser} />
        <button className="button-back" onClick={() => navigate("/home")} />

        <div className="container">
       
         
       <div className="card text-center">
         <div className="card-header">
           GESTION VENTAS
         </div>
         <div className="card-body">
           <div className="input-group mb-3">
               <span className="input-group-text" id="basic-addon1">Fecha venta </span>
               <input type="datetime-local" value={fecha}
                        onChange={(event)=>{
                        setFecha(event.target.value)
                        }}  className="form-control"  placeholder="Fecha venta" aria-label="Username" aria-describedby="basic-addon1"/>
             </div>
             <div className="input-group mb-3">
               <span className="input-group-text" id="basic-addon1">Estado de pago </span>
               <input type="text" value={estado}
                        onChange={(event)=>{
                        setEstado(event.target.value)
                        }}   className="form-control" placeholder="Estado de pago" aria-label="Username" aria-describedby="basic-addon1"/>
             </div>
             <div className="input-group mb-3">
               <span className="input-group-text" id="basic-addon1">Tipo de venta </span>
               <input type="text" value={tipoV}
                        onChange={(event)=>{
                        setTipoV(event.target.value)
                        }}  className="form-control" placeholder="Tipo de venta" aria-label="Username" aria-describedby="basic-addon1"/>
             </div>
             <div className="input-group mb-3">
               <span className="input-group-text" id="basic-addon1">Total venta </span>
               <input type="number" value={totalV}
                        onChange={(event)=>{
                        setTotalV(event.target.value)
                        }}  className="form-control" placeholder="Total venta" aria-label="Username" aria-describedby="basic-addon1"/>
             </div>
             <div className="input-group mb-3">
               <span className="input-group-text" id="basic-addon1">Comentarios</span>
               <input type="text" value={comentarios}
                        onChange={(event)=>{
                        setComentarios(event.target.value)
                        }}  className="form-control" placeholder="Comentarios" aria-label="Username" aria-describedby="basic-addon1"/>
             </div>   
             <div className="input-group mb-3">
               <span className="input-group-text" id="basic-addon1">Codigo cliente</span>
               <input type="number" value={client}
                        onChange={(event)=>{
                        setClient(event.target.value)
                        }}  className="form-control" placeholder="Codigo cliente" aria-label="Username" aria-describedby="basic-addon1"/>
             </div>      
         </div>
         <div className="card-footer text-body-secondary">
            <button  className="btn btn-success">Registrar</button>
         </div>
   </div>  
   </div>

        </>
    )
}