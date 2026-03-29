export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-slate-400">
      <p>
        Designed &amp; built by{" "}
        <span className="font-semibold text-slate-500">Ye Chan Lin</span> · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
