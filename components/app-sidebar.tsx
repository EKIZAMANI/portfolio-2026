"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  AtSign,
  Paperclip,
  Linkedin,
  Github,
  ChevronRight,
  University,
  File,
} from "lucide-react";
import Link from "next/link";

const navigationItems = [
  { id: "kejaksaan", name: "Kejaksaan Tinggi Aceh", href: "#", icon: University },
  { id: "bangkit", name: "Bangkit Academy", href: "#", icon: University },
  { id: "syiah", name: "Universitas Syiah Kuala", href: "#", icon: University },
];

const projectItems = [
  { id: "capytype", name: "CapyType", href: "#", icon: File },
  { id: "profidom", name: "Profidom", href: "#", icon: File },
  { id: "employee-system", name: "Employee System", href: "#", icon: File },
];

const socialItems = [
  { id: "email-link", name: "Email", href: "mailto:eki.zamani@gmail.com", icon: AtSign },
  { id: "resume-link", name: "Resume", href: "mailto:eki.zamani@gmail.com?subject=Resume%20Request", icon: Paperclip },
  { id: "linkedin-link", name: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin },
  { id: "github-link", name: "Github", href: "https://github.com/", icon: Github },
];

export function AppSidebar() {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  return (
    <Sidebar
      className="border-r border-border/20"
      style={{ backgroundColor: "#221D1B" }}
    >
      <SidebarHeader
        className="border-b border-border/20"
        style={{ backgroundColor: "#221D1B" }}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="
    group relative transition-all duration-300 ease-out 
    hover:bg-white/5 hover:backdrop-blur-sm 
    focus:bg-white/10 
    rounded-md
  "
            >
              <Link href="/" className="flex items-center gap-3">
                <div className="flex-1 text-left">
                  <span
                    className="
        text-base font-medium text-white/80 
        group-hover:text-white 
        transition-all duration-300 ease-out 
        group-hover:translate-x-0.5 group-hover:tracking-wide
      "
                  >
                    M. Zaki Zamani
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent style={{ backgroundColor: "#221d1b" }}>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-white/50 px-3 py-2">
            Experience
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                  className="transform transition-all duration-200 ease-out hover:translate-x-1"
                >
                  <SidebarMenuButton
                    asChild
                    className="h-8 px-3 text-sm font-normal hover:bg-white/5 text-white/70 hover:text-white transition-all duration-200 ease-out hover:shadow-sm"
                  >
                    <a
                      href={item.href}
                      className="flex items-center gap-2 w-full"
                    >
                      <div className="relative flex items-center justify-center w-3.5 h-3.5">
                        <div
                          className={`absolute inset-0 transition-all duration-200 ease-out ${
                            hoveredItemId === item.id
                              ? "scale-110 opacity-100"
                              : "scale-100 opacity-100"
                          }`}
                        >
                          {hoveredItemId === item.id ? (
                            <ChevronRight
                              className="w-3.5 h-3.5 text-blue-400"
                              strokeWidth={1.5}
                            />
                          ) : (
                            <item.icon
                              className="w-3.5 h-3.5"
                              strokeWidth={1.5}
                            />
                          )}
                        </div>
                      </div>
                      <span className="font-light transition-all duration-200 ease-out">
                        {item.name}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-white/50 px-3 py-2">
            Highlighted Projects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projectItems.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                  className="transform transition-all duration-200 ease-out hover:translate-x-1"
                >
                  <SidebarMenuButton
                    asChild
                    className="h-8 px-3 text-sm font-normal hover:bg-white/5 text-white/70 hover:text-white transition-all duration-200 ease-out hover:shadow-sm"
                  >
                    <a
                      href={item.href}
                      className="flex items-center gap-2 w-full"
                    >
                      <div className="relative flex items-center justify-center w-3.5 h-3.5">
                        <div
                          className={`absolute inset-0 transition-all duration-200 ease-out ${
                            hoveredItemId === item.id
                              ? "scale-110 opacity-100"
                              : "scale-100 opacity-100"
                          }`}
                        >
                          {hoveredItemId === item.id ? (
                            <ChevronRight
                              className="w-3.5 h-3.5 text-blue-400"
                              strokeWidth={1.5}
                            />
                          ) : (
                            <item.icon
                              className="w-3.5 h-3.5"
                              strokeWidth={1.5}
                            />
                          )}
                        </div>
                      </div>
                      <span className="font-light transition-all duration-200 ease-out">
                        {item.name}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-white/50 px-3 py-2">
            Links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {socialItems.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                  className="transform transition-all duration-200 ease-out hover:translate-x-1"
                >
                  <SidebarMenuButton
                    asChild
                    className="h-8 px-3 text-sm font-normal hover:bg-white/5 text-white/70 hover:text-white transition-all duration-200 ease-out hover:shadow-sm"
                  >
                    <a
                      href={item.href}
                      className="flex items-center gap-2 w-full"
                      target="_blank"
                    >
                      <div
                        className="relative flex items-center justify-center w-3.5 h-3.5"
                        rel="noopener noreferrer"
                      >
                        <div
                          className={`absolute inset-0 transition-all duration-200 ease-out ${
                            hoveredItemId === item.id
                              ? "scale-110 opacity-100"
                              : "scale-100 opacity-100"
                          }`}
                        >
                          {hoveredItemId === item.id ? (
                            <ChevronRight
                              className="w-3 h-3 text-blue-400"
                              strokeWidth={1.5}
                            />
                          ) : (
                            <item.icon className="w-3 h-3" strokeWidth={1.5} />
                          )}
                        </div>
                      </div>
                      <span className="font-light transition-all duration-200 ease-out">
                        {item.name}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className="border-t border-border/20"
        style={{ backgroundColor: "#221D1B" }}
      ></SidebarFooter>
    </Sidebar>
  );
}
