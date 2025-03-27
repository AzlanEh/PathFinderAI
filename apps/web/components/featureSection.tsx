import React from "react";
import { useId } from "react";

export function FeaturesSectionDemo() {
  return (
    <div className="py-20 lg:py-40 px-4 bg-[#0a0f18]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {grid.map((feature) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b from-[#0a0f18] to-[#131a24] p-8 rounded-2xl overflow-hidden border border-[#1a202c] hover:border-[#2dd4bf] transition-all duration-300 group"
          >
            <Grid size={24} />
            <p className="text-xl font-bold text-[#e3e3e3] mb-4 relative z-20 group-hover:text-[#2dd4bf] transition-colors">
              {feature.title}
            </p>
            <p className="text-[#8a9bb3] text-base leading-relaxed relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = [
  {
    title: "Personalized Learning Experience",
    description:
      "AI-Powered Assessments: Adaptive assessments that analyze learners' strengths, weaknesses, and learning styles",
  },
  {
    title: "Skill-Based and Practical Learning",
    description:
      "Skill Development Modules: Focus on critical thinking, problem-solving, and digital skills for future employability.",
  },
  {
    title: "Reducing Inequalities",
    description: "Scholarships and Mentorships",
  },
  {
    title: "Gamification ",
    description:
      "Quizzes and Challenges: Interactive quizzes and challenges to reinforce learning",
  },
  {
    title: "Motivation",
    description:
      "Badges and Certificates: Recognize achievements and build motivation",
  },
  {
    title: "Data-Driven Insights",
    description:
      "Analytics for Educators: Track learning patterns, attendance, and progress for personalized interventions",
  },
];

export const Grid = ({ size }: { size?: number }) => {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-[#0a0f18]/50 to-[#0a0f18]/30 opacity-80">
        <GridPattern
          width={size ?? 24}
          height={size ?? 24}
          x="-12"
          y="4"
          className="absolute inset-0 h-full w-full fill-[#1a202c] stroke-[#1a202c]/50"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, ...props }: any) {
  const patternId = useId();
  const squares = [
    [3, 1],
    [7, 2],
    [5, 4],
    [2, 5],
    [8, 3],
    [4, 6],
    [6, 7],
    [1, 8],
    [9, 9],
  ];

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            width={width + 1}
            height={height + 1}
            x={x * width}
            y={y * height}
            fill="none"
            strokeWidth="2"
          />
        ))}
      </svg>
    </svg>
  );
}
