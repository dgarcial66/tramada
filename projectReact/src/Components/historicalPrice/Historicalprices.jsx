import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import Axios from "axios";
import { Dropdown, Button } from 'react-bootstrap'; 
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportHistorial from "../../../asset/Reports/reportsHistorial/ReportHistorial.jsx"; 

export function Historicalprices({ user, setUser }) {
    const [HistoricalPricesMaterialsList, setHistoricalPricesMaterialsList] = useState([]);
    const [historicalPricesList, setHistoricalPricesList] = useState([]);
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();


    const getHistoricalPricesMaterials = () => {
        Axios.get("http://localhost:3000/api/v1/historical-prices-materials")
            .then((response) => {
                setHistoricalPricesMaterialsList(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los precios de los insumos", error);
            });
    };


    const getHistoricalPrices = () => {
        Axios.get("http://localhost:3000/api/v1/historical-prices")
            .then((response) => {
                setHistoricalPricesList(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los precios de los productos", error);
            });
    };


    useEffect(() => {
        if (Object.values(user).every(value => value === '' || value === null || value === undefined)) {
            navigate('/');
        } else {
            getHistoricalPricesMaterials();
            getHistoricalPrices();
        }
    }, [user, navigate]);


    const filteredMaterials = filter === 'all' || filter === 'materials' ? HistoricalPricesMaterialsList : [];
    const filteredProducts = filter === 'all' || filter === 'products' ? historicalPricesList : [];

    return (
        <>
            <Header user={user} setUser={setUser} />
            <button className="button-back" onClick={() => navigate("/home")} />


            

            <div className="container mt-4">

            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="success" id="filterDropdown">
                    Filtrar
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFilter('all')}>Mostrar Todos</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter('materials')}>Historial de Precios de Insumos</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter('products')}>Historial de Precios de Productos</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <PDFDownloadLink 
                    document={<ReportHistorial HistoricalPricesMaterialsList={HistoricalPricesMaterialsList} historicalPricesList={historicalPricesList} filter={filter} />}
                    fileName="informe_historial_precios.pdf"
                >
                    {({ loading }) => (
                        <Button  variant="primary" disabled={loading}>
                            {loading ? "Generando..." : "Descargar Informe"}
                        </Button>
                    )}
                </PDFDownloadLink>

            
            


            {filter === 'all' || filter === 'materials' ? (
                <div >
                    <h2>Historial de Precios de Insumos</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Precio Insumo</th>
                                <th scope="col">Fecha Registrada</th>
                                <th scope="col">Insumos ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMaterials.length > 0 ? (
                                filteredMaterials.map((val) => (
                                    <tr key={val.id}>
                                        <td>{val.id}</td>
                                        <td>{val.precio_insumo}</td>
                                        <td>{new Date(val.fecha_historial).toLocaleDateString()}</td>
                                        <td>{val.insumos_id}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4">No hay datos disponibles</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : null}

            {filter === 'all' || filter === 'products' ? (
                <div>
                    <h2>Historial de Precios de Productos</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Precio Producto</th>
                                <th scope="col">Fecha Registrada</th>
                                <th scope="col">Producto ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((val) => (
                                    <tr key={val.id}>
                                        <td>{val.id}</td>
                                        <td>{val.precios_producto}</td>
                                        <td>{new Date(val.fecha_historial).toLocaleDateString()}</td>
                                        <td>{val.producto_id}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4">No hay datos disponibles</td></tr>
                            )}
                        </tbody>
                    </table>
                   
                </div>
                 ) : null}  
                 

                <br/>
                <br/>
            </div>
            
        </>
    );
}



