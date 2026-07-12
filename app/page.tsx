"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "@/components/app-sidebar";
import TeamExperience from "@/components/experience-list";
import SkillsSection from "@/components/skill-section";
import ProjectGrid from "@/components/project-card";
import Footer from "@/components/footer";
import { Home } from "lucide-react";
import GravityGrid from "@/components/ui/gravity-grid";
import LocationAndTimeDisplay from "@/components/location-indicator";
import ResumeEmailButtons from "@/components/resume-email-btn";

export default function HomePage() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar  />
      <main className="flex-1 ">
        {" "}
        {/* Added dotted background class: dotted-paper-bg-subtle*/}
        {/* Top header with breadcrumb and mobile sidebar trigger */}
        <div className="flex h-16 items-center justify-between px-4 lg:px-6 border-b border-neutral-800">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Home className="w-3 h-3 mr-1" />
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="lg:hidden">
            <SidebarTrigger/>
          </div>
        </div>
        {/* Main Content */}
        <div className="px-4 py-8 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-8">
          <div className="mb-2">
            {/* <Avatar className="w-15 h-15">
              <AvatarImage src="/linkedin.jpg" alt="@shadcn" />
              <AvatarFallback>VK</AvatarFallback>
            </Avatar> */}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-4 max-w-4xl">
            <LocationAndTimeDisplay />
          </div>

          <div className="space-y-4 max-w-7xl">
            <h3 className="max-w-4xl !font-normal leading-relaxed">
              👋 Hi, I’m <strong>M. Zaki Zamani</strong>, an Informatics graduate from Universitas Syiah Kuala with a strong interest in web development, UI/UX design, and building practical digital solutions.
              <br />
              <br />
              I completed an internship at <strong>Kejaksaan Tinggi Aceh</strong>, where I helped develop a web-based employee management system as both a UI/UX designer and web developer. I also joined <strong>Bangkit Academy</strong>, which strengthened my skills in Android development, modern product creation, and collaborative problem solving.
              <br />
              <br />
              I enjoy turning ideas into functional interfaces and applications that are user-friendly, reliable, and impactful.
            </h3>

            <div>
              <div className="text-sm flex flex-wrap items-center gap-2">
                <div className="relative">
                  <div
                    className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                    style={{
                      filter: "drop-shadow(0 0 4px rgba(74, 222, 128, 0.6))",
                    }}
                  />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping opacity-20" />
                </div>
                Open to opportunities in <strong>web development, UI/UX, and digital product work</strong>
              </div>
            </div>

            <ResumeEmailButtons />
            <GravityGrid />
            <TeamExperience />
            <SkillsSection />
            <ProjectGrid fullWidthCount={1} />
          </div>
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
}
