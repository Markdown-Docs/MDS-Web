import React, { useEffect } from 'react';
import { useCompiledFieldStore } from '../../stores/compiledFieldSlice';
import { useWebSocketStore } from '../../stores/webSocketSlice';

const CompiledTextField: React.FC = () => {
  const { text, setText } = useCompiledFieldStore();

  const { client, subscribe } = useWebSocketStore();

  useEffect(() => {
    if (client) {
      subscribe('/topic/text', (message) => setText(message.body));
    }
  }, [client]);

  return (
    <div style={{ textAlign: 'left' }}>
      <p>{text}</p>
    </div>
  );
};

export default CompiledTextField;
