export default function CompiledTextField({ value }: { value: string }) {
  return (
    <div
      style={{ width: "100%", height: "100%", padding: "10px", fontSize: "16px", overflowY: "auto", whiteSpace: "pre-wrap" }}
    >
      {value}
    </div>
  );
}
