import { useEffect } from "react";
import EditTextField from "../assets/components/EditTextField";
import CompiledTextField from "../assets/components/CompiledTextField";
import { useWebSocketStore } from "../stores/webSocketSlice";

export default function CodePage() {
  const { connect, disconnect, sendMessage, content } = useWebSocketStore();

  useEffect(() => {
    connect("ws://localhost:4000/ws", "lobby");

    // Отключение WebSocket при размонтировании
    return () => disconnect();
  }, [connect, disconnect]);

  const handleEdit = (newContent: string) => {
    sendMessage(newContent);
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ flex: 1, width: "50vw", height: "100vh", backgroundColor: "white", color: "black" }}>
        <EditTextField value={content} onChange={handleEdit} />
      </div>
      <div style={{ width: "4px", backgroundColor: "black", height: "100vh" }}></div>
      <div style={{ flex: 1, width: "50vw", height: "100vh", backgroundColor: "white", color: "black" }}>
        <CompiledTextField value={content} />
      </div>
    </div>
  );
}
