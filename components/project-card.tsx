"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  link: string;
  isExternal?: boolean;
  photo?: string;
  photos?: string[];
  tags?: string[];
}

interface ProjectGridProps {
  projects?: Project[];
  fullWidthCount?: number;
}

/* ─── Blurred-bg image helper ────────────────────────────────── */
/**
 * Shows the image with object-contain so the full image is always visible,
 * and renders a blurred, dimmed copy behind it as the background fill.
 */
const ContainImage: React.FC<{
  src: string;
  alt: string;
  quality?: number;
}> = ({ src, alt, quality = 90 }) => (
  <div className="relative w-full h-full overflow-hidden">
    {/* blurred background fill */}
    <Image
      src={src}
      alt=""
      fill
      style={{ objectFit: 'cover', filter: 'blur(20px) brightness(0.35)', transform: 'scale(1.15)' }}
      quality={30}
      aria-hidden
    />
    {/* crisp foreground image */}
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: 'contain' }}
      quality={quality}
    />
  </div>
);

/* ─── Modal ──────────────────────────────────────────────────── */
const ProjectModal: React.FC<{
  project: Project;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = project.photos?.length
    ? project.photos
    : project.photo
    ? [project.photo]
    : [];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhoto((p) => (p - 1 + photos.length) % photos.length);
  };
  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhoto((p) => (p + 1) % photos.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(18px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl"
        style={{ background: 'oklch(0.20 0.008 35)', border: '1px solid oklch(0.30 0.01 40)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full transition"
          style={{ background: 'oklch(0.28 0.01 40)', color: '#ccc' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'oklch(0.34 0.01 40)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'oklch(0.28 0.01 40)')}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image area — fixed height, blur bg, contain image */}
        {photos.length > 0 && (
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            {photos.map((src, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: i === activePhoto ? 1 : 0 }}
              >
                <ContainImage src={src} alt={`${project.title} ${i + 1}`} quality={90} />
              </div>
            ))}

            {/* Bottom gradient fade into modal bg */}
            <div
              className="absolute inset-x-0 bottom-0 h-20 pointer-events-none z-10"
              style={{ background: 'linear-gradient(to top, oklch(0.20 0.008 35), transparent)' }}
            />

            {/* Prev / Next */}
            {photos.length > 1 && (
              <>
                <button
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full transition"
                  style={{ background: 'rgba(0,0,0,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.75)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
                  onClick={goPrev}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4 text-white" />
                </button>
                <button
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full transition"
                  style={{ background: 'rgba(0,0,0,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.75)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
                  onClick={goNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4 text-white" />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setActivePhoto(i); }}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === activePhoto ? '20px' : '6px',
                        background: i === activePhoto ? '#fff' : 'rgba(255,255,255,0.4)',
                      }}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6 space-y-4">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: 'oklch(0.65 0.05 200)' }}>
              {new Date(project.date).getFullYear()}
            </p>
            <h2 className="text-xl font-semibold leading-snug" style={{ color: '#f0ece6', marginTop: 0, paddingTop: 0 }}>
              {project.title}
            </h2>
            <p className="text-sm mt-0.5" style={{ color: 'oklch(0.62 0.015 40)', marginTop: 0 }}>
              {project.subtitle}
            </p>
          </div>

          <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.72 0.01 40)', marginTop: 0 }}>
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: 'oklch(0.26 0.01 40)', color: 'oklch(0.72 0.01 40)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Link */}
          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target={project.isExternal ? '_blank' : undefined}
              rel={project.isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: 'oklch(0.78 0.08 200)' }}
            >
              View project <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Single Project Row Card ────────────────────────────────── */
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const photos = project.photos?.length
    ? project.photos
    : project.photo
    ? [project.photo]
    : [];

  return (
    <>
      <div
        className="group relative flex items-center gap-5 rounded-2xl px-5 py-4 cursor-pointer transition-all duration-200"
        style={{
          background: isHovered ? 'oklch(0.22 0.008 38)' : 'transparent',
          border: `1px solid ${isHovered ? 'oklch(0.32 0.015 40)' : 'transparent'}`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
        aria-label={`View ${project.title} project`}
      >
        {/* Index number */}
        <span
          className="hidden sm:flex shrink-0 w-7 text-right text-sm tabular-nums select-none"
          style={{ color: 'oklch(0.42 0.01 40)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Thumbnail — blur bg + contain */}
        <div
          className="relative shrink-0 h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-xl"
          style={{ background: 'oklch(0.26 0.01 40)' }}
        >
          {photos.length > 0 ? (
            <ContainImage src={photos[0]} alt={project.title} quality={70} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold select-none"
              style={{ color: 'oklch(0.48 0.02 40)' }}>
              {project.title.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-sm" style={{ color: '#f0ece6', marginTop: 0 }}>
            {project.title}
          </p>
          <p className="truncate text-xs mt-0.5" style={{ color: 'oklch(0.58 0.015 40)', marginTop: 0 }}>
            {project.subtitle}
          </p>
        </div>

        {/* Tags — hidden on mobile */}
        {project.tags && project.tags.length > 0 && (
          <div className="hidden md:flex gap-1.5 shrink-0">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'oklch(0.26 0.01 40)', color: 'oklch(0.62 0.01 40)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Year */}
        <span className="shrink-0 text-xs tabular-nums select-none" style={{ color: 'oklch(0.48 0.01 40)' }}>
          {new Date(project.date).getFullYear()}
        </span>

        {/* Arrow */}
        <ArrowUpRight
          className="shrink-0 h-4 w-4 transition-all duration-200"
          style={{
            color: isHovered ? 'oklch(0.72 0.06 200)' : 'oklch(0.42 0.01 40)',
            transform: isHovered ? 'translate(1px, -1px)' : 'none',
          }}
        />
      </div>

      {isModalOpen && (
        <ProjectModal project={project} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

/* ─── Infinite Scroll Image Strip ────────────────────────────── */
const ImageStrip: React.FC<{ allPhotos: { src: string; label: string }[] }> = ({ allPhotos }) => {
  if (allPhotos.length === 0) return null;

  const items = [...allPhotos, ...allPhotos];
  const duration = Math.max(allPhotos.length * 5, 24);

  return (
    <div
      className="relative w-full overflow-hidden mt-8 pb-2"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)' }}
    >
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .strip-track {
          display: flex;
          align-items: center;
          gap: 12px;
          width: max-content;
          animation: scroll-left ${duration}s linear infinite;
        }
        .strip-track:hover {
          animation-play-state: paused;
        }
        .strip-card {
          cursor: default;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .strip-card:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 16px 40px rgba(0,0,0,0.28) !important;
        }
      `}</style>

      <div className="strip-track">
        {items.map((item, i) => (
          <div
            key={i}
            className="strip-card relative shrink-0 rounded-2xl overflow-hidden"
            style={{
              width: '188px',
              height: '118px',
              background: '#f5f5f5',
              boxShadow: '0 2px 12px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            {/* grey blurred background */}
            <Image
              src={item.src}
              alt=""
              fill
              style={{
                objectFit: 'cover',
                filter: 'blur(18px) brightness(0.65) saturate(0.3)',
                transform: 'scale(1.2)',
              }}
              quality={15}
              aria-hidden
            />
            {/* crisp contained foreground */}
            <Image
              src={item.src}
              alt={item.label}
              fill
              style={{ objectFit: 'contain' }}
              quality={65}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


/* ─── Grid / Section ─────────────────────────────────────────── */
const ProjectGrid: React.FC<ProjectGridProps> = ({ projects = [] }) => {
  const sampleProjects: Project[] = [
    {
      id: '1',
      title: 'CapyType',
      subtitle: 'Typing Test Platform',
      description:
        'Built a minimalist typing test web app with real-time accuracy, WPM, and leaderboard features.',
      date: '2024-01-15',
      link: '#',
      tags: ['Next.js', 'TypeScript'],
      photos: ['/projectImg/capytype1.png', '/projectImg/capytype2.png', '/projectImg/capytype3.png'],
    },
    {
      id: '2',
      title: 'Profidom',
      subtitle: 'Financial Independence Platform',
      description:
        'Developed a web platform for tracking net worth, progress, and milestones in a personal finance journey.',
      date: '2026-01-10',
      link: '#',
      tags: ['React', 'Tailwind'],
      photos: ['/projectImg/profidom1.png', '/projectImg/profidom2.png', '/projectImg/profidom3.png'],
    },
    {
      id: '3',
      title: 'Employee Management System',
      subtitle: 'Internship Project',
      description:
        'Contributed to a web-based employee information system with UI/UX design and implementation support.',
      date: '2024-11-20',
      link: '#',
      tags: ['Laravel', 'UI/UX'],
      photos: ['/projectImg/profidom1.png', '/projectImg/profidom2.png', '/projectImg/profidom3.png'],
    },
    {
      id: '4',
      title: 'SIMKEL',
      subtitle: 'Android Classroom Management System',
      description:
        'Android application for managing attendance, assignments, quizzes, schedules, grades, and learning materials.',
      date: '2025-05-01',
      link: '#',
      tags: ['Figma', 'Kotlin', 'Android Studio', 'Firebase'],
      photos: ['/projectImg/simkel1.png', '/projectImg/simkel2.png'],
    },
    {
      id: '5',
      title: 'SIMPEG',
      subtitle: 'Employee Management System',
      description:
        'Android app for managing employee records, attendance, scheduling, payroll, and internal communication.',
      date: '2025-10-01',
      link: '#',
      tags: ['Kotlin', 'Android Studio', 'Firebase', 'UI/UX'],
      photos: ['/projectImg/simpeg1.png', '/projectImg/simpeg2.png', '/projectImg/simpeg3.png', '/projectImg/simpeg4.png'],
    },
  ];

  const list = projects.length > 0 ? projects : sampleProjects;

  // Collect ALL photos from all projects for the strip
  const allPhotos = list.flatMap((p) => {
    const srcs = p.photos?.length ? p.photos : p.photo ? [p.photo] : [];
    return srcs.map((src) => ({ src, label: p.title }));
  });

  return (
    <section className="w-full py-6">
      {/* Section header */}
      <div className="mb-4 flex items-center justify-between">
        <h2
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'oklch(0.52 0.015 40)', marginTop: 0, paddingTop: 0 }}
        >
          Projects
        </h2>
        <span className="text-xs" style={{ color: 'oklch(0.42 0.01 40)' }}>
          {list.length} works
        </span>
      </div>

      {/* Divider */}
      <div className="mb-2" style={{ borderTop: '1px solid oklch(0.26 0.01 40)' }} />

      {/* Project list */}
      <div className="flex flex-col">
        {list.map((project, i) => (
          <React.Fragment key={project.id}>
            <ProjectCard project={project} index={i} />
            {i < list.length - 1 && (
              <div className="mx-5" style={{ borderTop: '1px solid oklch(0.22 0.008 40)' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── Infinite horizontal image strip ── */}
      <ImageStrip allPhotos={allPhotos} />
    </section>
  );
};

export default ProjectGrid;
