"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-12 md:pt-0">
      {/* Background decoration with animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-6 md:space-y-8">
          {/* Badge with animation */}
          <div className="inline-block animate-fade-in">
            <div className="px-4 py-2 bg-blue-100 rounded-full border border-blue-200 hover:border-blue-300 transition-colors duration-300 cursor-default">
              <p className="text-sm font-semibold text-blue-700 flex items-center justify-center gap-2">
                <span className="animate-spin">🚀</span>
                Plateforme de jeux instant
              </p>
            </div>
          </div>

          {/* Headline with gradient animation */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Jouez dès maintenant
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              sans attendre
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Découvrez une nouvelle façon de jouer. Jeux instantanés, pas d'installation, juste du plaisir.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/signup">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 hover:scale-105"
              >
                Voir les jeux
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="pt-8 space-y-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-slate-500 font-medium">Rejoins des milliers de joueurs</p>
            <div className="flex justify-center items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-white text-sm font-semibold shadow-md hover:scale-110 transition-transform hover:z-10 cursor-pointer"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-700">+5000 joueurs actifs</span>
            </div>
          </div>
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
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
