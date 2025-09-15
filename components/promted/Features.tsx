import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Users,
  BarChart3,
  Shield,
  Workflow,
  Clock,
  MessageSquare,
  Smartphone,
} from "lucide-react";
import teamCollaboration from "@/assets/team-collaboration.png";
import productivity from "@/assets/productivity.png";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built for speed. Load boards instantly, drag-and-drop without lag, and work seamlessly across devices.",
    color: "text-yellow-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Real-time collaboration with advanced permissions, team spaces, and integrated communication tools.",
    color: "text-blue-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Get insights into team productivity, project progress, and bottlenecks with beautiful dashboards.",
    color: "text-green-500",
  },
  {
    icon: Workflow,
    title: "Automation Rules",
    description:
      "Automate repetitive tasks with custom rules and triggers. Focus on what matters most.",
    color: "text-purple-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level security with SSO, 2FA, audit logs, and compliance certifications.",
    color: "text-red-500",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Native mobile apps that work offline. Manage projects anywhere, anytime.",
    color: "text-indigo-500",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything Trello has,
            <span className="block text-primary">and much more</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've taken the best parts of traditional project management and
            enhanced them with modern features your team actually wants to use.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${feature.color}/10 to-${feature.color}/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Feature Highlights */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-4">
              Collaboration
            </Badge>
            <h3 className="text-3xl font-bold mb-6 text-foreground">
              Built for teams that move fast
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Real-time Comments</h4>
                  <p className="text-muted-foreground text-sm">
                    Discuss ideas directly on cards with @mentions and
                    notifications
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Time Tracking</h4>
                  <p className="text-muted-foreground text-sm">
                    Built-in time tracking with detailed reports and billing
                    integration
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Team Workspaces</h4>
                  <p className="text-muted-foreground text-sm">
                    Organize multiple projects with role-based access controls
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <img
              src={teamCollaboration}
              alt="Team collaboration features"
              className="w-full rounded-2xl shadow-elegant"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-20">
          <div className="animate-scale-in order-2 lg:order-1">
            <img
              src={productivity}
              alt="Productivity and automation features"
              className="w-full rounded-2xl shadow-elegant"
            />
          </div>

          <div
            className="animate-fade-in order-1 lg:order-2"
            style={{ animationDelay: "0.2s" }}
          >
            <Badge variant="outline" className="mb-4">
              Automation
            </Badge>
            <h3 className="text-3xl font-bold mb-6 text-foreground">
              Work smarter, not harder
            </h3>
            <p className="text-muted-foreground mb-6">
              Set up powerful automation rules that handle routine tasks
              automatically. From moving cards based on due dates to assigning
              team members based on labels.
            </p>
            <div className="bg-gradient-card p-6 rounded-xl border">
              <h4 className="font-semibold mb-2 text-foreground">
                Popular Automations:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Auto-assign cards based on keywords</li>
                <li>• Move overdue tasks to "Needs Attention"</li>
                <li>• Send Slack notifications for card updates</li>
                <li>• Create recurring tasks automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
