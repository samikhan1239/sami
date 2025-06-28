"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  Clock,
  Eye,
  ExternalLink,
  Github,
  Layers,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  live: string;
  featured: boolean;
  categories: string[];
  type: string;
  duration: string;
  team: string;
  stats: {
    [key: string]: string | undefined;
  };
  highlights: string[];
  color: string;
}

interface ProjectsProps {
  projects: Project[];
  categories: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function Projects({ projects, activeFilter, setActiveFilter }: ProjectsProps) {
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    } else if (activeFilter === "Full Stack") {
      return projects.filter(
        (project) =>
          project.categories.includes("Full Stack") &&
          !project.categories.every((cat) => cat === "Animated" || cat === "Frontend")
      );
    } else if (activeFilter === "Real World") {
      const allowedTitles = ["Warsi Homeopathic Clinic", "Love Sync", "My Tiffin Hub"];
      return projects.filter((project) => allowedTitles.includes(project.title));
    } else if (activeFilter === "Machine Learning") {
      return projects.filter((project) => project.title === "Stay Finder");
    } else if (activeFilter === "Frontend") {
      return projects.filter(
        (project) =>
          project.categories.includes("Frontend") ||
          project.categories.includes("Animated") ||
          project.title === "Freelancer Website"
      );
    } else if (activeFilter === "Animated") {
      return projects.filter(
        (project) =>
          project.categories.includes("Animated") || project.title === "Freelancer Website"
      );
    }
    return projects.filter((project) => project.categories.includes(activeFilter));
  }, [projects, activeFilter]);

  const projectCategories = ["All", "Full Stack", "Real World", "Machine Learning", "Frontend", "Animated"];

  return (
    <section
      id="projects"
      className="py-32 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2
            id="projects-heading"
            className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-green-400 via-teal-500 to-emerald-400 bg-clip-text mb-6 animate-gradient-x"
          >
            FEATURED PROJECTS
          </h2>
          <p className="text-gray-300 text-2xl max-w-4xl mx-auto leading-relaxed">
            Innovative solutions that push the boundaries of technology
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16" role="tablist" aria-label="Project Categories">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveFilter(category);
                }
              }}
              role="tab"
              aria-selected={activeFilter === category}
              aria-controls="project-grid"
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                activeFilter === category
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div id="project-grid" className="space-y-32" role="region" aria-live="polite">
          {filteredProjects.length === 0 ? (
            <div className="text-center text-gray-400 text-lg">
              No projects found for the selected category.
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`relative group ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative rounded-3xl shadow-2xl">
                    <Image
                      src={project.image || "/placeholder.svg?height=400&width=600"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-90 object-contain transition-transform duration-700"
                    />

                    <div className="absolute top-6 right-6 flex space-x-3">
                      {project.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30 animate-pulse">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge
                        className={`bg-gradient-to-r ${project.color} bg-opacity-20 text-white border border-white/30`}
                      >
                        {project.categories[0]}
                      </Badge>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(project.stats)
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <div
                              key={key}
                              className="bg-black/60 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center"
                            >
                              <div className="text-white font-bold text-sm sm:text-lg">{value || "N/A"}</div>
                              <div className="text-gray-300 text-xs capitalize">{key}</div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <div className="flex space-x-4">
                        {/* Eye Icon: Navigates to live demo (external link) */}
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-green-500/80 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <Eye className="w-6 h-6" />
                        </a>
                        {/* GitHub Icon: Navigates to GitHub repository (external link) */}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-gray-800/80 rounded-full flex items-center justify-center text-green-400 hover:scale-110 transition-all duration-300 shadow-lg"
                          aria-label={`View GitHub repository for ${project.title}`}
                        >
                          <Github className="w-6 h-6" />
                        </a>
                        {/* ExternalLink Icon: Navigates to project details (internal route) */}
                        <Link
                          href={`/projects/${project.id}`}
                          className="w-14 h-14 bg-emerald-500/80 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg"
                          aria-label={`View details for ${project.title}`}
                        >
                          <ExternalLink className="w-6 h-6" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-r ${project.color} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl animate-float`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <div
                  className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
                  style={{ animationDelay: `${index * 0.2 + 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 bg-gradient-to-r ${project.color} rounded-full animate-pulse`}
                      ></div>
                      <span className="text-gray-400 font-medium">{project.categories[0]} Project</span>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">{project.title}</h3>

                    <p className="text-xl text-gray-300 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-green-400" />
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
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <Layers className="w-5 h-5 mr-2 text-teal-400" />
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={tech}
                          className={`bg-gradient-to-r ${project.color} bg-opacity-20 text-white border border-white/20 hover:scale-105 transition-transform duration-300`}
                          style={{ animationDelay: `${techIndex * 0.1}s` }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-cyan-400" />
                      Key Achievements
                    </h4>
                    <div className="space-y-3">
                      {project.highlights.slice(0, 3).map((highlight, highlightIndex) => (
                        <div
                          key={highlightIndex}
                          className="flex items-start space-x-3 group"
                          style={{ animationDelay: `${highlightIndex * 0.1}s` }}
                        >
                          <div
                            className={`w-2 h-2 bg-gradient-to-r ${project.color} rounded-full mt-2 group-hover:scale-150 transition-transform duration-300`}
                          ></div>
                          <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    {/* View Case Study: Internal navigation */}
                    <Link
                      href={`/projects/${project.id}`}
                      className={`bg-gradient-to-r ${project.color} hover:shadow-lg hover:shadow-green-500/25 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 flex items-center group`}
                      aria-label={`View case study for ${project.title}`}
                    >
                      View Case Study
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    {/* Live Demo: External link */}
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-gray-600 text-gray-300 hover:border-white hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 flex items-center group"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-20">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-400 hover:via-emerald-400 hover:to-teal-400 text-white font-bold py-4 px-12 rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 group"
            aria-label="Explore all projects"
          >
            <Briefcase className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Explore All Projects
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
}
