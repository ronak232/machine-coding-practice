import { ChevronUp, ChevronDown } from "lucide-react";

function AccordionPanel({ data, onToggle, expanded }) {
  return (
    <>
      <div className="accordion-item" aria-expanded={expanded}>
        <div className="accordion-header">
          <h2>{data.question}</h2>
          <button
            className="close"
            onClick={onToggle(data.id)}
            aria-controls="panel-content"
          >
            {expanded ? (
              <ChevronUp size={"25"} color="white" className="control-arrow up" />
            ) : (
              <ChevronDown size="25" color="white" className="control-arrow down" />
            )}
          </button>
        </div>
        <div className="accordion-body" defaultValue={false}>
          <div
            className={`accordion-content ${expanded ? "show" : "collapsed"}`}
          >
            <p>{data?.answer}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccordionPanel;
