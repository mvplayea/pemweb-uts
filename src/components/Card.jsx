const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-700">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  )
}

export default Card
