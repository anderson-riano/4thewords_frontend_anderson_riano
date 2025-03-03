import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../services/request";
import LeyendaForm from "../components/LeyendaForm";

const CreateLeyenda = () => {
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
    request.post("leyendas/", payload).then((response) => {
      if (response.success) {
        navigate("/");
      } else {
        alert(response.message);
      }
    });
  };

  return (
    <div className="container mt-4">
      <h1>Crear Leyenda</h1>
      <LeyendaForm
        leyenda={leyenda}
        onChange={handleChange}
        onSubmit={handleSubmit}
    
        onFileChange={handleFileChange}
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

export default CreateLeyenda;
