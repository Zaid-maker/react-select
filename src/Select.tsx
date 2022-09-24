import React, { useEffect, useRef, useState } from "react";
import styles from "./select.module.css";

/**
 * SelectOption is an object with a label property that is a string and a value property that is either
 * a number or any type.
 * @property {string} label - The text that will be displayed in the dropdown.
 * @property {any | number} value - The value of the option.
 */
export type SelectOption = {
  label: string;
  value: any | number;
};

/**
 * SingleSelectProps is an object with a property called multiple that is optional and has a type of
 * false, a property called value that is optional and has a type of SelectOption, and a property
 * called onChange that is required and has a type of a function that takes a parameter of type
 * SelectOption or undefined and returns void.
 * @property multiple - boolean - whether the select should allow multiple values to be selected
 * @property {SelectOption} value - The current value of the select.
 * @property onChange - This is a function that will be called when the user selects an option.
 */
type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

/**
 * MultipleSelectProps is a type that has a property called multiple that is a boolean, a property
 * called value that is an array of SelectOption, and a property called onChange that is a function
 * that takes an array of SelectOption and returns nothing.
 * @property multiple - true - This is a required property for the component to work.
 * @property {SelectOption[]} value - The current value of the select.
 * @property onChange - This is a function that will be called when the user selects an option.
 */
type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * If the user clicks on the clear button, then the onChange function is called with an undefined
   * value.
   */
  function clearOption() {
    /* This is a ternary operator. If the value is true, then the first statement is executed,
    otherwise the second statement is executed. */
    multiple ? onChange([]) : onChange(undefined);
  }

  /**
   * If the option is not equal to the value, then change the option.
   * @param {SelectOption} option - SelectOption - the option that was clicked
   */
  function selectOption(option: SelectOption) {
    /* This is a ternary operator. If the value is true, then the first statement is executed,
    otherwise the second statement is executed. */
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o != option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  /**
   * If the option is equal to the value, then return true, otherwise return false.
   * @param {SelectOption} option - SelectOption - this is the option that is being checked to see if
   * it is selected
   * @returns The function isOptionSelected is being returned.
   */
  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  /* This is a React hook that is called when the component is mounted and when the isOpen state
  changes. */
  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;

      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);

          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className={styles["option-badge"]}
              >
                {v.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
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
