export default function Card({ className = "", children, ...rest }) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.06] bg-surface p-6 transition-colors duration-300 hover:border-accent/30 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
