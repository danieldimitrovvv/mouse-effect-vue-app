export interface ISwitchButtonProps {
  checked?: boolean;
  small?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  size?: number;
}

export const defaultSwitchButtonProps: ISwitchButtonProps = {
  checked: false,
  size: 30,
};
