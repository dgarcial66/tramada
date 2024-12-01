import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import Axios from "axios";

export function InventoryMovements ({user, setUser}){
    const [id, setId] = useState("");
    const [tipomovimiento, setTipomovimiento] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [fechamovimiento, setFechamovimiento] = useState("");
    const [motivo, setMotivo] = useState("");
    const [insumo, setInsumo] = useState("");
    const [prodcuto, setProducto] = useState("");
    const [inventoryList, setInventoryList] = useState([]);

    const navigate = useNavigate()

    const getInventory = () =>{
        Axios.get("http://localhost:3000/api/v1/inventory"). then((response) =>{
          setInventoryList(response.data);
        })
      }  

    useEffect(() => {
        if(Object.values(user).every(value => value === '' || value === null || value === undefined)) {
          navigate('/')
        }else{
            getInventory();
        }
    }, [user, navigate])

    return (

        <>
            <Header user={user} setUser={setUser} />
            <button className="button-back" onClick={() => navigate("/home")} />
            <div>
                <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tipo de Movimiento</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Fecha de movimiento</th>
            <th scope="col">Motivo</th>
            <th scope="col">Insumos</th>
            <th scope="col">Producto</th>
          </tr>
        </thead>
        <tbody>
        {
            inventoryList.map((val, key)=>{
                return  <tr key={val.id}>
                    <th>{val.id}</th>
                    <td>{val.tipo_movimiento}</td>
                    <td>{val.cantidad}</td>
                    <td>{val.fecha_movimiento}</td>
                    <td>{val.motivo}</td>
                    <td>{val.insumos_id}</td>
                    <td>{val.producto_id}</td>
                </tr> 
            })
        }
        </tbody>
        </table> 
        </div>
        </>
    
    )

}

