import { useState } from "react";
import AccordionPanel from "./AccordionContent";

function Accordion({ data, defaultExpand }) {
  const [expandedId, setExpandedId] = useState(defaultExpand ?? []);

  // does not create a new function
  const handleToggle = (id) => () => {
    setExpandedId((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
    console.log("expanded ids ", expandedId);
  };

  const handleExpand = () => {
    const allExpanded = data.map((item) => item.id);
    setExpandedId(allExpanded);
  };
  const handleCollapse = () => {
    setExpandedId([]);
  };

  return (
    <>
      <div className="accordion-container">
        <div className="accordion-controller">
          <button onClick={handleExpand}>Expand</button>
          <button onClick={handleCollapse}>Collapse</button>
        </div>
        {data.map((item) => {
          return (
            <AccordionPanel
              key={item.id}
              data={item}
              {...item}
              onToggle={() => handleToggle(item.id)}
              expanded={expandedId.includes(item.id)} // return boolean based on the expanded click
              defaultExpand={defaultExpand}
            />
          );
        })}
      </div>
    </>
  );
}

export default Accordion;
