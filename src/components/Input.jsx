export default function Input({ name, type = "text", placeholder, value, onChange, disabled = false }) {
    return (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange} 
        className="w-full p-2 border rounded"
        disabled={disabled}
        readOnly={disabled} 
      />
    )
  }
  
  