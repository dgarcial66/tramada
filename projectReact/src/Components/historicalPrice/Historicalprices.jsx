import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import Axios from "axios";
import { Dropdown, Button } from 'react-bootstrap';
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportHistorial from "../../../asset/Reports/reportsHistorial/ReportHistorial.jsx";
import "./historicalprices.css";

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
            <section className="container-father-services">
                <Header user={user} setUser={setUser} />
                <img className="back" src="https://img.icons8.com/?size=100&id=26194&format=png&color=000000" onClick={() => navigate("/home")} />
                <div className="container">
                    <div className="tables-father">
                        <Dropdown className="mb-3">
                            <Dropdown.Toggle variant="btn btn-register" id="filterDropdown">
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
                                <Button variant="btn btn-edit" disabled={loading}>
                                    {loading ? "Generando..." : "Descargar Informe"}
                                </Button>
                            )}
                        </PDFDownloadLink>





                        {filter === 'all' || filter === 'materials' ? (
                            <div>
                                <h1 style={{color:'white'}}>Historial de Precios de Insumos</h1>
                                <table className="table">
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
                                <h1 style={{color:'white'}}>Historial de Precios de Productos</h1>
                                <table className="table">
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


                        <br />
                        <br />

                    </div>


                </div>

            </section>


        </>
    );
}



