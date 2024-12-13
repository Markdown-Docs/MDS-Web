import { useEffect, useState } from "react";
import EditTextField from "../assets/components/EditTextField";
import CompiledTextField from "../assets/components/CompiledTextField";
import { useWebSocketStore } from "../stores/webSocketSlice";
import FileUploadModal from "../assets/components/FileUploadModal";
import FileDownloadButton from "../assets/components/FileDownloadButton";
import { useFileStore } from "../stores/fileStore";
import CreateFileModal from "../assets/components/CreateFileModal";

export default function CodePage() {
  const { connect, disconnect, sendMessage, content } = useWebSocketStore();
  const { fileId } = useFileStore();
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`http://localhost:4000/file/${fileId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Ошибка при загрузке файла');
        }

        const data = await response.json();
        sendMessage(data.content);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchContent();
    connect("ws://localhost:4000/ws", fileId.toString());

    // Отключение WebSocket при размонтировании
    return () => disconnect();
  }, [connect, disconnect, fileId]);

  const handleEdit = (newContent: string) => {
    sendMessage(newContent);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);

  const handleFileUpload = (fileContent: string) => {
    sendMessage(fileContent);
  };

  const handleDeleteFile = async () => {
    try {
      const response = await fetch(`http://localhost:4000/file/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении файла');
      }
      //TODO: поставить id файла свободного
      alert('Файл успешно удален');
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при удалении файла');
    }
  };

  return (
    <>
      <div style={{ display: "flex", width: "100%", height: "100vh" }}>
        <div style={{ display: "flex", flex: 1, width: "50vw", height: "100vh", backgroundColor: "white", color: "black" }}>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
            <button
              onClick={() => setIsCreateFileModalOpen(true)}
              style={{
                height: '40px',
                marginBottom: '10px',
                padding: '0 15px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Создать файл
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                height: '40px',
                marginBottom: '10px',
                padding: '0 15px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Загрузить файл
            </button>
            <FileDownloadButton fileId={1} />
            <button
              onClick={handleDeleteFile}
              style={{
                height: '40px',
                marginBottom: '10px',
                padding: '0 15px',
                backgroundColor: '#dc3545', // красный цвет для кнопки удаления
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Удалить файл
            </button>
          </div>
          <EditTextField value={content} onChange={handleEdit} />
        </div>
        <div style={{ width: "4px", backgroundColor: "black", height: "100vh" }}></div>
        <div style={{ flex: 1, width: "50vw", height: "100vh", backgroundColor: "white", color: "black" }}>
          <CompiledTextField value={content} />
        </div>

      </div>
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleFileUpload}
      />
      <CreateFileModal
        isOpen={isCreateFileModalOpen}
        onClose={() => setIsCreateFileModalOpen(false)}
      />
    </>
  );
}
