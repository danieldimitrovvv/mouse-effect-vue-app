export interface IRadioButton {
  value: string;
  id: string;
  label: string;
}

export interface IRadioButtonsProps {
  items?: IRadioButton[];
  defaultValue?: string;
  title?: string;
}

export const defaultRadioButtonsProps: IRadioButtonsProps = {
  items: [
    { value: "male", id: "male", label: "Male" },
    { value: "female", id: "female", label: "Female" },
  ],

  defaultValue: "female",
};
