import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { User, Sparkles, FolderKanban, Wrench, Mail, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const TABS = [
  { to: "/admin/profile", label: "Profile", icon: User },
  { to: "/admin/skills", label: "Skills", icon: Sparkles },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/messages", label: "Messages", icon: Mail },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="flex min-h-screen">
        <aside className="flex w-64 shrink-0 flex-col border-r border-white/[0.06] bg-surface p-5">
          <p className="mb-6 font-heading text-lg font-semibold">
            Malek<span className="text-accent">.</span> Admin
          </p>

          <nav className="flex flex-1 flex-col gap-1">
            {TABS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-secondary hover:bg-white/[0.04] hover:text-white"
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-secondary transition-colors duration-200 hover:bg-white/[0.04] hover:text-white"
          >
            <ExternalLink size={16} />
            View Site
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-secondary transition-colors duration-200 hover:bg-white/[0.04] hover:text-red-400"
          >
            <LogOut size={16} />
            Logout
          </button>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
