import { useEffect, useState } from "react";
import { ApiSupplier } from "../services/apiSupplier";

const suppliesService = new ApiSupplier();

function useSuppliers() {
    const [ suppliers, setSuppliers ] = useState([]);
    const [ search, setSearch ] = useState('');

    const suppliesPromise = async () => {
        const res = await suppliesService.getSupplier();
        const data = await res.json();
        setSuppliers(data);
    };

    const filteredSuppliers = () => {
        return suppliers.filter(supplier => {
            const matchSearch = search ? supplier.nombre_proveedor.toLowerCase().includes(search.toLowerCase()) : true;
            console.log(matchSearch);
            return matchSearch;
        })
    };

    useEffect(() => {
        suppliesPromise();
    }, []);

    return {
        suppliers,
        setSuppliers,
        search,
        setSearch,
        filteredSuppliers
    }
}

export { useSuppliers };