export const variants = {
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-400",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-400",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-400",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-400",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-400",
  },
  teal: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-400",
  },
  lime: {
    bg: "bg-lime-50",
    text: "text-lime-700",
    border: "border-lime-400",
  },
  fuchsia: {
    bg: "bg-fuchsia-50",
    text: "text-fuchsia-700",
    border: "border-fuchsia-400",
  },
};

export type ColorVariant = keyof typeof variants;

export const getRandomVariant = (index: number) => {
  const color = Object.keys(variants)[
    index % Object.keys(variants).length
  ] as ColorVariant;
  return color;
};

export const customChartColorPalette = [
  "hsl(255, 75%, 60%)",
  "hsl(160, 41%, 60%)",
  "hsl(38, 99%, 69%)",
  "hsl(208, 96%, 67%)",
  "hsl(323, 66%, 72%)",
];
