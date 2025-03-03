import React from "react";

const InputField = ({ label, type, name, value, onChange, required = false }) => {
  return (
    <div className="form-group mb-3">
      <label>{label}</label>
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        required={required}
      />
    </div>
  );
};

export default InputField;
