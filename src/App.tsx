import { useState } from "react";
import { Select, SelectOption } from "./Select";

const options = [
  {
    label: "First",
    value: 1,
  },
  {
    label: "Second",
    value: 2,
  },
  {
    label: "Third",
    value: 3,
  },
  {
    label: "Fourth",
    value: 4,
  },
  {
    label: "Fifth",
    value: 5,
  },
];

function App() {
  /* Creating a state variable called `value` and a function called `setValue` that can be used to
  update the value of `value`. */
  const [value1, setValue1] = useState<SelectOption | undefined>(options[0]);
  const [value2, setValue2] = useState<SelectOption[]>([options[0]]);

  return (
    <>
      <h1>This one below is Single Select</h1>
      <Select options={options} value={value1} onChange={(o) => setValue1(o)} />
      <h1>This one below is Multiple Select</h1>
      <Select
        multiple
        options={options}
        value={value2}
        onChange={(o) => setValue2(o)}
      />
    </>
  );
}

export default App;
