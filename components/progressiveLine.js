import React, { useEffect, useState } from "react";

const ProgressLine = ({
  label,
  backgroundColor = "#e5e5e5",
  visualParts = [
    {
      percentage: "0%",
      color: "white"
    }
  ]
}) => {
  const [widths, setWidths] = useState(
    visualParts.map(() => {
      return 0;
    })
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidths(
        visualParts.map(item => {
          return item.percentage;
        })
      );
    });
  }, [visualParts, widths]);

  return (
    <>
    <div className="progressLabel">{label}</div>
        <div className="progressVisualFull" style={{ backgroundColor }}>
        {visualParts.map((item, index) => {
            return (
            <div
                key={index}
                style={{
                width: widths[index],
                backgroundColor: item.color
                }}
                className="progressVisualPart"
            />
            );
        })}
    </div>
    <style jsx>{`
      .progressVisualFull {
        display: flex;
        height: 6px;
        margin: 20px 0;
      }
      
      .progressVisualPart {
        transition: width 2s;
      }
        
      .progressLabel {
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      }
    `}</style>
    </>
  );
};

export default ProgressLine;
