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
      console.log(user);

    const handleSubmit = (e) => {
    e.preventDefault();
    const newClients = { name, address, numberPhone, co };

    if (editIndex !== null) {
        const updatedClients = [...clients];
        updatedClients[editIndex] = newClients;
        setClients(updatedClients);
        setEditIndex(null);
        console.log('Áqui 1: ', updatedClients[editIndex]);
    } else {
        
        setClients([...clients, newClients]);
        console.log('Áqui 2');
    }
    setName("");
    setAddress("");
    setNumberPhone("");
    setCo('');
    console.log('Áqui 3');
    };

    const filteredClients = clients.filter((client) => client.name.toLowerCase().includes(search.toLowerCase()));
    console.log(filteredClients);
    return(
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
            textButton={'Cliente'}
            handleIsListClient={true}
            isListClient={isListClient}
            address={address}
            numberPhone={numberPhone}
            co={co}
            setAddress={setAddress}
            setNumberPhone={setNumberPhone}
            setCo={setCo}
            user={user}
            setUser={setUser}
            clients={clients}
            setClients={setClients}
            filteredClients={filteredClients}
        />
    );
}