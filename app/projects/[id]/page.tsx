
"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Users,
  Award,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Download,
  Share,
  Heart,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProjectDetails() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = useParams() // Unused due to mock data; will be used for API fetching in production

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock project data - in real app, fetch from API
  const project = {
    id: 1,
    title: "AI-Powered E-Commerce Platform",
    description:
      "Full-stack e-commerce platform with AI-driven product recommendations, real-time inventory management, and advanced analytics dashboard.",
    longDescription:
      "This comprehensive e-commerce platform represents the cutting edge of online retail technology. Built with a modern tech stack, it combines the power of artificial intelligence with seamless user experience design to create a platform that not only serves customers but anticipates their needs. The AI recommendation engine analyzes user behavior, purchase history, and browsing patterns to suggest products with unprecedented accuracy, resulting in a 40% increase in sales conversion rates.",
    image: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "TensorFlow.js", "Stripe", "AWS", "Redis", "Docker"],
    github: "#",
    live: "#",
    featured: true,
    category: "Full Stack",
    duration: "6 months",
    team: "Solo Project",
    client: "TechCorp Solutions",
    year: "2024",
    status: "Completed",
    stats: {
      users: "10K+",
      performance: "99.9%",
      rating: "4.9/5",
      revenue: "$500K+",
      conversion: "15.2%",
      pageSpeed: "95/100",
      uptime: "99.98%",
      transactions: "50K+",
    },
    highlights: [
      "AI recommendation engine increased sales by 40%",
      "Real-time inventory sync across multiple channels",
      "Advanced analytics dashboard with 50+ metrics",
      "Mobile-first responsive design with PWA capabilities",
      "Integrated payment processing with multiple gateways",
      "Multi-language and multi-currency support",
      "Advanced search with filters and sorting",
      "Customer review and rating system",
    ],
    challenges: [
      {
        title: "Real-time Inventory Synchronization",
        description:
          "Implementing a system that could sync inventory across multiple sales channels in real-time while handling high traffic volumes.",
        solution:
          "Developed a microservices architecture with Redis for caching and WebSocket connections for real-time updates.",
      },
      {
        title: "AI Model Optimization",
        description:
          "Ensuring the recommendation engine could provide accurate suggestions with sub-second response times.",
        solution:
          "Implemented TensorFlow.js for client-side inference and created a hybrid model that balances accuracy with performance.",
      },
      {
        title: "Scalability for High Traffic",
        description: "Building a platform that could handle 10K+ concurrent users during peak shopping periods.",
        solution:
          "Utilized AWS auto-scaling, CDN distribution, and implemented efficient caching strategies throughout the application.",
      },
    ],
    features: [
      {
        title: "AI-Powered Recommendations",
        description: "Machine learning algorithms analyze user behavior to suggest relevant products",
        icon: "🤖",
      },
      {
        title: "Real-time Analytics",
        description: "Comprehensive dashboard with live sales data, user metrics, and performance insights",
        icon: "📊",
      },
      {
        title: "Multi-channel Integration",
        description: "Seamless integration with social media platforms and third-party marketplaces",
        icon: "🔗",
      },
      {
        title: "Advanced Search",
        description: "Intelligent search with auto-complete, filters, and visual search capabilities",
        icon: "🔍",
      },
      {
        title: "Mobile-First Design",
        description: "Progressive Web App with offline capabilities and native app-like experience",
        icon: "📱",
      },
      {
        title: "Secure Payments",
        description: "PCI-compliant payment processing with support for multiple payment methods",
        icon: "💳",
      },
    ],
    timeline: [
      {
        phase: "Discovery & Planning",
        duration: "2 weeks",
        description: "Requirements gathering, technical architecture design, and project planning",
        status: "completed",
      },
      {
        phase: "Backend Development",
        duration: "8 weeks",
        description: "API development, database design, and core business logic implementation",
        status: "completed",
      },
      {
        phase: "Frontend Development",
        duration: "10 weeks",
        description: "User interface design, component development, and responsive implementation",
        status: "completed",
      },
      {
        phase: "AI Integration",
        duration: "6 weeks",
        description: "Machine learning model development and recommendation engine implementation",
        status: "completed",
      },
      {
        phase: "Testing & Optimization",
        duration: "4 weeks",
        description: "Performance optimization, security testing, and user acceptance testing",
        status: "completed",
      },
      {
        phase: "Deployment & Launch",
        duration: "2 weeks",
        description: "Production deployment, monitoring setup, and go-live support",
        status: "completed",
      },
    ],
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  // Code Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()+-=[]{}|;:,.<>?".split("")
    const fontSize = 12
    const columns = canvas.width / fontSize
    const drops: number[] = Array(Math.floor(columns)).fill(0)

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#00ff88"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Code Rain Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-10"
        style={{ pointerEvents: "none" }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-green-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              href="/"
              className="flex items-center space-x-3 text-green-400 hover:text-green-300 transition-colors duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-semibold">Back to Portfolio</span>
            </Link>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent animate-gradient-x">
              {"<CodeMaster />"}
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-green-400 text-green-400 hover:bg-green-400/20"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-400 text-emerald-400 hover:bg-emerald-400/20"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Project Header */}
          <div className="mb-16">
            <div className="flex items-center space-x-4 mb-6">
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30">
                {project.category}
              </Badge>
              <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30">
                {project.status}
              </Badge>
              {project.featured && (
                <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30">
                  <Award className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text mb-6 animate-gradient-x">
              {project.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mb-8">{project.description}</p>

            {/* Project Meta */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-sm text-gray-400">Duration</div>
                  <div className="font-semibold text-white">{project.duration}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-sm text-gray-400">Team</div>
                  <div className="font-semibold text-white">{project.team}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-teal-400" />
                <div>
                  <div className="text-sm text-gray-400">Client</div>
                  <div className="font-semibold text-white">{project.client}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-sm text-gray-400">Year</div>
                  <div className="font-semibold text-white">{project.year}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 group"
              >
                <ExternalLink className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                View Live Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-400 text-green-400 hover:bg-green-400/20 font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300 backdrop-blur-sm group"
              >
                <Github className="w-5 h-5 mr-2 group-hover:animate-spin" />
                View Source Code
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/20 font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300 backdrop-blur-sm group"
              >
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download Case Study
              </Button>
            </div>
          </div>

          {/* Project Images */}
          <div className="mb-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
              <Image
                src={project.images[activeImageIndex] || "/placeholder.svg"}
                alt={`${project.title} - Image ${activeImageIndex + 1}`}
                width={1200}
                height={600}
                className="w-full h-96 md:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                    activeImageIndex === index
                      ? "ring-2 ring-green-400 scale-105"
                      : "hover:scale-105 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Thumbnail ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Project Stats */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
              <TrendingUp className="w-8 h-8 text-green-400 mr-3" />
              Project Impact
            </h2>
            <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-6">
              {Object.entries(project.stats).map(([key, value], index) => (
                <div
                  key={key}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-500 hover:scale-105 text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl font-bold text-green-400 mb-2">{value}</div>
                  <div className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
              <Zap className="w-8 h-8 text-emerald-400 mr-3" />
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-4">
              {project.tech.map((tech, index) => (
                <Badge
                  key={tech}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30 text-lg py-2 px-4 hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">Project Overview</h2>
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
              <p className="text-lg text-gray-300 leading-relaxed">{project.longDescription}</p>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
              <CheckCircle className="w-8 h-8 text-teal-400 mr-3" />
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-teal-500/50 transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mr-3" />
              Challenges & Solutions
            </h2>
            <div className="space-y-8">
              {project.challenges.map((challenge, index) => (
                <div
                  key={challenge.title}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">{challenge.title}</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-3">Challenge</h4>
                      <p className="text-gray-300">{challenge.description}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-3">Solution</h4>
                      <p className="text-gray-300">{challenge.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Timeline */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
              <Calendar className="w-8 h-8 text-cyan-400 mr-3" />
              Development Timeline
            </h2>
            <div className="space-y-6">
              {project.timeline.map((phase, index) => (
                <div
                  key={phase.phase}
                  className="flex items-start space-x-6"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">{phase.phase}</h3>
                      <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30">
                        {phase.duration}
                      </Badge>
                    </div>
                    <p className="text-gray-300">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50">
              <h2 className="text-4xl font-bold text-white mb-6">Interested in Similar Work?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Let&apos;s discuss how I can help bring your vision to life with cutting-edge technology and innovative
                solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-400 hover:via-emerald-400 hover:to-teal-400 text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50"
                >
                  Start Your Project
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-400 text-green-400 hover:bg-green-400/20 font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  View More Projects
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
