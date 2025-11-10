"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  link?: string;
  slug?: string;
};

export type TeamSectionProps = {
  title?: string;
  members: TeamMember[];
  className?: string;
  variant?: "default" | "detailed";
};

const defaultMembers: TeamMember[] = [
  {
    name: "Méschac Irung",
    role: "Creator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "Théo Balick",
    role: "Frontend Dev",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Glodie Lukose",
    role: "Frontend Dev",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "Bernard Ngandu",
    role: "Backend Dev",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
];

export function TeamSection({
  title = "Our team",
  members = defaultMembers,
  className,
  variant = "default",
  description,
}: TeamSectionProps & { description?: string }) {
  if (variant === "detailed") {
    return (
      <section className={cn("py-16 md:py-32", className)}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => {
              const CardContent = (
                <>
                  <img
                    className="h-[22.5rem] w-full rounded-xl object-cover object-top grayscale-0 transition-all duration-500 md:h-96 md:grayscale md:rounded-md md:hover:grayscale-0 md:group-hover:h-[22.5rem] md:group-hover:rounded-xl"
                    src={member.avatar}
                    alt={member.name}
                    width={826}
                    height={1239}
                    loading="lazy"
                  />
                  <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                    <div className="flex justify-between">
                      <h3 className="text-3xl font-semibold transition-all duration-500 tracking-wider md:text-2xl md:tracking-normal md:group-hover:tracking-wider text-white">
                        {member.name}
                      </h3>
                      <span className="text-xs text-balance-200">
                        _0{index + 1}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-balance-200 inline-block translate-y-0 text-lg font-light opacity-100 transition duration-300 md:text-sm md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                        {member.role}
                      </span>
                      {member.link && (
                        <a
                          href={member.link}
                          className="text-balance-200 inline-block translate-y-0 text-sm tracking-wide opacity-100 transition-all duration-500 hover:underline md:translate-y-8 md:opacity-0 md:text-balance-100 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Linktree
                        </a>
                      )}
                    </div>
                  </div>
                </>
              );

              if (member.slug) {
                return (
                  <Link
                    key={index}
                    href={`/speakers/${member.slug}`}
                    className="group overflow-hidden block"
                  >
                    {CardContent}
                  </Link>
                );
              }

              return (
                <div key={index} className="group overflow-hidden">
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-12 md:py-32", className)}>
      <div className="mx-auto max-w-3xl px-8 lg:px-0">
        <h2 className="mb-8 text-4xl font-bold md:mb-16 lg:text-5xl text-foreground">
          {title}
        </h2>

        <div>
          <h3 className="mb-6 text-lg font-medium text-foreground">
            Leadership
          </h3>
          <div className="grid grid-cols-2 gap-4 border-t border-border py-6 md:grid-cols-4">
            {members.slice(0, 4).map((member, index) => (
              <div key={index}>
                <div className="bg-background size-20 rounded-full border border-border p-0.5 shadow shadow-zinc-950/5">
                  <img
                    className="aspect-square rounded-full object-cover"
                    src={member.avatar}
                    alt={member.name}
                    height={460}
                    width={460}
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block text-sm text-foreground">
                  {member.name}
                </span>
                <span className="text-muted-foreground block text-xs">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-6 text-lg font-medium text-foreground">
            Engineering
          </h3>
          <div className="grid grid-cols-2 gap-4 border-t border-border py-6 md:grid-cols-4">
            {members.slice(0, 4).map((member, index) => (
              <div key={index}>
                <div className="bg-background size-20 rounded-full border border-border p-0.5 shadow shadow-zinc-950/5">
                  <img
                    className="aspect-square rounded-full object-cover"
                    src={member.avatar}
                    alt={member.name}
                    height={460}
                    width={460}
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block text-sm text-foreground">
                  {member.name}
                </span>
                <span className="text-muted-foreground block text-xs">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-6 text-lg font-medium text-foreground">
            Marketing
          </h3>
          <div className="grid grid-cols-2 gap-4 border-t border-border py-6 md:grid-cols-4">
            {members.slice(0, 4).map((member, index) => (
              <div key={index}>
                <div className="bg-background size-20 rounded-full border border-border p-0.5 shadow shadow-zinc-950/5">
                  <img
                    className="aspect-square rounded-full object-cover"
                    src={member.avatar}
                    alt={member.name}
                    height={460}
                    width={460}
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block text-sm text-foreground">
                  {member.name}
                </span>
                <span className="text-muted-foreground block text-xs">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;

