"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Database,
  Server,
  Send,
  User,
  Briefcase,
  Award,
  Terminal,
  Zap,
  Rocket,
  Star,
  Trophy,
  Sparkles,
  CloudLightning as Lightning,
  Crown,
  ChevronDown,
  Play,
  Pause,
  Settings,
  Calendar,
  MapPin,
  Phone,
  Globe,
  Monitor,
  Palette,
  GitBranch,
  Cloud,
  Wifi,
  Brain,
} from "lucide-react";
import Link from "next/link";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

interface Skill {
  name: string;
  level: number;
  experience: string;
  projects: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface FullStackSkills {
  frontend: Skill[];
  backend: Skill[];
  database: Skill[];
  devops: Skill[];
}

interface DataAISkills {
  machineLearning: Skill[];
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [typedText, setTypedText] = useState("");
  const [currentCodeLine, setCurrentCodeLine] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [particles, setParticles] = useState<Particle[]>([]); // Particles managed for canvas rendering
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeProjectFilter, setActiveProjectFilter] = useState("all");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [currentRole, setCurrentRole] = useState(0);
  const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: boolean }>({});
  const [skillProgress, setSkillProgress] = useState<{ [key: string]: number }>({});
  const [skillsInView, setSkillsInView] = useState(false);

  const codeLines = useMemo(
    () => [
      "const developer = {",
      "  name: 'Elite Code Master',",
      "  level: 'Legendary',",
      "  skills: ['React', 'Node.js', 'AI/ML', '3D Graphics'],",
      "  passion: 'Creating Digital Universes',",
      "  status: 'Ready to Revolutionize'",
      "};",
    ],
    []
  );

  const roles = useMemo(
    () => [
      "Full Stack Architect",
      "AI/ML Specialist",
      "3D Graphics Expert",
      "Cloud Engineer",
      "Tech Innovator",
      "Digital Creator",
    ],
    []
  );

  // Skills data
  const fullStackSkills = useMemo<FullStackSkills>(
    () => ({
      frontend: [
        { name: "React", level: 98, experience: "5+ years", projects: 50, icon: Code, color: "from-blue-400 to-blue-600" },
        { name: "Next.js", level: 95, experience: "4+ years", projects: 35, icon: Monitor, color: "from-gray-400 to-gray-600" },
        { name: "TypeScript", level: 92, experience: "4+ years", projects: 45, icon: Code, color: "from-blue-500 to-blue-700" },
        { name: "Tailwind CSS", level: 90, experience: "3+ years", projects: 40, icon: Palette, color: "from-cyan-400 to-cyan-600" },
        { name: "Vue.js", level: 85, experience: "3+ years", projects: 25, icon: Code, color: "from-green-400 to-green-600" },
        { name: "Angular", level: 80, experience: "2+ years", projects: 15, icon: Code, color: "from-red-400 to-red-600" },
      ],
      backend: [
        { name: "Node.js", level: 95, experience: "5+ years", projects: 45, icon: Server, color: "from-green-500 to-green-700" },
        { name: "Python", level: 88, experience: "4+ years", projects: 30, icon: Server, color: "from-yellow-400 to-yellow-600" },
        { name: "Express.js", level: 92, experience: "4+ years", projects: 40, icon: Server, color: "from-gray-500 to-gray-700" },
        { name: "NestJS", level: 85, experience: "3+ years", projects: 20, icon: Server, color: "from-red-500 to-red-700" },
        { name: "GraphQL", level: 85, experience: "3+ years", projects: 25, icon: Database, color: "from-pink-400 to-pink-600" },
        { name: "REST APIs", level: 95, experience: "5+ years", projects: 50, icon: Wifi, color: "from-blue-500 to-blue-700" },
      ],
      database: [
        { name: "MongoDB", level: 90, experience: "4+ years", projects: 35, icon: Database, color: "from-green-500 to-green-700" },
        { name: "PostgreSQL", level: 88, experience: "4+ years", projects: 30, icon: Database, color: "from-blue-500 to-blue-700" },
        { name: "MySQL", level: 85, experience: "3+ years", projects: 25, icon: Database, color: "from-orange-400 to-orange-600" },
        { name: "Redis", level: 82, experience: "3 years", projects: 20, icon: Database, color: "from-red-500 to-red-700" },
        { name: "Firebase", level: 85, experience: "3+ years", projects: 22, icon: Database, color: "from-yellow-400 to-yellow-600" },
        { name: "Supabase", level: 80, experience: "2+ years", projects: 15, icon: Database, color: "from-green-400 to-green-600" },
      ],
      devops: [
        { name: "Docker", level: 88, experience: "3+ years", projects: 30, icon: Settings, color: "from-blue-400 to-blue-600" },
        { name: "AWS", level: 85, experience: "3+ years", projects: 25, icon: Cloud, color: "from-orange-400 to-orange-600" },
        { name: "Vercel", level: 92, experience: "4+ years", projects: 40, icon: Globe, color: "from-gray-400 to-gray-600" },
        { name: "Git", level: 95, experience: "5+ years", projects: 50, icon: GitBranch, color: "from-orange-500 to-orange-700" },
        { name: "CI/CD", level: 82, experience: "3+ years", projects: 20, icon: Settings, color: "from-purple-400 to-purple-600" },
        { name: "Kubernetes", level: 75, experience: "2+ years", projects: 12, icon: Settings, color: "from-blue-500 to-blue-700" },
      ],
    }),
    []
  );

  const dataAISkills = useMemo<DataAISkills>(
    () => ({
      machineLearning: [
        { name: "TensorFlow", level: 90, experience: "4+ years", projects: 20, icon: Brain, color: "from-purple-500 to-purple-700" },
        { name: "PyTorch", level: 85, experience: "3+ years", projects: 15, icon: Brain, color: "from-red-500 to-red-700" },
        { name: "Scikit-learn", level: 80, experience: "3+ years", projects: 12, icon: Brain, color: "from-blue-500 to-blue-700" },
      ],
    }),
    []
  );

  

  const animateProgressBar = useCallback(
    (skillName: string, targetLevel: number) => {
      let currentLevel = 0;
      const increment = targetLevel / 60;
      const timer = setInterval(() => {
        currentLevel += increment;
        if (currentLevel >= targetLevel) {
          currentLevel = targetLevel;
          clearInterval(timer);
        }
        setSkillProgress((prev) => ({ ...prev, [skillName]: Math.round(currentLevel) }));
      }, 16);
    },
    []
  );

  const animateSkillsSequentially = useCallback(
    (skills: Skill[]) => {
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedSkills((prev) => ({ ...prev, [skill.name]: true }));
          animateProgressBar(skill.name, skill.level);
        }, index * 200);
      });
    },
    [animateProgressBar]
  );

  // Matrix Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;

    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff88";
      ctx.font = `${fontSize}px arial`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, []);

  // Interactive Particle System
  const createParticle = useCallback((x: number, y: number): Particle => {
    const colors = ["#00ff88", "#88ff00", "#ff0088", "#0088ff", "#ff8800", "#8800ff"];
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    };
  }, []);

  const updateParticles = useCallback(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setParticles((prevParticles) => {
      const updatedParticles = prevParticles
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 0.01,
          size: particle.size * 0.99,
        }))
        .filter((particle) => particle.life > 0);

      // Draw particles
      updatedParticles.forEach((particle) => {
        ctx.save();
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      return updatedParticles;
    });

    animationRef.current = requestAnimationFrame(updateParticles);
  }, []);

  useEffect(() => {
    updateParticles();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateParticles]);

  // Mouse tracking and interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (Math.random() < 0.1) {
        setParticles((prev) => [...prev, createParticle(e.clientX, e.clientY)]);
      }
    };

    const handleMouseDown = () => {
      setIsMousePressed(true);
    };

    const handleMouseUp = () => {
      setIsMousePressed(false);
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 15; i++) {
        setParticles((prev) => [...prev, createParticle(e.clientX, e.clientY)]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("click", handleClick);
    };
  }, [createParticle]);

  // Role rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [roles]);

  // Typing Effect
  useEffect(() => {
    let i = 0;
    const currentText = roles[currentRole];
    setTypedText("");

    const timer = setInterval(() => {
      if (i < currentText.length) {
        setTypedText(currentText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentRole, roles]);

  // Code Animation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCodeLine((prev) => (prev + 1) % codeLines.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [codeLines]);

  // Skills Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSkillsRef = skillsRef.current;
    if (currentSkillsRef) {
      observer.observe(currentSkillsRef);
    }

    return () => {
      if (currentSkillsRef) {
        observer.unobserve(currentSkillsRef);
      }
    };
  }, []);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "achievements", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Achievements data
  const achievements = [
    {
      title: "Tech Innovation Award",
      description: "Recognized for groundbreaking AI integration",
      icon: Trophy,
      color: "from-green-400 to-emerald-500",
      year: "2024",
      metric: "99.9%",
      label: "Success Rate",
    },
    {
      title: "Full Stack Mastery",
      description: "Certified expert in modern web technologies",
      icon: Crown,
      color: "from-emerald-400 to-teal-500",
      year: "2023",
      metric: "50+",
      label: "Technologies",
    },
    {
      title: "Open Source Contributor",
      description: "500+ contributions to major projects",
      icon: Star,
      color: "from-teal-400 to-cyan-500",
      year: "2023",
      metric: "500+",
      label: "Contributions",
    },
    {
      title: "Performance Optimization",
      description: "Improved app performance by 300%",
      icon: Lightning,
      color: "from-cyan-400 to-green-500",
      year: "2022",
      metric: "300%",
      label: "Improvement",
    },
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      title: "AI-Powered E-Commerce Platform",
      description: "Revolutionary e-commerce platform with AI-driven recommendations and real-time analytics",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["Next.js", "Node.js", "MongoDB", "TensorFlow.js", "Stripe", "AWS"],
      github: "#",
      live: "#",
      featured: true,
      category: "Full Stack",
      type: "web",
      duration: "6 months",
      team: "Solo Project",
      stats: {
        users: "10K+",
        performance: "99.9%",
        rating: "4.9/5",
        revenue: "$500K+",
        conversion: "15.2%",
      },
      highlights: [
        "AI recommendation engine increased sales by 40%",
        "Real-time inventory sync across multiple channels",
        "Advanced analytics dashboard with 50+ metrics",
        "Mobile-first responsive design",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      title: "Blockchain Voting System",
      description: "Decentralized voting platform with smart contracts and cryptographic security",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["React", "Solidity", "Web3.js", "IPFS", "Ethereum", "Node.js"],
      github: "#",
      live: "#",
      featured: true,
      category: "Blockchain",
      type: "web",
      duration: "8 months",
      team: "3 Developers",
      stats: {
        transactions: "50K+",
        security: "100%",
        uptime: "99.99%",
        voters: "25K+",
        elections: "150+",
      },
      highlights: [
        "Zero security breaches in 2+ years",
        "Transparent and immutable vote counting",
        "Support for multiple election types",
        "Real-time results with verification",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Real-time Collaboration Platform",
      description: "Advanced collaboration platform with live editing and AI-powered insights",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["React", "Socket.io", "Node.js", "MongoDB", "WebRTC", "Docker"],
      github: "#",
      live: "#",
      featured: true,
      category: "Real-time",
      type: "web",
      duration: "10 months",
      team: "5 Developers",
      stats: {
        users: "25K+",
        latency: "<50ms",
        satisfaction: "98%",
        documents: "100K+",
        meetings: "50K+",
      },
      highlights: [
        "Real-time collaborative editing",
        "HD video conferencing",
        "AI-powered project insights",
        "Advanced permission management",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "Healthcare Management System",
      description: "Comprehensive healthcare platform with AI diagnostics and telemedicine",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["Next.js", "Python", "PostgreSQL", "TensorFlow", "AWS", "Docker"],
      github: "#",
      live: "#",
      featured: false,
      category: "Healthcare",
      type: "web",
      duration: "12 months",
      team: "8 Developers",
      stats: {
        patients: "50K+",
        accuracy: "96%",
        appointments: "200K+",
        hospitals: "25+",
        doctors: "500+",
      },
      highlights: [
        "AI-driven diagnostics with 96% accuracy",
        "Integrated telemedicine for 200K+ appointments",
        "Scalable infrastructure for 25+ hospitals",
        "Secure patient data management",
      ],
      color: "from-red-500 to-orange-500",
    },
    {
      id: 5,
      title: "Smart City IoT Dashboard",
      description: "IoT-powered smart city management with predictive analytics",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["Vue.js", "Node.js", "InfluxDB", "MQTT", "AWS IoT", "Python"],
      github: "#",
      live: "#",
      featured: false,
      category: "IoT",
      type: "web",
      duration: "14 months",
      team: "6 Developers",
      stats: {
        sensors: "10K+",
        dataPoints: "1M+/day",
        efficiency: "35%",
        cities: "5",
        alerts: "99.5%",
      },
      highlights: [
        "Real-time monitoring of 10K+ sensors",
        "Predictive analytics for 35% efficiency gains",
        "Support for 5 smart cities",
        "High-reliability alerts with 99.5% uptime",
      ],
      color: "from-teal-500 to-blue-500",
    },
    {
      id: 6,
      title: "Financial Trading Platform",
      description: "High-frequency trading platform with algorithmic trading and risk management",
      image: "/placeholder.svg?height=400&width=600",
      tech: ["React", "Node.js", "Redis", "WebSocket", "PostgreSQL", "Python"],
      github: "#",
      live: "#",
      featured: false,
      category: "FinTech",
      type: "web",
      duration: "9 months",
      team: "4 Developers",
      stats: {
        trades: "1M+",
        latency: "<10ms",
        volume: "$100M+",
        users: "5K+",
        accuracy: "99.8%",
      },
      highlights: [
        "Sub-10ms latency for high-frequency trading",
        "Processed $100M+ in trading volume",
        "99.8% accuracy in algorithmic trading",
        "Robust risk management system",
      ],
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const projectCategories = ["all", "Full Stack", "Blockchain", "Real-time", "Healthcare", "IoT", "FinTech"];

  const filteredProjects =
    activeProjectFilter === "all" ? projects : projects.filter((project) => project.category === activeProjectFilter);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-10" style={{ pointerEvents: "none" }} />
      <canvas ref={particleCanvasRef} className="fixed inset-0 z-10" style={{ pointerEvents: "none" }} />
      <div
        className="fixed w-96 h-96 pointer-events-none z-20 opacity-40"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: `radial-gradient(circle, ${
            isMousePressed
              ? "rgba(0,255,136,0.3) 0%, rgba(136,255,0,0.2) 30%, rgba(255,136,0,0.1) 60%"
              : "rgba(0,255,136,0.2) 0%, rgba(136,255,0,0.1) 50%"
          }, transparent 70%)`,
          borderRadius: "50%",
          transition: "all 0.1s ease-out",
          transform: isMousePressed ? "scale(1.5)" : "scale(1)",
        }}
      />
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-green-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent animate-gradient-x">
              Code Master
            </div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "achievements", "skills", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize font-semibold transition-all duration-300 relative group ${
                    activeSection === section
                      ? "text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {section.replace("-", " ")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
                  {activeSection === section && (
                    <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-green-400 animate-pulse">
                      {"◆"}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <section id="home" className="min-h-screen flex items-center justify-center relative z-30 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-green-400/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-2 border-emerald-400/30 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-32 left-40 w-28 h-28 border-2 border-teal-400/30 rotate-12 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rotate-45 animate-float-delayed"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full px-4 py-2 border border-green-500/30">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Available for Projects</span>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-green-400" /> : <Play className="w-4 h-4 text-green-400" />}
              </button>
            </div>
            <div className="space-y-4">
              <h1 className="text-7xl md:text-8xl font-black leading-none">
                <span className="block text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text animate-gradient-x">
                  CODE
                </span>
                <span
                  className="block text-transparent bg-gradient-to-r from-emerald-400 via-teal-500 to-green-400 bg-clip-text animate-gradient-x"
                  style={{ animationDelay: "0.5s" }}
                >
                  MASTER
                </span>
              </h1>
              <div className="h-16 flex items-center">
                <span className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text">
                  {typedText}
                  <span className="animate-pulse text-green-400 text-5xl">|</span>
                </span>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Crafting the future of technology with{" "}
                <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text font-semibold">
                  revolutionary solutions
                </span>{" "}
                that transcend conventional boundaries.
              </p>
              <div className="grid grid-cols-3 gap-6 py-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">5+</div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">100+</div>
                  <div className="text-gray-400 text-sm">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-400 mb-1">99%</div>
                  <div className="text-gray-400 text-sm">Client Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-400 hover:via-emerald-400 hover:to-teal-400 text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 group"
                onClick={() => scrollToSection("projects")}
              >
                <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                View My Work
                <Sparkles className="w-4 h-4 ml-2 group-hover:animate-spin" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-400 text-green-400 hover:bg-green-400/20 font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 backdrop-blur-sm group"
                onClick={() => scrollToSection("contact")}
              >
                <Zap className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Let&apos;s Connect
              </Button>
            </div>
            <div className="flex space-x-6 pt-8">
              {[
                { icon: Github, href: "#", color: "hover:text-green-400" },
                { icon: Linkedin, href: "#", color: "hover:text-emerald-400" },
                { icon: Mail, href: "#", color: "hover:text-teal-400" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-125 hover:shadow-lg perspective-1000 transform-gpu hover:rotate-y-12`}
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>
          <div className="relative animate-slide-in-right">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30 shadow-2xl perspective-1000 transform-gpu hover:rotate-y-5 transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Terminal className="w-6 h-6 text-green-400" />
                  <span className="text-green-400 font-mono text-lg">elite_developer.js</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-3 font-mono text-sm">
                {codeLines.map((line, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      index === currentCodeLine ? "text-green-400 bg-green-400/10 px-3 py-1 rounded" : "text-gray-400"
                    }`}
                  >
                    <span className="text-gray-600 mr-4">{String(index + 1).padStart(2, "0")}</span>
                    {line}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-green-500/20">
                <div className="flex items-center space-x-2 text-green-400 font-mono text-sm">
                  <span></span>
                  <span className="animate-pulse">Ready to innovate_</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full flex items-center justify-center animate-float">
              <Code className="w-8 h-8 text-green-400" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full flex items-center justify-center animate-float-delayed">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-gray-400 text-sm font-medium">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-green-400 animate-pulse" />
          </div>
        </div>
      </section>
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-gray-900/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text mb-4 animate-gradient-x">
              About Me
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Passionate innovator crafting the future of technology
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {[
                {
                  icon: User,
                  title: "Experience",
                  desc: "5+ years crafting digital excellence",
                  color: "from-green-400 to-emerald-500",
                },
                {
                  icon: Briefcase,
                  title: "Projects",
                  desc: "100+ innovative solutions delivered",
                  color: "from-emerald-400 to-teal-500",
                },
                {
                  icon: Award,
                  title: "Recognition",
                  desc: "Industry certifications & awards",
                  color: "from-teal-400 to-green-500",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-6 group animate-slide-in-left`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-2xl perspective-1000 transform-gpu`}
                  >
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold text-transparent bg-gradient-to-r ${item.color} bg-clip-text`}>
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20 animate-slide-in-right shadow-2xl perspective-1000 transform-gpu hover:rotate-y-5 transition-all duration-500">
              <div className="mb-6 flex items-center space-x-3">
                <Terminal className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-mono text-lg">developer_profile.json</span>
                <div className="flex space-x-1 ml-auto">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-4 text-gray-300 font-mono">
                <p className="text-lg leading-relaxed">
                  <span className="text-green-400"></span> Elite full-stack developer with a passion for creating{" "}
                  <span className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text font-semibold">
                    revolutionary digital experiences
                  </span>.
                </p>
                <p className="text-lg leading-relaxed">
                  <span className="text-green-400"></span> Specialized in modern web technologies, AI integration,
                  and scalable cloud solutions.
                </p>
                <p className="text-lg leading-relaxed">
                  <span className="text-green-400"></span> From concept to deployment, I transform complex
                  challenges into elegant solutions.
                </p>
                <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                  <p className="text-green-400 font-mono">
                    <span className="text-emerald-400"></span> Status: Available for groundbreaking projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Achievements achievements={achievements} />
      <Skills
        skills={{ fullStack: fullStackSkills, dataAI: dataAISkills }}
        skillsRef={skillsRef}
        animatedSkills={animatedSkills}
        skillProgress={skillProgress}
        skillsInView={skillsInView}
        animateSkillsSequentially={animateSkillsSequentially}
      />
      <Projects
        projects={filteredProjects}
        categories={projectCategories}
        activeFilter={activeProjectFilter}
        setActiveFilter={setActiveProjectFilter}
      />
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/10 to-black relative z-10 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 bg-clip-text mb-6 animate-gradient-x">
              LET&apos;S CONNECT
            </h2>
            <p className="text-gray-300 text-2xl max-w-4xl mx-auto leading-relaxed">
              Ready to bring your vision to life? Let&apos;s create something extraordinary together
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 animate-slide-in-left">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
                  <User className="w-8 h-8 text-green-400 mr-3" />
                  Get In Touch
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 group">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Email</h4>
                      <p className="text-green-400 font-medium">hello@codemaster.dev</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 group">
                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Phone</h4>
                      <p className="text-emerald-400 font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 group">
                    <div className="w-14 h-14 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Location</h4>
                      <p className="text-teal-400 font-medium">San Francisco, CA</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 group">
                    <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Availability</h4>
                      <p className="text-cyan-400 font-medium">Available for new projects</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700/50">
                  <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    {[
                      { icon: Github, href: "#", color: "hover:text-green-400", bg: "hover:bg-green-400/20" },
                      { icon: Linkedin, href: "#", color: "hover:text-emerald-400", bg: "hover:bg-emerald-400/20" },
                      { icon: Mail, href: "#", color: "hover:text-teal-400", bg: "hover:bg-teal-400/20" },
                    ].map((social, index) => (
                      <Link
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 ${social.color} ${social.bg} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                      >
                        <social.icon className="w-6 h-6" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl perspective-1000 transform-gpu hover:rotate-y-5 transition-all duration-500 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 border-b border-gray-600/50">
                  <div className="flex items-center space-x-3">
                    <Terminal className="w-6 h-6 text-green-400" />
                    <span className="text-green-400 font-mono text-lg">contact_form.tsx</span>
                    <div className="flex space-x-2 ml-auto">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="animate-slide-in-left">
                        <label className="block text-green-400 text-sm font-semibold mb-3 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Name
                        </label>
                        <Input
                          placeholder="Your full name"
                          className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20 h-12 text-lg rounded-xl"
                        />
                      </div>
                      <div className="animate-slide-in-right">
                        <label className="block text-emerald-400 text-sm font-semibold mb-3 flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 h-12 text-lg rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                      <label className="block text-teal-400 text-sm font-semibold mb-3 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Project Type
                      </label>
                      <select className="w-full bg-gray-800/50 border border-gray-600 text-white focus:border-teal-400 focus:ring-teal-400/20 h-12 text-lg rounded-xl px-4">
                        <option value="">Select project type</option>
                        <option value="web-app">Web Application</option>
                        <option value="mobile-app">Mobile Application</option>
                        <option value="ecommerce">E-commerce Platform</option>
                        <option value="blockchain">Blockchain Solution</option>
                        <option value="ai-ml">AI/ML Integration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                      <label className="block text-cyan-400 text-sm font-semibold mb-3 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Timeline
                      </label>
                      <select className="w-full bg-gray-800/50 border border-gray-600 text-white focus:border-cyan-400 focus:ring-cyan-400/20 h-12 text-lg rounded-xl px-4">
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="3-months">Within 3 months</option>
                        <option value="6-months">Within 6 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                    <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                      <label className="block text-green-400 text-sm font-semibold mb-3 flex items-center">
                        <Terminal className="w-4 h-4 mr-2" />
                        Project Details
                      </label>
                      <Textarea
                        placeholder="Tell me about your project vision, requirements, and goals..."
                        rows={6}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20 text-lg rounded-xl"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-400 hover:via-emerald-400 hover:to-teal-400 text-white font-bold py-4 text-lg rounded-xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 group"
                    >
                      <Send className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                      Launch Project Discussion
                      <Rocket className="w-5 h-5 ml-2 group-hover:animate-pulse" />
                    </Button>
                  </form>
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                    <p className="text-green-400 font-mono text-sm flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      <span className="text-emerald-400"></span> Typical response time: Within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-lg mb-4">
            © {new Date().getFullYear()} Code Master | Crafted with passion and innovation
          </p>
          <div className="text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text font-mono">
             Building the future, one line of code at a time
          </div>
        </div>
      </footer>
    </div>
  );
}