import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import request from "../services/request";
import ModalConfirm from "../components/ModalConfirm";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import ubicacionService from "../services/ubicacionService";

const ListaLeyendas = () => {
    const [leyendas, setLeyendas] = useState([]);
    const [filters, setFilters] = useState({
        nombre: "",
        categoria: "",
        fecha: "",
        provincia_id: "",
        canton_id: "",
        distrito_id: ""
    });

    const [provincias, setProvincias] = useState([]);
    const [cantones, setCantones] = useState([]);
    const [distritos, setDistritos] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);


    useEffect(() => {
        ubicacionService.getProvincias().then((data) => setProvincias(data));
    }, []);


    useEffect(() => {
        if (filters.provincia_id) {
            ubicacionService.getCantones(filters.provincia_id).then((data) => setCantones(data));
        } else {
            setCantones([]);
            setDistritos([]);
        }
    }, [filters.provincia_id]);


    useEffect(() => {
        if (filters.canton_id) {
            ubicacionService.getDistritos(filters.canton_id).then((data) => setDistritos(data));
        } else {
            setDistritos([]);
        }
    }, [filters.canton_id]);



    const fetchLeyendas = useCallback(() => {

        const validFilters = Object.keys(filters).reduce((acc, key) => {
            if (filters[key] !== "") {
                acc[key] = filters[key];
            }
            return acc;
        }, {});

        request.get("leyendas/", validFilters).then((response) => {
            if (response.success) {
                setLeyendas(response.data);
            } else {
                alert("Error: " + response.message);
            }
        });
    }, [filters]);



    useEffect(() => {
        fetchLeyendas();
    }, [fetchLeyendas]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchLeyendas();
    };

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        request.delete(`leyendas/${selectedId}`).then((response) => {
            if (response.success) {
                setLeyendas(leyendas.filter((l) => l.id !== selectedId));
            }
            setShowModal(false);
            setSelectedId(null);
        });
    };

    const cancelDelete = () => {
        setShowModal(false);
        setSelectedId(null);
    };

    return (
        <div className="container mt-4">
            <h1>Listado de Leyendas</h1>
            <Link to="/crear" className="btn btn-success mb-3">
                Crear Nueva Leyenda
            </Link>

            {/* Formulario de filtros */}
            <form onSubmit={handleFilterSubmit} className="mb-4">
                <div className="row">
                    <div className="col-md-3">
                        <InputField
                            label="Nombre"
                            type="text"
                            name="nombre"
                            value={filters.nombre}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <InputField
                            label="Categoría"
                            type="text"
                            name="categoria"
                            value={filters.categoria}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <InputField
                            label="Fecha"
                            type="date"
                            name="fecha"
                            value={filters.fecha}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4">
                        <SelectField
                            label="Provincia"
                            name="provincia_id"
                            value={filters.provincia_id}
                            onChange={handleFilterChange}
                            options={provincias}
                        />
                    </div>
                    <div className="col-md-4">
                        <SelectField
                            label="Cantón"
                            name="canton_id"
                            value={filters.canton_id}
                            onChange={handleFilterChange}
                            options={cantones}
                            disabled={!filters.provincia_id}
                        />
                    </div>
                    <div className="col-md-4">
                        <SelectField
                            label="Distrito"
                            name="distrito_id"
                            value={filters.distrito_id}
                            onChange={handleFilterChange}
                            options={distritos}
                            disabled={!filters.canton_id}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Aplicar Filtros</button>
            </form>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Img</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {leyendas.map((leyenda) => (
                        <tr key={leyenda.id}>
                            <td>
                                <img src={leyenda.imagen_url} width="50" />
                            </td>
                            <td>{leyenda.nombre}</td>
                            <td>{leyenda.categoria}</td>
                            <td>{leyenda.fecha}</td>
                            <td>
                                <Link to={`/editar/${leyenda.id}`} className="btn btn-primary btn-sm mr-2">
                                    Editar
                                </Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(leyenda.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ModalConfirm
                show={showModal}
                message="¿Estás seguro de eliminar esta leyenda?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
};

export default ListaLeyendas;
