import { useState, useEffect } from "react";
import { ApiRawMaterials } from "../services/apiRawMaterials.js";
import { ApiSupplier } from "../services/apiSupplier.js";
import { CategoriesService } from "../services/categoriesService.js";

const rawMaterialService = new ApiRawMaterials();
const suppliesService = new ApiSupplier();
const categoriesRaw = new CategoriesService();

function useMaterials() {
    const [ search, setSearch ] = useState("");
    const [ materials, setMaterials ] = useState([]);
    const [ nameSupplier, setNameSupplier ] = useState('');
    const [ supplies, setSupplies ] = useState([]);
    const [ categories, setCategories ] = useState([]);

    const listMaterials =  async () => {
      
        const res = await rawMaterialService.getMaterials();
        const data = await res.json();
        setMaterials(data)  
    }
    const suppliesPromise = async () => {
        const res = await suppliesService.getSupplier();
        const data = await res.json();
        console.log(data);
        setSupplies(data);
    };
    const listCategoriesRaw = async () => {
        const res = await categoriesRaw.getCategoryRaw();
        const data = await res.json();
        console.log(data);
        setCategories(data);
    }
    
    useEffect(() => {

        listMaterials();
        suppliesPromise(); 
        listCategoriesRaw();

    }, []);

    const filteredMaterials = () => {
        return materials.filter((material) => {    
            const matchSearch = search ? material.nombre_insumo.toLowerCase().includes(search.toLowerCase()) : true;
            const matchId = nameSupplier.length > 0 ? material.proveedor === nameSupplier : true;
            return matchSearch && matchId
        });
    };

return {
    search,
    setSearch,
    materials,
    setMaterials,
    nameSupplier,
    setNameSupplier,
    supplies,
    categories,
    filteredMaterials
}

}

export { useMaterials };