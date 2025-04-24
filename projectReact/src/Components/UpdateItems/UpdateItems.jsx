import { createPortal } from "react-dom";
import { handlerUpdateItem } from "../../utils/handleUpdate";
import { useState } from "react";
import Swal from "sweetalert2";
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
    setIdMaterial,
    onUpdate
}) {
    const [deductPrice, setDeductPrice] = useState(0);
    const [deductStock, setDeductStock] = useState(0);
    const [deductWeight, setDeductWeight] = useState(0);

    async function handlerClick(e) {
        e.preventDefault();

        const objBody = {
            peso_insumo: deductPrice,
            cantidad_insumo: deductStock,
            precio_insumo: deductWeight
        };

        if (
            objBody.peso_insumo === 0 &&
            objBody.cantidad_insumo === 0 &&
            objBody.precio_insumo === 0
        ) {
            setIsOpenModal(false);
            return;
        }

        const result = await Swal.fire({
            title: '¿Confirmar descuento?',
            text: 'Esta acción descontará cantidades del insumo.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, descontar',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'btn btn-cancel',
                cancelButton: 'btn btn-cancel'
            },
            buttonsStyling: false
        });

        if (!result.isConfirmed) return;

        try {
            await handlerUpdateItem(id, objBody);

            if (onUpdate) onUpdate(); 

            Swal.fire({
                icon: 'success',
                title: 'Descuento realizado correctamente',
                showConfirmButton: false,
                timer: 1500
            });

            setIsOpenModal(false);
            setName("");
            setColor("");
            setStock("");
            setWeight("");
            setPrice("");
            setVendor("");
            setCategory("");
            setIdMaterial(null);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al descontar',
                text: 'Verifica tu conexión o intenta más tarde.'
            });
        }
    }

    return createPortal(
        <section className="container-portal">
            <form>
                <h1>Actualiza Cantidades</h1>
                <p>Aquí actualiza la cantidad del stock, peso y precio para un insumo específico.</p>

                <div className="input-group">
                    <span className="input-label">Stock</span>
                    <input
                        type="number"
                        className="input-field"
                        value={deductStock}
                        onChange={(e) => setDeductStock(Number(e.target.value))}
                        placeholder="Stock disponible"
                    />
                </div>

                <div className="input-group">
                    <span className="input-label">Peso (Kg)</span>
                    <input
                        type="number"
                        className="input-field"
                        value={deductPrice}
                        onChange={(e) => setDeductPrice(Number(e.target.value))}
                        placeholder="Peso del insumo"
                    />
                </div>

                <div className="input-group">
                    <span className="input-label">Precio</span>
                    <input
                        type="number"
                        className="input-field"
                        value={deductWeight}
                        onChange={(e) => setDeductWeight(Number(e.target.value))}
                        placeholder="Precio unitario"
                    />
                </div>

                <div className="btn-group">
                    <button className="btn btn-cancel" onClick={handlerClick}>
                        Descontar
                    </button>
                    <button
                        type="button"
                        className="btn btn-cancel"
                        onClick={() => setIsOpenModal(false)}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </section>,
        document.body
    );
}

export { UpdateItems };