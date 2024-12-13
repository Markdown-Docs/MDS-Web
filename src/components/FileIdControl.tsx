import { useFileStore } from '../stores/fileStore'

export const FileIdControl = () => {
  const { fileId, increment, decrement } = useFileStore()
  return (
    <div className="flex items-center gap-4 p-4" style={{ margin: '10px' }}>
      <button 
        onClick={decrement}
        className="px-4 py-2 bg-gray-200 rounded"
      >
        -
      </button>
      <span className="text-xl font-bold">Файл #{fileId}</span>
      <button 
        onClick={increment}
        className="px-4 py-2 bg-gray-200 rounded"
      >
        +
      </button>
    </div>
  )
} 