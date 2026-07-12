import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

interface Skill {
  name: string;
  icon: string | null;
}

interface SkillsData {
  languages: Skill[];
  frameworks: Skill[];
  tools: Skill[];
  strengths: Skill[];
}

interface SkillItemProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
}

interface SkillColumnProps {
  title: string;
  skills: Skill[];
}

const SkillsSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skillsData: SkillsData = {
    languages: [
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
      { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'XML', icon: null },
      { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
    ],
    frameworks: [
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' }
    ],
    tools: [
      { name: 'Figma', icon: null },
      { name: 'Google Workspace', icon: null },
      { name: 'Microsoft Office', icon: null },
      { name: 'UI/UX Design', icon: null },
      { name: 'Databases', icon: null },
      { name: 'Server Configuration', icon: null }
    ],
    strengths: [
      { name: 'Communication Skills', icon: null },
      { name: 'Problem Solving', icon: null },
      { name: 'Documentation', icon: null },
      { name: 'Collaboration', icon: null },
      { name: 'Adaptability', icon: null },
      { name: 'Discipline', icon: null }
    ]
  };

  const toggleExpanded = (): void => {
    setIsExpanded(!isExpanded);
  };

  const SkillItem: React.FC<SkillItemProps> = ({ skill, index, isVisible }) => (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ease-out transform ${
        mounted && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      style={{
        backgroundColor: '#1d1b19',
        transitionDelay: mounted ? `${index * 50}ms` : '0ms'
      }}
    >
      {skill.icon ? (
        <Image
          src={skill.icon}
          alt={skill.name}
          width={24}
          height={24}
          className="w-6 h-6 object-contain flex-shrink-0 transition-transform duration-200 hover:scale-110"
        />
      ) : (
        <div className="w-6 h-6 flex-shrink-0 bg-gray-300 rounded flex items-center justify-center transition-transform duration-200 hover:scale-110">
          <span className="text-xs font-medium text-gray-600">
            {skill.name.charAt(0)}
          </span>
        </div>
      )}
      <span className="text-muted-foreground text-sm transition-colors duration-200 hover:text-gray-300">{skill.name}</span>
    </div>
  );

  const SkillColumn: React.FC<SkillColumnProps> = ({ title, skills }) => {
    const displayedSkills: Skill[] = skills.slice(0, 5);
    const hiddenSkills: Skill[] = skills.slice(5);

    return (
      <div className="w-full">
        <h3 className="text-left text-white font-medium text-xs m-2">{title}</h3>
        <div className="space-y-2">
          {displayedSkills.map((skill: Skill, index: number) => (
            <SkillItem key={skill.name} skill={skill} index={index} isVisible={true} />
          ))}

          {hiddenSkills.length > 0 && (
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: isExpanded ? `${hiddenSkills.length * 60}px` : '0px',
                opacity: isExpanded ? 1 : 0
              }}
            >
              <div className="space-y-2">
                {hiddenSkills.map((skill: Skill, index: number) => (
                  <SkillItem
                    key={skill.name}
                    skill={skill}
                    index={index}
                    isVisible={isExpanded}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="hidden lg:block w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        <SkillColumn title="Languages" skills={skillsData.languages} />
        <SkillColumn title="Frameworks" skills={skillsData.frameworks} />
        <SkillColumn title="Tools" skills={skillsData.tools} />
        <SkillColumn title="Strengths" skills={skillsData.strengths} />
      </div>

      <div className="text-center">
        <button
          onClick={toggleExpanded}
          className="flex items-center justify-center space-x-2 mx-auto px-6 py-2 transition-all duration-300 ease-out hover:bg-[#28201d] rounded-lg group"
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 transition-transform text-muted-foreground duration-200 group-hover:scale-110" />
          ) : (
            <ChevronDown className="w-4 h-4 transition-transform text-muted-foreground duration-200 group-hover:scale-110" />
          )}
          <span className="transition-colors text-muted-foreground">
            {isExpanded ? 'Show Less' : 'Show More'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SkillsSection;