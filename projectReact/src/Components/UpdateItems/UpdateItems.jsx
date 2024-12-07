import { createPortal } from "react-dom";
import { handlerUpdateItem } from "../../utils/handleUpdate";
import './updateItems.css';
import { useState } from "react";

function UpdateItems({
    id,
    setIsOpenModal,
    setName,
    setColor,
    setStock,
    setWeight,
    setPrice,
    setVendor,
    setCategory,
    setIdMaterial
}) {
    const [ deductPrice, setDeductPrice ] = useState(0);
    const [ deductStock, setDeductStock ] = useState(0);
    const [ deductWeight, setDeductWeight ] = useState(0);
        
    console.log(id);

    function handlerClick(e) {
    e.preventDefault();
    const objBody = {
        peso_insumo: deductPrice,
        cantidad_insumo: deductStock,
        precio_insumo: deductWeight
    }

    console.log(objBody);
    if(objBody.peso_insumo === 0 && objBody.cantidad_insumo === 0 && objBody.precio_insumo === 0) {
        setIsOpenModal(false);
        return;
    }
        handlerUpdateItem(id, objBody);
        setIsOpenModal(false);
        setName("");
        setColor("");
        setStock("");
        setWeight("");
        setPrice("");
        setVendor("");
        setCategory("");
        setIdMaterial(null);
    }
    
    return createPortal(
        <section className="container-portal">
            <form>
                <h1>Actualiza Cantidades</h1>
                <p>Aqui actualiza la cantidad del stock, peso y precio para un insumos en especifico.</p>
                <div>
                    <label>Stock</label>
                    <input 
                        type="text"
                        value={deductStock}
                        onChange={(e) => setDeductStock(Number(e.target.value))}
                    />
                    <label>Peso Kg</label>
                    <input
                        type="text"
                        value={deductPrice}
                        onChange={(e) => setDeductPrice(Number(e.target.value))}
                        />
                    <label>Precio</label>
                    <input
                        type="text"
                        value={deductWeight}
                        onChange={(e) => setDeductWeight(Number(e.target.value))}
                        />
                </div>
                <button
                    className="btn-submit"
                    onClick={handlerClick}
                    >Descontar
                </button>
            </form>

        </section>,
        document.body
    )
}

export { UpdateItems };