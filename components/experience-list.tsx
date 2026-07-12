import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TeamExperience = () => {
  const experiences = [
    {
      id: 1,
      company: 'Kejaksaan Tinggi Aceh',
      role: 'Web Developer & UI/UX Designer',
      year: 'Sep 2024 - Nov 2024',
      bullets: [
        'Worked in a team to develop a web-based employee management information system.',
        'Designed the interface using Figma and translated requirements into responsive web screens.',
        'Collaborated on testing, refinement, and feature development with the project team.',
        'Supported user-centered improvements that made the system easier to use.'
      ]
    },
    {
      id: 2,
      company: 'Bangkit Academy',
      role: 'Mobile Development Cohort',
      year: '2024',
      bullets: [
        'Completed a professional Android development learning path with hands-on project experience.',
        'Strengthened skills in Kotlin, Android app development, and software architecture basics.',
        'Built familiarity with AI-driven mobile solutions and modern development workflows.'
      ]
    },
    {
      id: 3,
      company: 'Universitas Syiah Kuala',
      role: 'Informatics Student',
      year: '2021 - 2026',
      bullets: [
        'Studied Informatics with a strong focus on software development, problem solving, and digital innovation.',
        'Maintained a GPA of 3.65 while balancing coursework, projects, and collaborative learning.',
        'Developed a foundation in programming, databases, and practical technology applications.'
      ]
    }
  ];

  return (
    <div className="text-white rounded-lg pt-8">
      <Accordion type="single" collapsible className="w-full">
        {experiences.map((exp) => (
          <AccordionItem key={exp.id} value={`item-${exp.id}`} className="border-[#584B50]">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <div className="hidden md:flex w-7 h-7 rounded-full bg-neutral-700 items-center justify-center text-[10px] font-medium text-white">
                    {exp.company.charAt(0)}
                  </div>

                  <div className="flex flex-row gap-3 items-baseline">
                    <span className="text-white font-normal leading-relaxed text-sm">
                      {exp.company}
                    </span>
                    <span className="text-gray-400 text-xs font-normal leading-relaxed">
                      /
                    </span>
                    <span className="text-gray-400 text-xs font-normal leading-relaxed">
                      {exp.role}
                    </span>
                  </div>
                </div>

                <div className="text-muted-foreground text-xs font-small leading-relaxed mr-4 hidden md:flex">
                  {exp.year}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="ml-9">
                <ul className="space-y-2">
                  {exp.bullets.map((bullet, index) => (
                    <li key={index} className="text-gray-300 text-sm flex">
                      <span className="text-gray-500 mr-2 text-sm flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TeamExperience;