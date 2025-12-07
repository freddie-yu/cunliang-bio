import { Github, Twitter, Linkedin } from 'lucide-react';

export const userProfile = {
  name: "Cunliang Yu",
  role: "Freelance Full-Stack Developer / ML Engineer",
  prev_role: "Digital Developer @ Redsteps | Researcher @ AIML",
  avatar_url: "https://postimg.cc/8JLVQ2s1",
  bio: "Full-stack developer with a foundation in machine learning, cloud deployment, and scalable web systems.",
  story: `I have a cross-disciplinary background in web development, machine learning research, and data-driven product design.
My dedication includes creating performant, scalable and intelligent digital experiences, combining my engineering and 
research mindset to solve real-world problems with clean code and thoughtful design.`,
  quote: "Build systems that feel simple, but run with intelligence.",
  email: "cunliangyu19@gmail.com",
  socials: [
    { name: "GitHub", url: "https://github.com/freddie-yu", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/cunliang-yu-5b559716a", icon: Linkedin }
  ],

  status: [
    {
      label: "Location",
      value: "Shanghai, China"
    },
    {
      label: "Working On",
      value: "Full-stack apps, ML pipelines, and scalable web platforms"
    },
    {
      label: "Interests",
      value: "AI, cloud services, dev tooling, game development"
    }
  ]
};

export const skills = [
  {
    title: "Languages",
    items: ["Python", "Java", "PHP", "JavaScript", "TypeScript", "SQL"]
  },
  {
    title: "Frameworks",
    items: ["React", "Django", "Node.js", "Express", "TensorFlow"]
  },
  {
    title: "Tools",
    items: ["Git", "CPanel", "Google Analytics", "Vite", "Docker"]
  },
  {
    title: "Specialties",
    items: ["Backend APIs", "Full-stack Architecture", "ML Experimentation", "SEO Optimization"]
  }
];

export const experiences = [
  {
    title: "Digital Developer",
    company: "Redsteps Consulting Pty Ltd",
    period: "Jul 2022 – Sep 2023",
    description: [
      "Developed and maintained commercial client websites using WordPress, PHP, JS, HTML/CSS.",
      "Optimized SEO and site performance, boosting organic traffic by up to 40% for key clients.",
      "Implemented schema markup, technical SEO audits, and site structure enhancements.",
      "Handled CPanel operations including domain config, server tuning, and backups.",
      "Improved UI responsiveness and reduced load times across multi-device interfaces."
    ],
    tech: ["WordPress", "PHP", "HTML/CSS", "JavaScript", "MySQL", "Google Analytics", "CPanel", "Git"]
  },
  {
    title: "Research Assistant",
    company: "Australian Institute for Machine Learning",
    period: "Sept 2021 – Jun 2022",
    description: [
      "Built a complete competition platform for visual place recognition benchmarking.",
      "Automated submission scoring, ranking visualization, and dataset processing.",
      "Designed React-based front-end + Django backend with RESTful pipelines.",
      "Unified data flows improved collaboration speed for 10+ research groups."
    ],
    tech: ["Django", "React", "Python", "REST API", "TensorFlow", "Linux", "GitHub"]
  }
];

export const projects = [
  {
    title: "Place Recognition Challenge Platform",
    description: "A full end-to-end competition platform for research teams to upload, evaluate, and benchmark visual place recognition algorithms.",
    tags: ["Django", "React", "Machine Learning", "Full-Stack"],
    link: "https://github.com/freddie-yu/Place_Recognition_Challenge_Platform",
    color: "bg-blue-100"
  },

  {
    title: "Unity Narrative Puzzle Game",
    description: "A story-driven mobile puzzle game blending narrative design and mini-game mechanics.",
    tags: ["Unity", "C#", "Game Dev"],
    link: "https://github.com/freddie-yu",
    color: "bg-pink-100"
  }
];
