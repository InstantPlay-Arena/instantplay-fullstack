import { Header } from "@/components/layout/header"
import { Hero } from "@/components/landing/hero"
import { GamesSection } from "@/components/landing/games-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <GamesSection />
      </main>
      <Footer />
    </div>
  )
}
