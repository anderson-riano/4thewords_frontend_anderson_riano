import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import request from "../services/request";
import LeyendaForm from "../components/LeyendaForm";

const EditarLeyenda = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leyenda, setLeyenda] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    fecha: "",
    imagen_url: "",
    provincia_id: "",
    canton_id: "",
    distrito_id: ""
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    request.get(`leyendas/${id}`).then((response) => {
      if (response.success) {
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        setLeyenda(data);
        setPreviewUrl(data.imagen_url);
      } else {
        alert("Error al cargar la leyenda: " + response.message);
      }
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeyenda((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagenFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileUpload = async () => {
    if (!imagenFile) return;
    const formData = new FormData();
    formData.append("imagen", imagenFile);
    const response = await request.post("upload_image", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    if (response.success) {
      setLeyenda((prev) => ({ ...prev, imagen_url: response.data.imagen_url }));
    } else {
      alert("Error al subir la imagen: " + response.message);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leyenda.imagen_url && imagenFile) {
      return;
    }

    const payload = { data: leyenda };
    request.put(`leyendas/${id}`, payload).then((response) => {
      if (response.success) {
        navigate("/");
      } else {
        alert("Error al actualizar la leyenda: " + response.message);
      }
    });
  };

  return (
    <div className="container mt-4">
      <h1>Editar Leyenda</h1>
      <LeyendaForm
        leyenda={leyenda}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
      />
      {previewUrl && (
        <div className="mt-3">
          <h5>Vista previa de la imagen:</h5>
          <img src={previewUrl} alt="Vista previa" style={{ maxWidth: "300px" }} />
        </div>
      )}
      {imagenFile && (
        <button className="btn btn-info mt-3" onClick={handleFileUpload}>
          Subir Imagen
        </button>
      )}
    </div>
  );
};

export default EditarLeyenda;
