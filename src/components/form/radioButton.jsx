import { useField } from "formik";

export default function RadioButton({ label,defaultValue, options, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <div >
      <label>{label}</label>
      {options.map((option, key) => (
        <label key={key}  style={{fontSize:"15px"}}>
          <input 
          defaultValue={defaultValue}
            type="radio"
            name={field.name}
            value={option.value}
            checked={field.value === option.value}
            onChange={() => helpers.setValue(option.value)}
          />
          {option.value}
        </label>
      ))}
    </div>
  );
}
