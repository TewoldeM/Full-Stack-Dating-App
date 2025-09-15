
import { Check, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const plans = [
  {
    name: "Starter",
    price: "0",
    period: "Forever Free",
    description: "Perfect for personal projects and small teams",
    features: [
      "Up to 3 boards",
      "Unlimited personal cards",
      "Basic team collaboration",
      "Mobile app access",
      "Community support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Professional",
    price: "12",
    period: "per user/month",
    description: "Ideal for growing teams and businesses",
    features: [
      "Unlimited boards",
      "Advanced automation rules",
      "Time tracking & reporting",
      "Calendar & timeline views",
      "Guest access controls",
      "Priority support",
      "Third-party integrations",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Contact us",
    description: "For large organizations with advanced needs",
    features: [
      "Everything in Professional",
      "Advanced security & compliance",
      "SSO & directory sync",
      "Dedicated customer success",
      "Custom integrations",
      "SLA guarantee",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-scale-in ${
                plan.popular ? "border-primary shadow-glow" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {plan.name}
                </h3>
                <div className="mb-3">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price === "Custom" ? "" : "$"}
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && plan.price !== "0" && (
                    <span className="text-muted-foreground">
                      /{plan.period}
                    </span>
                  )}
                  {plan.price === "0" && (
                    <span className="text-muted-foreground block text-lg">
                      {plan.period}
                    </span>
                  )}
                  {plan.price === "Custom" && (
                    <span className="text-muted-foreground block text-lg">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                size="lg"
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        <div
          className="text-center mt-16 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-muted-foreground mb-6">
            All plans include our core features with no usage limits
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              <span>99.9% uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              <span>24/7 customer support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
