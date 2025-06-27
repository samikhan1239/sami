"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Code,
  Database,
  Server,
  Settings,
  Brain,
} from "lucide-react";

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

interface Category {
  name: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  skills: Skill[];
}

interface SkillsProps {
  skills: {
    fullStack: FullStackSkills;
    dataAI: DataAISkills;
  };
  skillsRef: React.RefObject<HTMLDivElement>;
  animatedSkills: { [key: string]: boolean };
  skillProgress: { [key: string]: number };
  skillsInView: boolean;
  animateSkillsSequentially: (skills: Skill[]) => void;
}

export default function Skills({
  skills,
  skillsRef,
  animatedSkills,
  skillProgress,
  skillsInView,
  animateSkillsSequentially,
}: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo<Category[]>(
    () => [
      {
        name: "frontend",
        label: "Frontend",
        icon: Code,
        color: "from-green-400 to-emerald-500",
        description: "User Interface & Experience",
        skills: skills.fullStack.frontend,
      },
      {
        name: "backend",
        label: "Backend",
        icon: Server,
        color: "from-emerald-400 to-teal-500",
        description: "Server & API Development",
        skills: skills.fullStack.backend,
      },
      {
        name: "database",
        label: "Database",
        icon: Database,
        color: "from-teal-400 to-cyan-500",
        description: "Data Management & Storage",
        skills: skills.fullStack.database,
      },
      {
        name: "devops",
        label: "DevOps",
        icon: Settings,
        color: "from-cyan-400 to-blue-500",
        description: "Deployment & Infrastructure",
        skills: skills.fullStack.devops,
      },
      {
        name: "machineLearning",
        label: "Machine Learning & AI",
        icon: Brain,
        color: "from-purple-400 to-purple-600",
        description: "Artificial Intelligence & Data Processing",
        skills: skills.dataAI.machineLearning,
      },
    ],
    [skills]
  );

  useEffect(() => {
    const currentSkillsRef = skillsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && activeCategory) {
            const selectedCategory = categories.find((cat) => cat.name === activeCategory);
            if (selectedCategory) {
              animateSkillsSequentially(selectedCategory.skills);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentSkillsRef) {
      observer.observe(currentSkillsRef);
    }

    return () => {
      if (currentSkillsRef) {
        observer.unobserve(currentSkillsRef);
      }
    };
  }, [skillsRef, activeCategory, animateSkillsSequentially, categories]);

  const handleCategoryClick = (categoryName: string, skills: Skill[]) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
      if (skillsInView) {
        animateSkillsSequentially(skills);
      }
    }
  };

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900/20 to-black relative z-10 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-green-400/10 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-7xl md:text-9xl font-black text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text mb-8 animate-gradient-x relative">
            SKILLS
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-500 animate-shimmer"></div>
          </h2>
          <p className="text-gray-300 text-2xl max-w-4xl mx-auto leading-relaxed">
            Mastery of modern web development, AI, and data science technologies
          </p>
        </div>

        {categories.map((category) => (
          <div key={category.name} className="mb-12">
            <button
              onClick={() => handleCategoryClick(category.name, category.skills)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCategoryClick(category.name, category.skills);
                }
              }}
              aria-expanded={activeCategory === category.name}
              aria-controls={`skills-${category.name}`}
              className={`flex items-center space-x-4 w-full p-6 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                activeCategory === category.name
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-${category.color.split(" ")[1]}/25`
                  : "bg-gray-800/50 hover:bg-gray-700/50"
              }`}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center`}
              >
                <category.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3
                  className={`text-4xl font-black ${
                    activeCategory === category.name
                      ? "text-white"
                      : "text-transparent bg-gradient-to-r bg-clip-text"
                  } ${category.color}`}
                >
                  {category.label.toUpperCase()}
                </h3>
                <p className="text-gray-400">{category.description}</p>
              </div>
            </button>

            {activeCategory === category.name && (
              <div id={`skills-${category.name}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {category.skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`group relative bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-${category.color.split(" ")[1]}/50 transition-all duration-500 hover:scale-105 ${
                      animatedSkills[skill.name] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      transition: "all 0.6s ease-out",
                      transitionDelay: animatedSkills[skill.name] ? "0s" : `${index * 0.1}s`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <skill.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                            {skill.name}
                          </h4>
                          <p className="text-sm text-gray-400">{skill.experience}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400 tabular-nums">
                          {skillProgress[skill.name] || 0}%
                        </div>
                        <div className="text-xs text-gray-400">{skill.projects} projects</div>
                      </div>
                    </div>

                    <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                        style={{ width: `${skillProgress[skill.name] || 0}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg transition-all duration-1000 ease-out"
                        style={{ left: `${Math.max(0, (skillProgress[skill.name] || 0) - 1)}%` }}
                      />
                    </div>

                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}