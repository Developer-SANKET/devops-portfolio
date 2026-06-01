import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SiTerraform, SiKubernetes, SiDocker, SiGithubactions, SiGrafana, SiPrometheus, SiPython, SiGnubash, SiJenkins, SiHelm } from "react-icons/si";
import { Terminal, Code, Cpu, Activity, Download, Mail, Github, Linkedin, Network, Layers, GitBranch, ArrowUpRight, Award, Cloud, CloudCog, Sun, Moon, Database, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/App";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"}`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-mono text-primary font-bold text-xl tracking-tighter">
          SP<span className="text-muted-foreground">_</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-mono text-muted-foreground">
          {['About', 'Skills', 'Projects', 'Experience'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="hover:text-primary transition-colors focus:outline-none"
              data-testid={`nav-link-${item.toLowerCase()}`}
            >
              <span className="text-primary mr-1">/</span>{item}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="border-primary/20 hover:border-primary/50 text-primary hover:text-primary"
            onClick={() => scrollTo('contact')}
            data-testid="nav-contact"
          >
            Contact
          </Button>
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.85, rotate: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative w-9 h-9 flex items-center justify-center rounded-full border border-primary/20 hover:border-primary/50 hover:bg-primary/10 text-primary transition-colors focus:outline-none"
            aria-label="Toggle theme"
            data-testid="theme-toggle"
          >
            <motion.span
              key={theme}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.25 }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="min-h-[100dvh] flex items-center pt-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 text-primary font-mono mb-4">
            <Terminal size={16} />
            <span>sys.init()</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Sanket Patil
            <span className="block text-2xl md:text-4xl text-muted-foreground mt-2 font-normal">
              DevOps Engineer &nbsp;|&nbsp; Platform Engineer &nbsp;|&nbsp; SRE
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed border-l-2 border-primary/50 pl-4">
            3+ years building scalable cloud infrastructure on AWS &amp; Azure. AI Infrastructure Enthusiast leveraging GenAI tools to automate deployments, accelerate troubleshooting, and drive operational excellence.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="mailto:psanket6.2000@gmail.com">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <Mail className="mr-2 h-4 w-4" /> Connect
              </Button>
            </a>
            <Button size="lg" variant="outline" className="rounded-none border-border hover:bg-muted">
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="text-primary font-mono mr-3 text-lg">01.</span> About
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                I'm a DevOps &amp; Cloud Engineer with 3+ years of hands-on experience designing, implementing, and managing scalable cloud infrastructure across Microsoft Azure and AWS — certified as an Azure DevOps Engineer and Azure Administrator.
              </p>
              <p>
                My toolkit spans Terraform, Docker, Kubernetes, Jenkins, and GitHub Actions, with strong foundations in cloud networking, security, and microservices architecture. I'm an AI Infrastructure Enthusiast with real-world experience applying Claude AI and GenAI tooling to optimize deployment lifecycles, automate operations, and sharpen incident response.
              </p>
              <p>
                My philosophy: Infrastructure should be code, deployments should be predictable, and AI should make operations smarter — not just faster.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-card border border-border rounded-xl p-8 shadow-2xl relative z-10">
              <div className="flex items-center space-x-2 mb-6 border-b border-border pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 font-mono text-xs text-muted-foreground">system_status.log</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <p className="text-primary">{'>'} initiating scan...</p>
                <p className="text-muted-foreground">[OK] AWS core services loaded</p>
                <p className="text-muted-foreground">[OK] Azure Resource Manager synced</p>
                <p className="text-muted-foreground">[OK] Kubernetes clusters healthy</p>
                <p className="text-muted-foreground">[OK] Terraform state locked</p>
                <p className="text-primary mt-4">{'>'} applying GenAI ops layer</p>
                <p className="text-muted-foreground">Analyzing telemetry patterns...</p>
                <p className="text-green-400">Infrastructure operating at peak efficiency.</p>
                <p className="text-primary mt-4 animate-pulse">_</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-primary/10 rounded-xl translate-x-4 translate-y-4 -z-10" />
            <div className="absolute inset-0 border border-primary/20 rounded-xl translate-x-8 translate-y-8 -z-20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const skillCategories = [
    {
      title: "Cloud & Compute",
      icon: <Network className="w-5 h-5 text-primary" />,
      items: [
        { name: "AWS (EC2, S3, EKS, Lambda, Bedrock)", icon: <Cloud className="w-4 h-4" /> },
        { name: "Azure (AKS, VNet, App Services)", icon: <CloudCog className="w-4 h-4" /> },
        { name: "Kubernetes", icon: <SiKubernetes /> },
        { name: "Docker & Docker Compose", icon: <SiDocker /> }
      ]
    },
    {
      title: "CI/CD & Pipelines",
      icon: <GitBranch className="w-5 h-5 text-primary" />,
      items: [
        { name: "Jenkins", icon: <SiJenkins /> },
        { name: "GitHub Actions", icon: <SiGithubactions /> },
        { name: "Argo CD", icon: <Server className="w-4 h-4" /> },
        { name: "Helm", icon: <SiHelm /> }
      ]
    },
    {
      title: "IaC & Observability",
      icon: <Layers className="w-5 h-5 text-primary" />,
      items: [
        { name: "Terraform", icon: <SiTerraform /> },
        { name: "Prometheus", icon: <SiPrometheus /> },
        { name: "Grafana", icon: <SiGrafana /> },
        { name: "CloudWatch / Log Analytics", icon: <Activity className="w-4 h-4" /> }
      ]
    },
    {
      title: "Languages & Databases",
      icon: <Code className="w-5 h-5 text-primary" />,
      items: [
        { name: "Python", icon: <SiPython /> },
        { name: "Bash / Shell Scripting", icon: <SiGnubash /> },
        { name: "MySQL, PostgreSQL, MongoDB", icon: <Database className="w-4 h-4" /> },
        { name: "Redis", icon: <Cpu className="w-4 h-4" /> }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-card/30 border-y border-border relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold flex items-center">
            <span className="text-primary font-mono mr-3 text-lg">02.</span> Skills & Expertise
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-background border border-border p-6 rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-6">
                {cat.icon}
                <h3 className="font-semibold text-lg">{cat.title}</h3>
              </div>
              <ul className="space-y-4">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-center text-muted-foreground">
                    <span className="w-6 h-6 flex items-center justify-center mr-3 text-primary/80 shrink-0">
                      {item.icon || <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />}
                    </span>
                    <span className="text-sm">{item.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const certifications = [
    { name: "AZ-900 — Azure Fundamentals", issuer: "Microsoft" },
    { name: "AZ-104 — Azure Administrator Associate", issuer: "Microsoft" }
  ];

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold flex items-center">
            <span className="text-primary font-mono mr-3 text-lg">03.</span> Certifications
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-start p-6 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors"
            >
              <Award className="w-6 h-6 text-primary mr-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{cert.name}</p>
                <p className="text-sm text-muted-foreground mt-1 font-mono">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 max-w-2xl">
          <div className="p-6 rounded-lg bg-card/50 border border-border/50">
            <h3 className="text-sm font-mono text-primary mb-3">Education</h3>
            <p className="font-semibold">Bachelor of Computer Application (BCA)</p>
            <p className="text-muted-foreground text-sm mt-1">Savitribai Phule Pune University &bull; 2019 – 2022 &bull; GPA: 8.0</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: "Multi-Cloud AI Observability Platform",
      description: "Built a unified observability layer across AWS and Azure using OpenTelemetry + Grafana, with an LLM-powered anomaly summarization engine that reduces MTTR by 60%.",
      tech: ["AWS", "Azure", "OpenTelemetry", "Grafana", "Python", "LLM"]
    },
    {
      title: "GitOps-Driven Kubernetes Platform",
      description: "Designed a production-grade EKS + AKS multi-cluster GitOps platform using ArgoCD, Helm, and Terraform with zero-downtime deployments for 200+ microservices.",
      tech: ["EKS", "AKS", "ArgoCD", "Terraform", "Helm"]
    },
    {
      title: "AI-Assisted Incident Response Bot",
      description: "Integrated GPT-4 into PagerDuty workflows to auto-triage alerts, suggest runbooks, and draft incident summaries — cut median response time from 18min to 4min.",
      tech: ["TypeScript", "GPT-4", "PagerDuty API", "AWS Lambda"]
    },
    {
      title: "Serverless ML Pipeline on AWS",
      description: "End-to-end MLOps pipeline using AWS Step Functions, Lambda, SageMaker, and CodePipeline with automated model drift detection and blue/green model swaps.",
      tech: ["AWS Step Functions", "SageMaker", "Python", "CodePipeline"]
    }
  ];

  return (
    <section id="projects" className="py-24 bg-card/30 border-y border-border relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 flex items-center justify-between">
          <h2 className="text-3xl font-bold flex items-center">
            <span className="text-primary font-mono mr-3 text-lg">04.</span> Featured Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-background border border-border p-8 rounded-xl hover:border-primary/50 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
              <div className="flex justify-between items-start mb-6">
                <Activity className="w-10 h-10 text-primary" />
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const roles = [
    {
      title: "DevOps Engineer",
      company: "GENZEON — Pune, India",
      period: "Mar 2024 — Present",
      bullets: [
        "Managed and deployed cloud infrastructure across AWS and Azure (EC2, S3, VPC, IAM, AKS, App Services, Azure Functions, Load Balancers).",
        "Automated infrastructure provisioning with Terraform — reduced manual deployment effort by 40–50% across dev/staging/prod.",
        "Built and maintained CI/CD pipelines using Jenkins, GitHub Actions, and Azure DevOps Pipelines for build, test, and deploy automation.",
        "Containerized applications with Docker and deployed on Kubernetes (EKS/AKS) — Pods, Deployments, Ingress, ConfigMaps, cluster admin.",
        "Set up monitoring and alerting with CloudWatch, Prometheus, Grafana, and Azure Log Analytics.",
        "Authored Python and Bash automation scripts on Rocky Linux, reducing manual operations by 70%.",
        "Collaborated with Dev, QA, and Platform teams to cut release time by 40% and resolve production infrastructure issues."
      ]
    },
    {
      title: "Java Developer",
      company: "INDSAC Softech — Remote",
      period: "Apr 2023 — Mar 2024",
      bullets: [
        "Developed Java web applications using Spring MVC, Spring Boot, and REST APIs for scalable backend services.",
        "Implemented database operations using Hibernate ORM with MySQL — CRUD and query optimization.",
        "Validated APIs using Postman; collaborated in Agile/Scrum environment with Git version control.",
        "Designed RESTful APIs enabling inter-service communication in a microservice architecture."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold flex items-center">
            <span className="text-primary font-mono mr-3 text-lg">05.</span> Experience
          </h2>
        </div>

        <div className="space-y-14">
          {roles.map((role, idx) => (
            <motion.div
              key={role.title + role.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-[180px_1fr] gap-8">
                <div className="mb-2 md:mb-0 text-muted-foreground font-mono text-xs mt-1 leading-relaxed">
                  {role.period}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{role.title}</h3>
                  <div className="text-primary font-mono mb-4 text-sm">{role.company}</div>
                  <ul className="space-y-2">
                    {role.bullets.map((b, i) => (
                      <li key={i} className="text-muted-foreground leading-relaxed flex items-start gap-2">
                        <span className="text-primary mt-1.5 shrink-0">
                          <ChevronRight className="w-3 h-3" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 relative text-center bg-card/30 border-t border-border">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-primary font-mono mb-4 text-sm">06. What's Next?</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Have a cloud infrastructure challenge, a DevOps automation problem, or just want to talk AWS &amp; Azure architecture? My inbox is open.
          </p>
          <a href="mailto:psanket6.2000@gmail.com">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg shadow-[0_0_30px_rgba(0,240,255,0.2)]">
              Say Hello
            </Button>
          </a>

          <div className="flex justify-center items-center space-x-6 mt-20">
            <a
              href="https://github.com/Developer-SANKET"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/sanket-patil-a57153173/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:psanket6.2000@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <p className="text-muted-foreground/50 text-sm font-mono mt-8">
            psanket6.2000@gmail.com &bull; +91 9922270423 &bull; Pune, Maharashtra
          </p>
        </motion.div>
      </div>
    </section>
  );
}

import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Certifications />
      <Projects />
      <Experience />
      <Contact />
      <footer className="py-6 text-center text-sm font-mono text-muted-foreground border-t border-border bg-background">
        <p>Built by Sanket Patil &bull; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
