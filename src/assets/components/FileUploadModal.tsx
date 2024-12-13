import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (content: string) => void;
}

export default function FileUploadModal({ isOpen, onClose, onUpload }: FileUploadModalProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file.name.endsWith('.mds')) {
      alert('Пожалуйста, загрузите файл с расширением .mds');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      onUpload(reader.result as string);
      onClose();
    };
    
    reader.readAsText(file);
  }, [onUpload, onClose]);

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    accept: {
      'application/mds': ['.mds']
    }
  });

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div {...getRootProps()} style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          color: 'black'
        }}>
          <input {...getInputProps()} />
          <p>Перетащите файл сюда или кликните для выбора</p>
        </div>
        <button 
          onClick={onClose}
          style={{ marginTop: '10px', float: 'right'}}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}