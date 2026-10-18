import { useState, useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useSpring,
  useInView,
  animate,
} from "framer-motion";
import {
  SiTerraform,
  SiKubernetes,
  SiDocker,
  SiGithubactions,
  SiGrafana,
  SiPrometheus,
  SiPython,
  SiGnubash,
  SiJenkins,
  SiHelm,
} from "react-icons/si";
import {
  Terminal,
  Code,
  Cpu,
  Download,
  Mail,
  Github,
  Linkedin,
  Network,
  Layers,
  GitBranch,
  Award,
  Cloud,
  CloudCog,
  Sun,
  Moon,
  Database,
  Server,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  ArrowUp,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/App";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = ["About", "Skills", "Certifications", "Projects", "Experience"];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/** Card with a soft spotlight that follows the cursor. Theme-agnostic (uses currentColor). */
function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={`group relative overflow-hidden ${className}`}>
      <div
        className="pointer-events-none absolute -inset-px text-primary opacity-0 group-hover:opacity-[0.13] transition-opacity duration-300"
        style={{
          background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), currentColor, transparent 45%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-16 flex items-center gap-4"
    >
      <h2 className="text-3xl md:text-4xl font-bold flex items-center whitespace-nowrap">
        <span className="text-primary font-mono mr-3 text-lg">{num}.</span> {title}
      </h2>
      <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-primary/40 to-transparent" />
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let delay = deleting ? 35 : 75;

    if (!deleting && text === word) delay = 1600;
    if (deleting && text === "") delay = 350;

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className="text-primary">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll progress + back to top                                       */
/* ------------------------------------------------------------------ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 origin-left bg-primary z-[60]"
    />
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-card/80 backdrop-blur border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center shadow-lg"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
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
        transition={{ duration: 0.25 }}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </motion.span>
    </motion.button>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const ids = [...NAV_ITEMS.map((n) => n.toLowerCase()), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-primary font-bold text-xl tracking-tighter focus:outline-none"
          aria-label="Back to top"
        >
          SP<span className="text-muted-foreground">_</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-mono text-muted-foreground">
          {NAV_ITEMS.map((item) => {
            const id = item.toLowerCase();
            const isActive = active === id;
            return (
              <button
                key={item}
                onClick={() => go(id)}
                className={`relative transition-colors focus:outline-none hover:text-primary ${isActive ? "text-primary" : ""}`}
                data-testid={`nav-link-${id}`}
              >
                <span className="text-primary mr-1">/</span>
                {item}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                  />
                )}
              </button>
            );
          })}
          <Button
            variant="outline"
            size="sm"
            className="border-primary/20 hover:border-primary/50 text-primary hover:text-primary"
            onClick={() => go("contact")}
            data-testid="nav-contact"
          >
            Contact
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-primary/20 text-primary focus:outline-none"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="px-6 py-4 flex flex-col font-mono text-sm">
              {[...NAV_ITEMS, "Contact"].map((item) => {
                const id = item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => go(id)}
                    className={`text-left py-3 border-b border-border/50 last:border-0 ${
                      active === id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <span className="text-primary mr-2">/</span>
                    {item}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: 150, suffix: "+", label: "Microservices on AKS" },
  { value: 40, suffix: "%", label: "Faster releases" },
  { value: 70, suffix: "%", label: "Manual ops reduced" },
  { value: 5, suffix: "", label: "Certifications" },
];

function Hero() {
  return (
    <section id="hero" className="min-h-[100dvh] flex items-center pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 text-primary font-mono text-xs mb-6 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Open to new opportunities
          </div>

          <div className="flex items-center space-x-2 text-primary font-mono mb-4">
            <Terminal size={16} />
            <span>sys.init()</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Sanket Patil
            </span>
            <span className="block text-2xl md:text-4xl text-muted-foreground mt-3 font-normal h-10 md:h-12">
              <Typewriter words={["DevOps Engineer", "Platform Engineer", "Site Reliability Engineer", "AIOps Builder"]} />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed border-l-2 border-primary/50 pl-4">
            3+ years building scalable cloud infrastructure on AWS &amp; Azure. AI Infrastructure Enthusiast leveraging GenAI tools to automate deployments, accelerate troubleshooting, and drive operational excellence.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a href="mailto:psanket6.2000@gmail.com">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <Mail className="mr-2 h-4 w-4" /> Connect
              </Button>
            </a>
            {/* Put your resume PDF in the /public folder as resume.pdf */}
            <a href="/resume.pdf" download>
              <Button size="lg" variant="outline" className="rounded-none border-border hover:bg-muted">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden max-w-3xl">
            {STATS.map((s) => (
              <div key={s.label} className="bg-background/80 backdrop-blur p-5">
                <div className="text-3xl md:text-4xl font-bold font-mono text-primary">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Tech marquee                                                        */
/* ------------------------------------------------------------------ */

function TechMarquee() {
  const items: { name: string; icon: ReactNode }[] = [
    { name: "Kubernetes", icon: <SiKubernetes /> },
    { name: "Terraform", icon: <SiTerraform /> },
    { name: "Docker", icon: <SiDocker /> },
    { name: "Helm", icon: <SiHelm /> },
    { name: "GitHub Actions", icon: <SiGithubactions /> },
    { name: "Jenkins", icon: <SiJenkins /> },
    { name: "Prometheus", icon: <SiPrometheus /> },
    { name: "Grafana", icon: <SiGrafana /> },
    { name: "Python", icon: <SiPython /> },
    { name: "Bash", icon: <SiGnubash /> },
    { name: "AWS", icon: <Cloud className="w-5 h-5" /> },
    { name: "Azure", icon: <CloudCog className="w-5 h-5" /> },
  ];
  const loop = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden border-y border-border py-5 bg-card/20 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((t, i) => (
          <div key={`${t.name}-${i}`} className="flex items-center gap-3 text-muted-foreground font-mono text-sm whitespace-nowrap">
            <span className="text-primary text-xl flex items-center">{t.icon}</span>
            {t.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
              <span className="text-primary font-mono mr-3 text-lg">01.</span> About
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                I'm a DevOps &amp; Cloud Engineer with 3+ years of hands-on experience designing, implementing, and managing scalable cloud infrastructure across Microsoft Azure and AWS — certified as an Azure DevOps Engineer and Azure Administrator.
              </p>
              <p>
                My toolkit spans Terraform, Docker, Kubernetes, Jenkins, and GitHub Actions, with strong foundations in cloud networking, security, and microservices architecture. I'm an AI Infrastructure Enthusiast with real-world experience applying Claude AI and GenAI tooling to optimize deployment lifecycles, automate operations, and sharpen incident response.
              </p>
              <p className="text-foreground font-medium">
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
                <p className="text-primary">{">"} initiating scan...</p>
                <p className="text-muted-foreground">[OK] AWS core services loaded</p>
                <p className="text-muted-foreground">[OK] Azure Resource Manager synced</p>
                <p className="text-muted-foreground">[OK] Kubernetes clusters healthy</p>
                <p className="text-muted-foreground">[OK] Terraform state locked</p>
                <p className="text-primary mt-4">{">"} applying GenAI ops layer</p>
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

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

function Skills() {
  const skillCategories = [
    {
      title: "Cloud & Compute",
      icon: <Network className="w-5 h-5 text-primary" />,
      items: [
        { name: "AWS (EC2, S3, EKS, Lambda, Bedrock)", icon: <Cloud className="w-4 h-4" /> },
        { name: "Azure (AKS, ACR, VM, Functions, App Service, VNet)", icon: <CloudCog className="w-4 h-4" /> },
        { name: "Kubernetes", icon: <SiKubernetes /> },
        { name: "Docker & Docker Compose", icon: <SiDocker /> },
      ],
    },
    {
      title: "CI/CD & Pipelines",
      icon: <GitBranch className="w-5 h-5 text-primary" />,
      items: [
        { name: "Jenkins", icon: <SiJenkins /> },
        { name: "GitHub Actions", icon: <SiGithubactions /> },
        { name: "Argo CD / GitOps", icon: <Server className="w-4 h-4" /> },
        { name: "Helm", icon: <SiHelm /> },
      ],
    },
    {
      title: "IaC & Observability",
      icon: <Layers className="w-5 h-5 text-primary" />,
      items: [
        { name: "Terraform", icon: <SiTerraform /> },
        { name: "Bicep (Azure IaC)", icon: <Layers className="w-4 h-4" /> },
        { name: "Prometheus", icon: <SiPrometheus /> },
        { name: "Grafana", icon: <SiGrafana /> },
      ],
    },
    {
      title: "Languages & Databases",
      icon: <Code className="w-5 h-5 text-primary" />,
      items: [
        { name: "Python", icon: <SiPython /> },
        { name: "Bash / Shell Scripting", icon: <SiGnubash /> },
        { name: "MySQL, PostgreSQL, MongoDB", icon: <Database className="w-4 h-4" /> },
        { name: "Redis", icon: <Cpu className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-card/30 border-y border-border relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading num="02" title="Skills & Expertise" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <SpotlightCard className="h-full bg-background border border-border p-6 rounded-xl hover:border-primary/50 transition-colors">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">{cat.icon}</span>
                  <h3 className="font-semibold text-lg">{cat.title}</h3>
                </div>
                <ul className="space-y-4">
                  {cat.items.map((item) => (
                    <li key={item.name} className="flex items-center text-muted-foreground">
                      <span className="w-6 h-6 flex items-center justify-center mr-3 text-primary/80 shrink-0">
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

function Certifications() {
  const certifications = [
    { code: "AZ-900", name: "Azure Fundamentals", issuer: "Microsoft" },
    { code: "AZ-104", name: "Azure Administrator Associate", issuer: "Microsoft" },
    { code: "AZ-400", name: "Azure DevOps Expert", issuer: "Microsoft" },
    { code: "AZ-305", name: "Azure Solutions Architect Expert", issuer: "Microsoft" },
    { code: "GH-200", name: "GitHub Actions", issuer: "Microsoft" },
  ];

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading num="03" title="Certifications" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.code}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <SpotlightCard className="h-full rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="flex items-start p-6">
                  <span className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </span>
                  <div>
                    <p className="font-mono text-primary text-sm">{cert.code}</p>
                    <p className="font-semibold mt-0.5">{cert.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">{cert.issuer}</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

type Project = {
  title: string;
  description: string;
  tech: string[];
  icon: ReactNode;
  featured?: boolean;
};

const MAX_TAGS = 8;

function Projects() {
  const projects: Project[] = [
    {
      title: "AWS Self-Healing Infrastructure with Amazon Bedrock",
      featured: true,
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      description:
        "Event-driven AIOps platform where Amazon Bedrock reasons about incident root cause, but never touches production directly — every recommendation passes a deterministic safety gate before any remediation executes. A single AIOps control plane (CloudWatch → EventBridge → Lambda → Bedrock → Safety Gate → DynamoDB) is architected to work across EC2, EKS, and ECS, with only the remediation adapter swapping underneath (SSM / Kubernetes API / ECS API). On EKS, the design specifically distinguishes routine Pod self-healing from real incidents like CrashLoopBackOff — so AI intervenes only where Kubernetes' own automation falls short.",
      tech: ["Amazon Bedrock", "AWS Lambda", "Amazon EventBridge", "Amazon CloudWatch", "Amazon EKS", "Amazon ECS", "AWS SSM", "Amazon DynamoDB", "Amazon SNS", "Kubernetes API", "FastAPI", "Python", "Terraform"],
    },
    {
      title: "GitOps AKS Deployment Platform",
      icon: <GitBranch className="w-8 h-8 text-primary" />,
      description:
        "Built a production-grade AKS platform serving 150+ microservices using GitOps principles. Provisioned infrastructure with Terraform and Bicep, managed container images via ACR, deployed workloads with Helm and ArgoCD, configured VNet peering and private endpoints, and set up end-to-end observability with Prometheus and Grafana. PostgreSQL and Redis deployed as StatefulSets.",
      tech: ["AKS", "ACR", "Terraform", "Helm", "ArgoCD", "GitOps", "VNet", "Prometheus", "Grafana", "PostgreSQL", "Redis"],
    },
    {
      title: "Kubernetes-based MCP Server for Internal Teams",
      icon: <Terminal className="w-8 h-8 text-primary" />,
      description:
        "Developed an internal MCP (Model Context Protocol) server running on Kubernetes, powered by Claude Sonnet, that gives engineering teams natural-language access to cluster operations — query pod logs, describe deployments, check resource usage, and trigger rollbacks via chat. Reduced mean time to diagnose incidents by 55% and eliminated the need for direct kubectl access for 80% of on-call queries.",
      tech: ["Kubernetes", "Claude Sonnet", "MCP", "Python", "Helm", "RBAC", "AWS Bedrock"],
    },
    {
      title: "Serverless ML Pipeline on AWS",
      icon: <Cpu className="w-8 h-8 text-primary" />,
      description:
        "End-to-end MLOps pipeline using AWS Step Functions, Lambda, SageMaker, and CodePipeline with automated model drift detection and blue/green model swaps.",
      tech: ["AWS Step Functions", "SageMaker", "Python", "CodePipeline"],
    },
  ];

  return (
    <section id="projects" className="py-24 bg-card/30 border-y border-border relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading num="04" title="Featured Projects" />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => {
            const shown = project.tech.slice(0, MAX_TAGS);
            const extra = project.tech.length - shown.length;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={project.featured ? "md:col-span-2" : ""}
              >
                <SpotlightCard
                  className={`h-full bg-background border rounded-xl transition-colors hover:border-primary/50 ${
                    project.featured ? "border-primary/40" : "border-border"
                  }`}
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <span className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        {project.icon}
                      </span>
                      {project.featured && (
                        <span className="text-xs font-mono text-primary border border-primary/30 bg-primary/5 px-3 py-1 rounded-full">
                          ★ Flagship
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {shown.map((t) => (
                        <span key={t} className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded">
                          {t}
                        </span>
                      ))}
                      {extra > 0 && (
                        <span className="text-xs font-mono text-muted-foreground border border-border px-2.5 py-1 rounded">
                          +{extra} more
                        </span>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

const COLLAPSED_BULLETS = 4;

function RoleCard({
  role,
  idx,
}: {
  role: { title: string; company: string; period: string; bullets: string[] };
  idx: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const canCollapse = role.bullets.length > COLLAPSED_BULLETS;
  const visible = expanded || !canCollapse ? role.bullets : role.bullets.slice(0, COLLAPSED_BULLETS);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="relative pl-8"
    >
      {/* timeline dot */}
      <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_currentColor] text-primary" />

      <div className="font-mono text-xs text-primary mb-2">{role.period}</div>
      <h3 className="text-xl md:text-2xl font-bold mb-1">{role.title}</h3>
      <div className="text-muted-foreground font-mono mb-5 text-sm flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-primary" />
        {role.company}
      </div>

      <ul className="space-y-2.5">
        <AnimatePresence initial={false}>
          {visible.map((b) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-muted-foreground leading-relaxed flex items-start gap-2 overflow-hidden"
            >
              <span className="text-primary mt-1.5 shrink-0">
                <ChevronRight className="w-3 h-3" />
              </span>
              {b}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {canCollapse && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-4 inline-flex items-center gap-1 text-sm font-mono text-primary hover:underline focus:outline-none"
        >
          {expanded ? "Show less" : `Show ${role.bullets.length - COLLAPSED_BULLETS} more`}
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </motion.div>
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
        "Containerized applications with Docker and orchestrated on Kubernetes (EKS/AKS) — Pods, Deployments, StatefulSets, Ingress, Services, ConfigMaps, and Secrets across multi-namespace environments.",
        "Implemented Kubernetes RBAC policies, network policies, and resource quotas to enforce least-privilege access and workload isolation across teams.",
        "Managed AWS services including EC2 Auto Scaling, S3 lifecycle policies, IAM roles/policies, VPC networking, ALB, and Route 53 for production workloads.",
        "Set up monitoring and alerting with CloudWatch, Prometheus, Grafana, and Azure Log Analytics.",
        "Authored Python and Bash automation scripts on Rocky Linux, reducing manual operations by 70%.",
        "Collaborated with Dev, QA, and Platform teams to cut release time by 40% and resolve production infrastructure issues.",
      ],
    },
    {
      title: "Software Engineer (Cloud & DevOps)",
      company: "INDSAC Softech — Remote",
      period: "Apr 2023 — Mar 2024",
      bullets: [
        "Developed and maintained Java/Spring Boot applications, working with REST APIs, application configuration, and database integrations in Linux-based environments.",
        "Containerized applications using Docker and Docker Compose, troubleshooting container startup, networking, port-mapping, environment-variable, and application connectivity issues.",
        "Worked with AWS EC2, IAM, S3 and VPC for application hosting, access management, security-group configuration, and network connectivity.",
        "Supported application build and deployment processes through CI/CD, troubleshooting build failures, dependency issues, configuration errors, and environment related problems.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading num="05" title="Experience" />

        <div className="relative border-l border-border space-y-14 ml-1">
          {roles.map((role, idx) => (
            <RoleCard key={role.title + role.company} role={role} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <section id="contact" className="py-32 relative text-center bg-card/30 border-t border-border overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-2xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-primary font-mono mb-4 text-sm">06. What's Next?</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Have a cloud infrastructure challenge, a DevOps automation problem, or just want to talk AWS &amp; Azure architecture? My inbox is open.
          </p>
          <a href="mailto:psanket6.2000@gmail.com">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg shadow-[0_0_30px_rgba(0,240,255,0.25)]"
            >
              <Mail className="mr-2 h-5 w-5" /> Say Hello
            </Button>
          </a>

          <div className="flex justify-center items-center space-x-4 mt-20">
            {[
              { href: "https://github.com/Developer-SANKET", label: "GitHub", icon: <Github className="w-5 h-5" />, external: true },
              { href: "https://www.linkedin.com/in/sanket-patil-a57153173/", label: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, external: true },
              { href: "mailto:psanket6.2000@gmail.com", label: "Email", icon: <Mail className="w-5 h-5" />, external: false },
            ].map((l) => (
              <motion.a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                whileHover={{ y: -3 }}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-colors"
                aria-label={l.label}
              >
                {l.icon}
              </motion.a>
            ))}
          </div>
          <p className="text-muted-foreground/60 text-sm font-mono mt-8">
            psanket6.2000@gmail.com &bull; +91 9922270423 &bull; Pune, Maharashtra
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  // Page title + meta description (works even if index.html isn't edited)
  useEffect(() => {
    document.title = "Sanket Patil — DevOps, Platform & SRE Engineer";
    const desc =
      "DevOps & Cloud Engineer with 3+ years on AWS and Azure. Kubernetes, Terraform, GitOps, CI/CD and AIOps with Amazon Bedrock.";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 selection:text-primary">
        <ScrollProgress />
        <Navbar />
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Experience />
        <Contact />
        <footer className="py-6 text-center text-sm font-mono text-muted-foreground border-t border-border bg-background">
          <p>Built by Sanket Patil &bull; {new Date().getFullYear()}</p>
        </footer>
        <BackToTop />
      </div>
    </MotionConfig>
  );
}
