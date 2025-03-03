import React from "react";

const SelectField = ({ label, name, value, onChange, options, disabled = false, required = false }) => {
  return (
    <div className="form-group mb-3">
      <label>{label}</label>
      <select 
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        disabled={disabled}
        required={required}
      >
        <option value="">Seleccione una opción</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
