export const charities = [
  {
    id: "clean-water",
    name: "Clean Water",
    description:
      "Help communities gain access to safe and reliable drinking water.",
    impact: "Clean water access",
  },
  {
    id: "youth-education",
    name: "Youth Education",
    description:
      "Support better learning opportunities for children and young people.",
    impact: "Learning opportunities",
  },
  {
    id: "green-future",
    name: "Green Future",
    description:
      "Support projects that protect communities and the environment.",
    impact: "Environmental protection",
  },
] as const;

export type CharityId = (typeof charities)[number]["id"];
