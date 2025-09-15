import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-glow/20 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Project Management
              <span className="block bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-2xl">
              Experience the next evolution of project management. ProjectBoard
              combines the simplicity of Trello with powerful features that
              scale with your team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" variant="hero" className="group">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button size="lg" variant="secondary" className="group">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-white/60">
              <span>✨ Free 14-day trial</span>
              <span>🚀 No credit card required</span>
              <span>⚡ Setup in 2 minutes</span>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div
            className="relative animate-scale-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative">
              <img
                src={heroDashboard}
                alt="ProjectBoard Dashboard Interface"
                className="w-full rounded-2xl shadow-glow transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold shadow-elegant animate-glow-pulse">
              99.9% Uptime
            </div>

            <div
              className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-semibold shadow-card animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              Trusted by 10k+ teams
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
