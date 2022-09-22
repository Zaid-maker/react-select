import { useState } from "react";
import { Select } from "./Select";

const options = [
  {
    label: "first",
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
  const [value, setValue] = useState<typeof options[0] | undefined>(options[0])

  return (
    <>
      <Select options={options} value={value} onChange={o => setValue(o)} />
    </>
  );
}

export default App;
