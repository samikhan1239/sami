"use client";

import { useMemo } from "react";
import { Trophy, Crown, Star, CloudLightning as Lightning } from "lucide-react";

interface Achievement {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  year: string;
  metric: string;
  label: string;
}

interface AchievementsProps {
  achievements?: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps = {}) {
  // Default achievements data if not provided via props
  const defaultAchievements: Achievement[] = [
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

  const achievementList = achievements || defaultAchievements;

  // Memoize achievement cards to prevent unnecessary re-renders
  const achievementCards = useMemo(
    () =>
      achievementList.map((achievement, index) => (
        <div
          key={achievement.title}
          className="group relative animate-fade-in-up"
          style={{ animationDelay: `${index * 0.2}s` }}
          role="article"
          aria-labelledby={`achievement-title-${index}`}
        >
          {/* Main Achievement Container */}
          <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-green-500/50 transition-all duration-500 shadow-2xl transform-gpu hover:scale-105 overflow-hidden">
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Floating Particles */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div
              className="absolute top-8 right-8 w-1 h-1 bg-emerald-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-6 right-12 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Icon with Animation */}
            <div className="relative z-10 mb-8">
              <div
                className={`w-24 h-24 bg-gradient-to-r ${achievement.color} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-500 shadow-2xl relative overflow-hidden`}
              >
                <achievement.icon className="w-12 h-12 text-white relative z-10" />
                {/* Animated Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {/* Pulsing Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Metric Display */}
            <div className="relative z-10 text-center mb-6">
              <div
                className="text-4xl font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text mb-2 animate-pulse"
                aria-label={`${achievement.metric} ${achievement.label}`}
              >
                {achievement.metric}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">{achievement.label}</div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <h3
                id={`achievement-title-${index}`}
                className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300"
              >
                {achievement.title}
              </h3>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">{achievement.description}</p>

              {/* Year Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 text-green-300 text-sm font-semibold">
                <Star className="w-3 h-3 mr-2" />
                {achievement.year}
              </div>
            </div>

            {/* Animated Progress Ring */}
            <div className="absolute top-6 left-6 w-12 h-12 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-gray-700"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${125 * (index + 1) * 0.25} 125`}
                  className="text-green-400 animate-pulse"
                />
              </svg>
            </div>
          </div>

          {/* Floating Achievement Number */}
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-2xl animate-bounce-slow">
            {index + 1}
          </div>
        </div>
      )),
    [achievementList]
  );

  return (
    <section
      id="achievements"
      className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden"
      aria-labelledby="achievements-heading"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2
            id="achievements-heading"
            className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-emerald-400 via-teal-500 to-green-400 bg-clip-text mb-6 animate-gradient-x"
          >
            ACHIEVEMENTS
          </h2>
          <p className="text-gray-300 text-2xl max-w-3xl mx-auto">Milestones in my journey of innovation</p>
        </div>

        {achievementList.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            No achievements to display at this time.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="region" aria-live="polite">
            {achievementCards}
          </div>
        )}
      </div>
    </section>
  );
}