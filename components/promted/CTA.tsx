import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-glow-pulse">
            <Sparkles className="h-4 w-4" />
            Join 10,000+ teams already using ProjectBoard
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to transform your
            <span className="block bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
              team productivity?
            </span>
          </h2>

          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Start your free trial today. No credit card required. Setup takes
            less than 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" variant="default" className="group min-w-48">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 min-w-48"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div
              className="text-center animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="text-3xl font-bold text-white mb-1">10k+</div>
              <div className="text-white/60 text-sm">Active Teams</div>
            </div>
            <div
              className="text-center animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-white/60 text-sm">Uptime SLA</div>
            </div>
            <div
              className="text-center animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="text-3xl font-bold text-white mb-1">4.9★</div>
              <div className="text-white/60 text-sm">User Rating</div>
            </div>
            <div
              className="text-center animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-white/60 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
