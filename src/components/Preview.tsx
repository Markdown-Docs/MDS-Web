interface RenderedPreviewProps {
  content: string;
}

export default function RenderedPreview({ content }: RenderedPreviewProps) {
  return (
    <iframe
      style={{
        width: "210mm", // Ширина A4
        height: "297mm", // Высота A4
        border: "1px solid #ccc",
        margin: "10px auto",
        display: "block",
        backgroundColor: "white",
      }}
      srcDoc={content} // Рендерим HTML прямо из состояния
      title="Rendered Preview"
      sandbox="allow-same-origin allow-scripts"
    />
  );
}
