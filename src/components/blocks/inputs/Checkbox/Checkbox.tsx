import styles from './checkbox.module.scss';
import React from 'react';

interface Props {
  onChange: () => void;
  checked: boolean;
  label: string;
}

const Checkbox = ({ checked, onChange, label }: Props) => {
  return (
    <label className={styles.root}>
      <input type="checkbox" className={styles.input} checked={checked} onChange={onChange} />
      <span className={styles.checkbox}></span>
      <span className={styles.label}> {label} </span>
    </label>
  );
};

export default Checkbox;
