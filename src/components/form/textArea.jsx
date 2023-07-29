import { Field ,useField,Formik,Form } from "formik";
import React from "react";

function TextArea({defaultValue, label, ...props }) {
    const [field, meta,helpers] = useField(props);
  return (
    <label>
      <div>{label}</div>
      <textarea defaultValue={defaultValue} {...field} {...props}/>
      
    </label>
  );
}
export default TextArea;
