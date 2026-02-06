export interface Aircraft {
  id: string;
  name: string;
  year: number;
  model: string;
  engine: string;
  horsepower: number;
  flightRule: string;
  pricePerHour: string;
  description: string;
  images: string[];
}

export const fleet: Aircraft[] = [
  {
    id: "N49202",
    name: "N49202",
    year: 1977,
    model: "Cessna 152 II",
    engine: "Lycoming O-235-L2C",
    horsepower: 115,
    flightRule: "IFR",
    pricePerHour: "$120 /hr (Wet)",
    description:
      "The Cessna 152 is a reliable, fuel-efficient two-seat trainer, perfect for safe and affordable flight training.",
    images: [
      "/N49202/N49202_1.jpeg",
      "/N49202/N49202_2.jpeg",
      "/N49202/N49202_3.jpeg",
      "/N49202/N49202_4.jpeg",
      "/N49202/N49202_5.jpeg",
      "/N49202/N49202_6.jpeg",
    ],
  },
  {
    id: "N4900L",
    name: "N4900L",
    year: 1980,
    model: "Cessna 152 II",
    engine: "Lycoming O-235-L2C",
    horsepower: 115,
    flightRule: "IFR",
    pricePerHour: "$120 /hr (Wet)",
    description:
      "The Cessna 152 is a reliable, fuel-efficient two-seat trainer, perfect for safe and affordable flight training.",
    images: [
      "/N4900L/N4900L_1.jpeg",
      "/N4900L/N4900L_2.jpeg",
      "/N4900L/N4900L_3.jpeg",
      "/N4900L/N4900L_4.jpeg",
      "/N4900L/N4900L_5.jpeg",
      "/N4900L/N4900L_6.jpeg",
    ],
  },
  {
    id: "N25976",
    name: "N25976",
    year: 1978,
    model: "Cessna 152 II",
    engine: "Lycoming O-235-L2C",
    horsepower: 115,
    flightRule: "IFR",
    pricePerHour: "$120 /hr (Wet)",
    description:
      "The Cessna 152 is a reliable, fuel-efficient two-seat trainer, perfect for safe and affordable flight training.",
    images: [
      "/N25976/N25976_1.jpeg",
      "/N25976/N25976_2.jpeg",
      "/N25976/N25976_3.jpeg",
      "/N25976/N25976_4.jpeg",
      "/N25976/N25976_5.jpeg",
    ],
  },
];
