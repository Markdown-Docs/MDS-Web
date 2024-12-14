import { useEffect, useState } from "react";
import EditTextField from "../assets/components/EditTextField";
import RenderedPreview from "../components/Preview";
import FileUploadModal from "../assets/components/FileUploadModal";
import CreateFileModal from "../assets/components/CreateFileModal";
import AppNavbar from "../assets/components/Navbar";
import AppSidebar from "../assets/components/Sidebar";
import { useWebSocketStore } from "../stores/webSocketSlice";
import { useFileStore } from "../stores/fileStore";
import FileDownloadButton from "../assets/components/FileDownloadButton";

export default function CodePage() {
  const { connect, disconnect, sendMessage, content, previewContent } = useWebSocketStore();
  const { fileId } = useFileStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`http://localhost:4000/file/${fileId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Ошибка при загрузке файла");
        const data = await response.json();
        sendMessage(data.content);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchContent();
    connect("ws://localhost:4000/ws", fileId.toString());
    return () => disconnect();
  }, [connect, disconnect, fileId]);

  const handleEdit = (newContent: string) => sendMessage(newContent);

  return (
    <div className={`${isDarkMode ? "dark" : ""} flex h-full`}>
      {/* Sidebar */}
      <AppSidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <AppNavbar
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleTheme={() => setDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
          onUpload={() => setIsModalOpen(true)}
          onDelete={() => console.log("Delete File")}
          onCreate={() => setIsCreateFileModalOpen(true)}
          additionalActions={
            <FileDownloadButton fileId={fileId} />
          }
        />

        {/* Editor and Preview */}
        <div className="flex h-full">
          <div className="flex-1 p-4 editor">
            <EditTextField value={content} onChange={handleEdit} />
          </div>
          <div className="flex-1 p-4 editor">
            <RenderedPreview content={previewContent} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={(fileContent) => sendMessage(fileContent)}
      />
      <CreateFileModal
        isOpen={isCreateFileModalOpen}
        onClose={() => setIsCreateFileModalOpen(false)}
      />
    </div>
  );
}
