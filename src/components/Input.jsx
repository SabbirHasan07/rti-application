import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faAddressCard, faPhone, faEnvelope, faInfoCircle, faHome } from "@fortawesome/free-solid-svg-icons"

export default function Input({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  icon
}) {
  const getIcon = (name) => {
    switch (name) {
      case 'name':
        return faUser
      case 'father':
        return faAddressCard
      case 'mother':
        return faAddressCard
      case 'phone':
        return faPhone
      case 'email':
        return faEnvelope
      case 'infoType':
        return faInfoCircle
      case 'presentAddress':
      case 'permanentAddress':
        return faHome
      default:
        return null
    }
  }

  return (
    <div className="relative w-full">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={disabled}
        className="w-full p-3 pl-10 pr-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {icon && (
        <FontAwesomeIcon
          icon={getIcon(name)}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      )}
    </div>
  )
}

  