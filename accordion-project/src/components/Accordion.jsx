import { useState } from "react";
import AccordionPanel from "./AccordionContent";

function Accordion({ data, defaultExpand }) {
  const [expandedId, setExpandedId] = useState(defaultExpand);

  // does not create a new function
  const handleToggle = (id) => () => {
    setExpandedId((prev) => (prev === id ? false : id));
  };

  return (
    <>
      <div className="accordion-container">
        {data.map((item) => {
          return (
            <AccordionPanel
              key={item.id}
              data={item}
              {...item}
              onToggle={() => handleToggle(item.id)}
              expanded={expandedId === item.id} // return boolean based on the expanded click
              defaultExpand={defaultExpand}
            />
          );
        })}
      </div>
    </>
  );
}

export default Accordion;
