export default function Button({
  as: Tag = "button",
  variant = "primary",
  className = "",
  children,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";

  const variants = {
    primary: "bg-accent text-background hover:bg-accent-soft",
    outline: "border border-white/15 text-white hover:border-accent/60 hover:text-accent",
    ghost: "text-secondary hover:text-white",
  };

  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
