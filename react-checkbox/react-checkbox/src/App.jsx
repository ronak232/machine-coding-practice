import { useState } from "react";
import "./App.css";
import Input from "./components/Input";

function App() {
  const [error, setError] = useState(null);
  const [isParentChecked, setParentCheck] = useState(false); // parent checkbox state

  /**
   * State object to track the checked status of child checkboxes.
   * Each key (i1, i2, i3, i4) represents a unique child checkbox.
   * The value is a boolean indicating whether the checkbox is checked.
   */

  /**
   * we can fetch data from api instead of this object state
   * in real world project we do this
   */

  const [isChildChecked, setChildCheck] = useState({
    i1: false,
    i2: false,
    i3: false,
    i4: false,
  });

  const handleParentChange = (e) => {
    setParentCheck(e.target.checked);
    setChildCheck({
      i1: e.target.checked,
      i2: e.target.checked,
      i3: e.target.checked,
      i4: e.target.checked,
    });
  };

  const handleChildChange = (e) => {
    let childId = e.target.id;
    let isChecked = e.target.checked;

    setChildCheck((prev) => {
      const updated = { ...prev, [childId]: isChecked };
      const allChecked = Object.values(updated).some((val) => val === true);
      setParentCheck(allChecked);
      return updated;
    });
  };

  return (
    <div className="" style={{ marginTop: "20px" }}>
      <Input
        labelClassName="parent-label"
        className="parent-checkbox"
        name="Parent Checkbox"
        id="p1"
        disable={false}
        onChange={handleParentChange}
        checked={isParentChecked}
        item={"Parent Checkbox"}
      />
      <ul>
        <li>
          <Input
            name="item 1"
            id="i1"
            disable={false}
            checked={isChildChecked.i1}
            onChange={handleChildChange}
            item={"Item 1 Checkbox"}
          />
        </li>
        <li>
          <Input
            name="item 2"
            id="i2"
            disable={false}
            checked={isChildChecked.i2}
            onChange={handleChildChange}
            item={"Item 2 Checkbox"}
          />
        </li>
        <li>
          <Input
            name="item 2"
            id="i3"
            disable={false}
            checked={isChildChecked.i3}
            onChange={handleChildChange}
            item={"Item 3 Checkbox"}
          />
        </li>
        <li>
          <Input
            id="i4"
            name="item 4"
            disable={false}
            onChange={handleChildChange}
            item={"Item 4 Checkbox"}
            checked={isChildChecked.i4}
          />
        </li>
      </ul>
    </div>
  );
}

export default App;
