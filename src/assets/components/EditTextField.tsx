import React, { useEffect, useRef } from 'react';
import { useEditFieldStore } from '../../stores/editFieldSlice';
import { EditorView, basicSetup } from 'codemirror';
import { markdown } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data"
import { useWebSocketStore } from '../../stores/webSocketSlice';
const EditTextField: React.FC = () => {
   const { text, setText } = useEditFieldStore();
   const editorRef = useRef<HTMLDivElement>(null);

   const { client, sendMessage } = useWebSocketStore();

   useEffect(() => {
      if (client) {
         sendMessage('/topic/text', text);
      }
   }, [text, client]);

   useEffect(() => {
      if (editorRef.current) {
         const view = new EditorView({
            doc: text,
            extensions: [basicSetup, markdown({ codeLanguages: languages })],
            parent: editorRef.current,
            dispatch: (tr) => {
               if (tr.docChanged) {
                  setText(tr.newDoc.toString());
               }``
               view.update([tr]);
            },
         });
         return () => {
            view.destroy();
         };
      }
   }, [editorRef, setText]);

   return <div ref={editorRef} style={{ textAlign: 'left' }}/>;
};

export default EditTextField;
