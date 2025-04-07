import { createPortal } from "react-dom";
import { handlerUpdateItem } from "../../utils/handleUpdate";
import { useState } from "react";
import './updateItems.css';

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
    const [deductPrice, setDeductPrice] = useState(0);
    const [deductStock, setDeductStock] = useState(0);
    const [deductWeight, setDeductWeight] = useState(0);

    console.log(id);

    function handlerClick(e) {
        e.preventDefault();
        const objBody = {
            peso_insumo: deductPrice,
            cantidad_insumo: deductStock,
            precio_insumo: deductWeight
        };

        console.log(objBody);
        if (objBody.peso_insumo === 0 && objBody.cantidad_insumo === 0 && objBody.precio_insumo === 0) {
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
                <p>Aquí actualiza la cantidad del stock, peso y precio para un insumo específico.</p>
                <div className="input-group">
                    <span className="input-label" id="basic-addon1">Stock</span>
                    <input
                        type="text"
                        className="input-field"
                        value={deductStock}
                        onChange={(e) => setDeductStock(Number(e.target.value))}
                        placeholder="Stock disponible"
                        aria-label="Stock"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <div className="input-group">
                    <span className="input-label" id="basic-addon1">Peso (Kg)</span>
                    <input
                        type="text"
                        className="input-field"
                        value={deductPrice}
                        onChange={(e) => setDeductPrice(Number(e.target.value))}
                        placeholder="Peso del insumo"
                        aria-label="Peso"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <div className="input-group">
                    <span className="input-label" id="basic-addon1">Precio</span>
                    <input
                        type="text"
                        className="input-field"
                        value={deductWeight}
                        onChange={(e) => setDeductWeight(Number(e.target.value))}
                        placeholder="Precio unitario"
                        aria-label="Precio"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <button
                    className="btn btn-cancel"
                    onClick={handlerClick}
                >
                    Descontar
                </button>
            </form>
        </section>,
        document.body
    );

}

export { UpdateItems };
