import React from "react";
import "./CustomInput.css"

export const CustomInput = ({ design, type, name, placeholder, functionProp, functionBlur , value, onKeyPress}) => {
    return (
        <input
            className={design}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={(e) => functionProp(e)}
            onBlur={(e) => functionBlur(e)}
            value={value}
            onKeyPress={onKeyPress}
        />
    )
}