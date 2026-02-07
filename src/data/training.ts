export interface TrainingStep {
  id: string;
  order: number;
  title: string;
  abbreviation: string;
  icon: string;
  description: string;
  accentColor: string;
  accentBg: string;
  accentText: string;
  requirements: string[];
  learns: string[];
  learnsLabel: string;
}

export const trainingIntro =
  "At Skylogix Aviation, we're more than just a flight school—we're your launchpad to the airlines. Here's a step-by-step guide with visual cues to help you see where you're headed";

export const trainingCta = {
  title: "Ready to Take Off?",
  icon: "🚀",
  description:
    "Book your Discovery Flight today and get a taste of life in the cockpit.",
  location: "Located at Brackett Field (KPOC)",
};

export const trainingSteps: TrainingStep[] = [
  {
    id: "ppl",
    order: 1,
    title: "Private Pilot License",
    abbreviation: "PPL",
    icon: "✈️",
    description:
      "Your foundation in aviation. Fly solo, take passengers, and explore the skies for fun.",
    accentColor: "border-blue-500",
    accentBg: "bg-blue-50",
    accentText: "text-blue-600",
    requirements: [
      "Age: 17+",
      "40+ flight hours (20 dual / 10 solo)",
      "Pass FAA Knowledge Test & Checkride",
      "3rd-Class Medical Certificate",
    ],
    learns: [
      "Aircraft control",
      "Cross-country navigation",
      "Weather basics",
      "Radio communication",
      "Emergency procedures",
    ],
    learnsLabel: "You'll Learn",
  },
  {
    id: "ifr",
    order: 2,
    title: "Instrument Rating",
    abbreviation: "IFR",
    icon: "🧭",
    description:
      "Fly safely through clouds, fog, and limited visibility—critical for serious pilots.",
    accentColor: "border-indigo-500",
    accentBg: "bg-indigo-50",
    accentText: "text-indigo-600",
    requirements: [
      "PPL required",
      "50+ hours cross-country PIC",
      "40+ hours instrument time",
      "Instrument Knowledge Test & Checkride",
    ],
    learns: [
      "Instrument-only flying",
      "Holding patterns & approaches",
      "IFR charts & procedures",
      "Weather analysis",
    ],
    learnsLabel: "You'll Learn",
  },
  {
    id: "cpl",
    order: 3,
    title: "Commercial Pilot License",
    abbreviation: "CPL",
    icon: "💼",
    description:
      "Start getting paid to fly—step into the world of professional aviation.",
    accentColor: "border-amber-500",
    accentBg: "bg-amber-50",
    accentText: "text-amber-600",
    requirements: [
      "Age: 18+",
      "PPL + IFR",
      "250 total hours",
      "Commercial Knowledge Test & Checkride",
    ],
    learns: [
      "Complex aircraft operation",
      "Advanced maneuvers",
      "Precision flying techniques",
    ],
    learnsLabel: "You'll Learn",
  },
  {
    id: "cfi",
    order: 4,
    title: "Certified Flight Instructor",
    abbreviation: "CFI",
    icon: "🎓",
    description:
      "Teach others to fly, sharpen your own skills, and build flight hours fast.",
    accentColor: "border-emerald-500",
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-600",
    requirements: [
      "CPL required",
      "FOI & CFI Knowledge Tests",
      "CFI Checkride",
    ],
    learns: [
      "Build time toward ATP",
      "Earn while you fly",
      "Inspire the next generation of pilots",
    ],
    learnsLabel: "Benefits",
  },
  {
    id: "atp",
    order: 5,
    title: "Airline Transport Pilot",
    abbreviation: "ATP",
    icon: "🛫",
    description:
      "The final goal—required to become an airline captain.",
    accentColor: "border-gold-500",
    accentBg: "bg-gold-100",
    accentText: "text-gold-600",
    requirements: [
      "Age: 23+",
      "CPL + IFR",
      "1,500 flight hours total",
      "ATP Knowledge Test & Checkride",
    ],
    learns: [
      "Airline job eligibility",
      "Advanced systems training",
      "Professional flight experience",
    ],
    learnsLabel: "What You'll Gain",
  },
];
