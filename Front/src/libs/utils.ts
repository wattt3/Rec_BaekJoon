interface ColorApplyOptions {
  saturation: number;
  apply: "bg" | "text";
}

export type ProblemCardColor = "rose" | "teal" | "indigo" | "slate";

export const colorApply = (
  cardColor: ProblemCardColor,
  { apply, saturation }: ColorApplyOptions
) => {
  return `${apply}-${cardColor}-${saturation}`;
};
