import { useEffect, useState } from "react";
import { ApiSupplier } from "../services/apiSupplier";
import { deleted } from "../actions/suppliers";

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

    const supplierCreate = async (body) => {
        try {
            const res = await suppliesService.createSupplier(body);
            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const supplierUpdate = async (body, id) => {
        try {
            const res = await suppliesService.updateSupplier(body, id);
            return res;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const supplierDelete = async (id) => {
        try {
            const res = await deleted(id);
            console.log("SOY DE HOOK SUPPLIERS: ", res);
            return res;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    const formatInputs = ({
        setName,
        setPhone,
        setAddress,
        setEmail,
        setId,
        setEditIndex
    }) => {
        setName("");
        setPhone("");
        setAddress("");
        setEmail("");
        setId(null);
        setEditIndex(null);
    }

    useEffect(() => {
        suppliesPromise();
    }, []);

    return {
        suppliers,
        setSuppliers,
        search,
        setSearch,
        filteredSuppliers,
        supplierCreate,
        supplierUpdate,
        supplierDelete,
        formatInputs
    }
}

export { useSuppliers };