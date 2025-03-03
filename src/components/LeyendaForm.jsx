import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import ubicacionService from "../services/ubicacionService";

const LeyendaForm = ({ leyenda, onChange, onFileChange, onSubmit }) => {
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);

  useEffect(() => {
    ubicacionService.getProvincias().then((data) => setProvincias(data));
  }, []);

  useEffect(() => {
    if (leyenda.provincia_id) {
      ubicacionService.getCantones(leyenda.provincia_id).then((data) => setCantones(data));
    } else {
      setCantones([]);
      setDistritos([]);
    }
  }, [leyenda.provincia_id]);

  useEffect(() => {
    if (leyenda.canton_id) {
      ubicacionService.getDistritos(leyenda.canton_id).then((data) => setDistritos(data));
    } else {
      setDistritos([]);
    }
  }, [leyenda.canton_id]);

  return (
    <form onSubmit={onSubmit}>
      <InputField label="Nombre" type="text" name="nombre" value={leyenda.nombre} onChange={onChange} required />
      <InputField label="Categoría" type="text" name="categoria" value={leyenda.categoria} onChange={onChange} required />
      <InputField label="Descripción" type="text" name="descripcion" value={leyenda.descripcion} onChange={onChange} required />
      <InputField label="Fecha" type="date" name="fecha" value={leyenda.fecha} onChange={onChange} required />

      <div className="form-group mb-3">
        <label>Imagen</label>
        <input
          type="file"
          name="imagen"
          className="form-control"
          accept="image/*"
          onChange={onFileChange}
          required={!leyenda.imagen_url}
        />
      </div>

      <SelectField label="Provincia" name="provincia_id" value={leyenda.provincia_id} onChange={onChange} options={provincias} required={true} />
      <SelectField label="Cantón" name="canton_id" value={leyenda.canton_id} onChange={onChange} options={cantones} disabled={!leyenda.provincia_id} required={true} />
      <SelectField label="Distrito" name="distrito_id" value={leyenda.distrito_id} onChange={onChange} options={distritos} disabled={!leyenda.canton_id} required={true} />

      <button type="submit" className="btn btn-primary mt-3">Guardar</button>
    </form>
  );
};

export default LeyendaForm;
