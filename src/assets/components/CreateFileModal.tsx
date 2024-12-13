import { useState } from 'react';
import { useFileStore } from '../../stores/fileStore';
interface CreateFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateFileModal({ isOpen, onClose }: CreateFileModalProps) {
  const { setFileId } = useFileStore();
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем название файла (только буквы и цифры)
    if (!/^[a-zA-Z0-9]+$/.test(fileName)) {
      setError('Название файла может содержать только буквы и цифры');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fileName }),
      });
      if (response.ok) {
        const data = await response.json();
        setFileId(data.id);
        onClose();
        setFileName('');
        setError('');
      } else {
        setError('Ошибка при создании файла');
      }
    } catch (err) {
      setError('Ошибка при отправке запроса');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      display: 'flex',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '300px'
      }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Введите название файла"
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          {error && <p style={{ color: 'red', margin: '5px 0' }}>{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: 'black',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Отмена
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'black',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Создать файл
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 