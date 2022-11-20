import React from "react";
import styles from "./radioButton.module.scss";

interface Props {
  name: string;
  label: string;
  value: string;
  isChecked: boolean;
  onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}

const RadioButton: React.FC<Props> = ({
  name,
  value,
  label,
  isChecked,
  onChange,
}) => {
  return (
    <label className={styles.root}>
      <input
        type="radio"
        className={styles.input}
        name={name}
        checked={isChecked}
        onChange={onChange}
        value={value}
      />
      <div className={styles.label}>{label} </div>
    </label>
  );
};

export default RadioButton;
