import { useState } from 'react';

interface FileDownloadButtonProps {
  fileId: string | number;
}

export default function FileDownloadButton({ fileId }: FileDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`http://localhost:4000/file/${fileId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при скачивании файла');
      }
      const data = await response.json();
      const blob = new Blob([data.content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.name + '.mds';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при скачивании файла');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={isLoading}
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        marginBottom: '10px',
      }}
    >
      {isLoading ? 'Загрузка...' : 'Скачать файл'}
    </button>
  );
} 