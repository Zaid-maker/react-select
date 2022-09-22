import React, { useEffect, useState } from "react";
import styles from "./select.module.css";

/**
 * SelectOption is an object with a label property that is a string and a value property that is either
 * a number or any type.
 * @property {string} label - The text that will be displayed in the dropdown.
 * @property {any | number} value - The value of the option.
 */
type SelectOption = {
  label: string;
  value: any | number;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  /**
   * If the user clicks on the clear button, then the onChange function is called with an undefined
   * value.
   */
  function clearOption() {
    onChange(undefined);
  }

  /**
   * If the option is not equal to the value, then change the option.
   * @param {SelectOption} option - SelectOption - the option that was clicked
   */
  function selectOption(option: SelectOption) {
    if (option !== value) onChange(option);
  }

  /**
   * If the option is equal to the value, then return true, otherwise return false.
   * @param {SelectOption} option - SelectOption - this is the option that is being checked to see if
   * it is selected
   * @returns The function isOptionSelected is being returned.
   */
  function isOptionSelected(option: SelectOption) {
    return option === value;
  }

  /* This is a React hook that is called when the component is mounted and when the isOpen state
  changes. */
  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOption();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.label}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            } ${index === highlightedIndex ? styles.highlighted : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
