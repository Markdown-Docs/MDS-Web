import EditTextField from '../assets/components/EditTextField';
import CompiledTextField from '../assets/components/CompiledTextField';
import { useWebSocketStore } from '../stores/webSocketSlice';

export default function CodePage() {
   const { client, connect } = useWebSocketStore();
   if (client === null) {
      connect('http://localhost:8080/ws');
    }
   return (<>
      <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
         <div style={{ flex: 1, width: '50vw', height: '100vh', backgroundColor: 'white', color: 'black' }}>
            <EditTextField />
         </div>
         <div style={{ width: '4px', backgroundColor: 'black', height: '100vh' }}></div>
         <div style={{ flex: 1, width: '50vw', height: '100vh', backgroundColor: 'white', color: 'black' }}>
            <CompiledTextField />
         </div>
      </div>
   </>
   );
}