import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormRegister } from "../FormRegister/FormRegister";
import { handleEdit } from "../../utils/utils";
import { handleDelete } from "../../utils/utils.js"

export function ListClients({ user, setUser}) {
    const [clients, setClients] = useState([]); 
    const [name, setName] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [search, setSearch] = useState("");
    const [numberPhone, setNumberPhone] = useState(""); 
    const [co, setCo] = useState(""); 
    const [editIndex, setEditIndex] = useState(null);
    const [ isListClient, setIsListClient ] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        if(Object.values(user).every(value => value === '' || value === null || value === undefined)) {
          navigate('/')
        }
    }, [user, navigate])
    
    const handleSubmit = (e) => { 
        e.preventDefault();
    const newClients = { name, address, numberPhone, co };

    if (editIndex !== null) {
        const updatedClients = [...clients];
        updatedClients[editIndex] = newClients;
        setClients(updatedClients);
        setEditIndex(null);
    } else {
        setClients([...clients, newClients]);
    }
    setName("");
    setAddress("");
    setNumberPhone("");
    setCo('');
    };

    const filteredClients = clients.filter((client) => client.name.toLowerCase().includes(search.toLowerCase()));
    console.log(filteredClients);
    return(
        <FormRegister 
            handleSubmit={handleSubmit} 
            name={name} // linea para quitar al realizar restructuracion.
            editIndex={editIndex} // linea para quitar al realizar restructuracion.
            search={search} // linea para quitar al realizar restructuracion.
            setName={setName}
            setEditIndex={setEditIndex}
            setSearch={setSearch}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            textButton={'Cliente'}
            handleIsListClient={true}
            isListClient={isListClient} // linea para quitar al realizar restructuracion.
            address={address} // linea para quitar al realizar restructuracion.
            numberPhone={numberPhone} // linea para quitar al realizar restructuracion.
            co={co} // linea para quitar al realizar restructuracion.
            setAddress={setAddress}
            setNumberPhone={setNumberPhone}
            setCo={setCo}
            user={user}
            setUser={setUser}
            clients={clients}// linea para quitar al realizar restructuracion.
            setClients={setClients}
            setIsListClient={setIsListClient}
            filteredClients={filteredClients}
        />
    );
}