function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-error/10 border border-error text-error p-6 rounded-lg mb-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-3xl">⚠️</span>
        <div>
          <h3 className="font-semibold mb-1">Error</h3>
          <p>{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-error text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap ml-4"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
