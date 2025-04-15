export default function Button({ type = "button", children }) {
    return (
      <button
        type={type}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {children}
      </button>
    )
  }
  