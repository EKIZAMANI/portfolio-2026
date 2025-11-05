import React from 'react';
import { Button } from '@/components/ui/button';
import { AtSign, Paperclip, Github, Linkedin } from 'lucide-react';

export default function ResumeEmailButtons() {
  return (
    <div className="flex gap-3">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={() => window.open('https://drive.google.com/file/d/1O7r7BR_dRjqtlyrsnaNqtDjBnVQtEgpH/view?usp=sharing', '_blank')}
      >
        <Paperclip className="h-4 w-4" />
        Resume
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={() => window.open('mailto:kothandv@mcmaster.ca', '_blank')}
      >
        <AtSign className="h-4 w-4" />
        Email
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2 "
        onClick={() => window.open('https://www.linkedin.com/in/varun-ram/', '_blank')}
      >
        <Linkedin className="h-4 w-4" />
        LinkedIn
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2 hidden md:flex"
        onClick={() => window.open('https://github.com/Nuravar', '_blank')}
      >
        <Github className="h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}