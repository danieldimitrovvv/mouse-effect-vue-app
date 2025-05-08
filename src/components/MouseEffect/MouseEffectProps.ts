export type IMouseEffectProps = {
  backgroundColor: string;
  itemColor: string;
  size: number;
  count: number;
  opacityStep: number;
  speed: number;
};

export const defaultMouseEffectProps: IMouseEffectProps = {
  backgroundColor: "#222222",
  itemColor: "#00e2e6",
  size: 40,
  count: 5,
  opacityStep: 0.2,
  speed: 0.05,
};
