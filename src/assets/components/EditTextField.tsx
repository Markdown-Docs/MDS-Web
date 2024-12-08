export default function EditTextField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <textarea
      style={{ width: "100%", height: "100%", padding: "10px", fontSize: "16px" }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
