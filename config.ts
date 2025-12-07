import { Github, Twitter, Linkedin } from 'lucide-react';

export const userProfile = {
  name: "Cunliang Yu",
  role: "Full Stack Developer",
  prev_role: "Digital Developer",
  avatar_url: "https://ui-avatars.com/api/?name=Cunliang+Yu&background=0D8ABC&color=fff&size=256",
  bio: "Building scalable web applications with modern technologies. Specialized in full-stack development with React, Django, and performance optimization.",
  story: "I'm a full-stack developer with a Master's degree from the Australian Institute for Machine Learning, where I developed competition platforms for computer vision research. With professional experience at Redsteps Consulting, I've delivered high-performance web solutions that increased organic traffic by up to 40% and improved search rankings by 30% through technical SEO and optimization. I'm passionate about building efficient, user-centric applications that solve real-world problems while maintaining clean, maintainable code architecture.",
  quote: "Transforming complex challenges into elegant digital solutions.",
  email: "cunliangyu19@gmail.com",
  socials: [
    { name: "GitHub", url: "https://github.com/freddie-yu", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/cunliang-yu-5b559716a", icon: Linkedin }
  ],
  status: [
    "Building scalable web applications",
    "Optimizing performance & SEO",
    "Contributing to open source"
  ],
  skills: {
    frontend: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Material-UI", "Redux"],
    backend: ["Django", "Node.js", "Python", "PHP", "RESTful APIs", "MySQL"],
    tools: ["Git", "WordPress", "CPanel", "Google Analytics", "VS Code", "Docker"]
  },
  focus_areas: [
    { 
      title: "Full-Stack Development", 
      desc: "Building end-to-end web applications using React, Django, and Node.js with emphasis on scalable architecture and clean code practices. Experienced in designing RESTful APIs and implementing efficient state management solutions."
    },
    { 
      title: "Performance Optimization", 
      desc: "Enhancing application performance through technical SEO, code optimization, and infrastructure improvements. Achieved 30% improvement in search rankings and 40% increase in organic traffic through systematic optimization strategies."
    },
    { 
      title: "Research Platform Development", 
      desc: "Creating specialized platforms for machine learning research at AIML, automating algorithm evaluation workflows and enabling real-time performance benchmarking for research teams."
    },
    { 
      title: "UI/UX Excellence", 
      desc: "Developing responsive, mobile-first interfaces that deliver exceptional user experiences across all devices. Proficient in modern design systems and accessibility best practices."
    }
  ],
  experience_highlights: [
    { 
      title: "Data-Driven Solutions", 
      desc: "Leveraging analytics and monitoring tools to make informed decisions, implementing solutions that deliver measurable improvements in user engagement and system performance."
    },
    { 
      title: "System Architecture", 
      desc: "Designing and implementing robust application architectures with Django REST Framework, React state management, and efficient database schemas that support complex research workflows."
    },
    { 
      title: "Technical Leadership", 
      desc: "Leading technical SEO initiatives and development projects, collaborating with cross-functional teams to deliver high-quality solutions that exceed client expectations."
    }
  ]
};

export const projects = [
  {
    title: "Place Recognition Challenge Platform",
    description: "A comprehensive web-based competition platform developed for the Australian Institute for Machine Learning. The platform automates algorithm submission workflows, performance benchmarking, and real-time leaderboard rankings. Built with Django REST Framework and React, featuring secure file uploads, data visualization dashboards, and comprehensive metrics tracking for accuracy, execution time, and memory consumption. Streamlined research evaluation process for over ten participants.",
    tags: ["Django", "React", "REST API", "Material-UI", "Chart.js", "Redux"],
    link: "https://github.com/freddie-yu/Place_Recognition_Challenge_Platform",
    color: "bg-blue-100"
  },
  {
    title: "Enterprise SEO Optimization Suite",
    description: "Led technical SEO initiatives at Redsteps Consulting, implementing comprehensive website audits, schema markup, and site structure optimization across multiple client projects. Developed automated monitoring solutions using Google Analytics and Search Console APIs, resulting in an average 30% improvement in organic search rankings and up to 40% increase in organic traffic for key clients.",
    tags: ["WordPress", "PHP", "SEO", "Google Analytics", "Performance"],
    link: "https://redstepsconsulting.com.au",
    color: "bg-green-100"
  },
  {
    title: "Responsive Web Solutions",
    description: "Developed and maintained high-performance, mobile-responsive websites ensuring optimal user experience across all devices. Implemented advanced caching strategies, lazy loading, and code splitting techniques to achieve exceptional page load speeds. Managed server infrastructure through CPanel, handling domain configurations, backups, and performance tuning to maintain 99.9% uptime.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "CPanel"],
    link: "#",
    color: "bg-purple-100"
  },
  {
    title: "Data Integration Solutions",
    description: "Established innovative data communication channels between front-end applications and databases, creating efficient data pipelines for research platforms. Implemented secure API endpoints with proper authentication, validation, and error handling. Optimized database queries and implemented caching strategies to support real-time data visualization and performance metrics tracking.",
    tags: ["Python", "MySQL", "REST API", "Data Pipeline", "Optimization"],
    link: "#",
    color: "bg-orange-100"
  }
];