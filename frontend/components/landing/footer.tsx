"use client"

import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Jeux",
      links: [
        { label: "Quick Match", href: "#" },
        { label: "Battle Arena", href: "#" },
        { label: "Puzzle Rush", href: "#" },
        { label: "Team Quest", href: "#" },
      ],
    },
    {
      title: "Ressources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Support", href: "#" },
        { label: "API", href: "#" },
      ],
    },
    {
      title: "Légal",
      links: [
        { label: "Confidentialité", href: "#" },
        { label: "Conditions", href: "#" },
        { label: "Cookies", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ]

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 text-lg">
                🎮
              </div>
              <span className="font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                InstantPlay
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              La plateforme ultime pour des jeux instantanés. Pas d'attente, juste du plaisir.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {[
                { name: "Twitter", path: "M8.29 20a11.04 11.04 0 0 0 11.04-11.04c0-.168 0-.335-.01-.5A7.88 7.88 0 0 0 22 5.92a7.75 7.75 0 0 1-2.19.6 3.83 3.83 0 0 0 1.68-2.11 7.66 7.66 0 0 1-2.43.93 3.82 3.82 0 0 0-6.51 3.49A10.84 10.84 0 0 1 3.35 5.23a3.82 3.82 0 0 0 1.18 5.1 3.8 3.8 0 0 1-1.73-.48v.05a3.82 3.82 0 0 0 3.06 3.75 3.8 3.8 0 0 1-1.73.06 3.83 3.83 0 0 0 3.58 2.65A7.67 7.67 0 0 1 2 19.27a10.8 10.8 0 0 0 6.29 1.84" },
                { name: "Discord", path: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.028C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.194.372-.291a.074.074 0 0 1 .076-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.097.246.197.373.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.359.698.77 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-4.565-.838-8.535-3.549-12.047a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.193 0 2.156.964 2.157 2.157 0 1.19-.964 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.193 0 2.157.964 2.157 2.157 0 1.19-.964 2.156-2.157 2.156z" },
              ].map((social) => (
                <Link
                  key={social.name}
                  href="#"
                  className="text-slate-400 hover:text-white hover:scale-110 transition-all duration-300 group"
                  title={social.name}
                >
                  <svg className="w-6 h-6 group-hover:drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="font-semibold text-white text-sm uppercase tracking-wide">
                {column.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200 relative inline-flex group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800"></div>

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 flex items-center gap-2 hover:text-slate-300 transition-colors duration-200">
            Fait avec
            <Heart className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
            par InstantPlay © {currentYear}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </footer>
  )
}
