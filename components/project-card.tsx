import React from 'react';
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  link: string;
  isExternal?: boolean;
  photo?: string;
  video?: string;
  videoZoom?: number;
}

interface ProjectGridProps {
  projects?: Project[];
  fullWidthCount?: number;
}

const ProjectCard: React.FC<{
  project: Project;
  onCardClick: (project: Project) => void;
  isFullWidth?: boolean;
}> = ({
  project,
  onCardClick,
  isFullWidth = false
}) => {
  return (
    <div
      className="group cursor-pointer transition-all duration-300"
      onClick={() => onCardClick(project)}
    >
      <div
        className={`relative w-full bg-gray-800 transition-all duration-300 group-hover:brightness-110 rounded-lg overflow-hidden hover:ring-[3px] hover:ring-[#c9b6a5] hover:ring-offset-1 hover:ring-offset-background ${
          isFullWidth ? 'h-[70vh]' : 'h-100'
        }`}
      >
        {project.video ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: project.videoZoom ? `scale(${project.videoZoom})` : undefined
            }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={project.video} type="video/mp4" />
            <source src={project.video.replace('.mp4', '.webm')} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        ) : project.photo ? (
          <div className="absolute inset-0">
            <Image
              src={project.photo}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
        )}
      </div>

      <div className="mt-4 transition-all duration-300 group-hover:brightness-190">
        <div className="flex justify-between items-start">
          <div className="flex-none mr-4">
            <div>{project.title}</div>
            <div className="text-base text-muted-foreground mt-0">{project.subtitle}</div>
          </div>

          <div className="hidden sm:block flex-grow pr-4">
            <small className="text-muted-foreground leading-relaxed">{project.description}</small>
          </div>

          <div className="flex-none">
            <div className="text-base">{new Date(project.date).getFullYear()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects = [],
  fullWidthCount = 0
}) => {
  const sampleProjects: Project[] = [
    {
      id: '1',
      title: 'CapyType',
      subtitle: 'Typing Test Platform',
      description: 'Built a minimalist typing test web app with real-time accuracy, WPM, and leaderboard features.',
      date: '2024-01-15',
      link: '#'
    },
    {
      id: '2',
      title: 'Profidom',
      subtitle: 'Financial Independence Platform',
      description: 'Developed a web platform for tracking net worth, progress, and milestones in a personal finance journey.',
      date: '2026-01-10',
      link: '#'
    },
    {
      id: '3',
      title: 'Employee Management System',
      subtitle: 'Internship Project',
      description: 'Contributed to a web-based employee information system with UI/UX design and implementation support.',
      date: '2024-11-20',
      link: '#'
    }
  ];

  const projectsToDisplay = projects.length > 0 ? projects : sampleProjects;
  const fullWidthProjects = projectsToDisplay.slice(0, fullWidthCount);
  const twoColumnProjects = projectsToDisplay.slice(fullWidthCount);

  const handleCardClick = (project: Project) => {
    if (project.isExternal) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = project.link;
    }
  };

  return (
    <div className="w-full max-w-10xl mx-auto py-8">
      {fullWidthProjects.length > 0 && (
        <div className="grid grid-cols-1 gap-8 mb-8">
          {fullWidthProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onCardClick={handleCardClick} isFullWidth={true} />
          ))}
        </div>
      )}

      {twoColumnProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
          {twoColumnProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onCardClick={handleCardClick} isFullWidth={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;