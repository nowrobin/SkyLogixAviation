export interface CrewMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  certifications?: string[];
}

export type CrewCategory = "founder" | "instructor" | "mechanic";

export const crewCategories: { key: CrewCategory; label: string }[] = [
  { key: "founder", label: "Founder" },
  { key: "instructor", label: "Instructor" },
  { key: "mechanic", label: "Mechanic" },
];

export const crew: Record<CrewCategory, CrewMember[]> = {
  founder: [
    {
      id: "founder-1",
      name: "TBD",
      role: "Founder",
      image: "/coming_soon.png",
    },
  ],
  instructor: [
    {
      id: "instructor-1",
      name: "TBD",
      role: "Flight Instructor",
      image: "/coming_soon.png",
    },
    {
      id: "instructor-2",
      name: "TBD",
      role: "Flight Instructor",
      image: "/coming_soon.png",
    },
    {
      id: "instructor-3",
      name: "TBD",
      role: "Flight Instructor",
      image: "/coming_soon.png",
    },
  ],
  mechanic: [
    {
      id: "mechanic-1",
      name: "TBD",
      role: "Aircraft Mechanic",
      image: "/coming_soon.png",
    },
    {
      id: "mechanic-2",
      name: "TBD",
      role: "Aircraft Mechanic",
      image: "/coming_soon.png",
    },
  ],
};
