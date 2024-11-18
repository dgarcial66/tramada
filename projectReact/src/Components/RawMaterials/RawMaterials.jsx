import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormRegister } from "../FormRegister/FormRegister.jsx"
import { ApiRawMaterials } from "../../services/apiRawMaterials.js";
import { handleDelete, handleEdit } from "../../utils/utils.js"

const api = new ApiRawMaterials()

export function RawMaterials({ user, setUser}) {
    const [ name, setName ] = useState("")
    const [ typeMaterial, setTypeMaterial] = useState("")
    const [ color, setColor ] = useState("")
    const [ stock, setStock ] = useState("")
    const [ weight, setWeight ] = useState("")
    const [ search, setSearch ] = useState("")
    const [ materials, setMaterials ] = useState([])
    const [ editIndex, setEditIndex ]  = useState(null)
    const [ isListMaterials, setisListMaterials ] = useState(true)
    const navigate = useNavigate()

    let filteredMaterials = [];

    const listMaterials =  async () => {
        // const filteredMaterials = materials.filter((material) => material.name.toLowerCase().includes(search.toLowerCase()));
        const res = await api.getMaterials();
        setMaterials(res)  
        console.log(materials);
    }

    useEffect(() => {
        if(Object.values(user).every(value => value === '' || value === null || value === undefined)) {
            navigate('/')
        }

        listMaterials();
      }, [user, navigate])

      const handleSubmit = (e) => {
        e.preventDefault();
        const newMaterials = { 
            name,
            typeMaterial,
            color,
            stock,
            weight
        };
    
        if (editIndex !== null) {
            const updatedClients = [...materials];
            updatedClients[editIndex] = newMaterials;
            setMaterials(updatedClients);
            setEditIndex(null);
            console.log('Áqui 1: ', updatedClients[editIndex]);
        } else {
            
            setMaterials([...materials, newMaterials]);
            console.log('Áqui 2');
        }
        setName("");
        setTypeMaterial('')
        setColor('');
        setStock("");
        setWeight("");
        console.log('Áqui 3');
        };

        filteredMaterials = materials;

    return(
        <>
            <FormRegister 
                handleSubmit={handleSubmit} 
                name={name} 
                editIndex={editIndex} 
                search={search} 
                setName={setName}
                setEditIndex={setEditIndex}
                setSearch={setSearch}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                textButton={'Material'}
                user={user}
                setUser={setUser}
                setIsListClient={false}
                isListMaterials={isListMaterials}
                typeMaterial={typeMaterial}
                setTypeMaterial={setTypeMaterial}
                color={color}
                setColor={setColor}
                stock={stock}
                setStock={setStock}
                weight={weight}
                setWeight={setWeight}
                filteredMaterials={filteredMaterials}
                materials={materials}
                setMaterials={setMaterials}
            />
        </>
    )
}