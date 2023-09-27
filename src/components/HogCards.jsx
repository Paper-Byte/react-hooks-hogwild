import React, { useState } from 'react';

const HogCard = ({ hog, isHidden }) => {
  const [showMe, setShowMe] = useState(false);
  if (hog.isHidden === false) {
    return (
      <div className="four wide column">
        <div className="ui card" onClick={() => setShowMe(!showMe)}>
          <div className="image">
            <img src={hog.image} alt={hog.name} />
          </div>
          <div className="content">
            <h2>{hog.name}</h2>
            {showMe ? (
              <>
                <hr
                  border-top="8px solid #bbb"
                  border-radius="5px"
                ></hr>
                <div className="meta">
                  <span>
                    {hog.greased ? 'Is greasy' : 'Not greasy'}
                  </span>
                </div>
                <div className="description">{hog.specialty}</div>
                <span>Weight: {hog.weight}Kg</span>
                <div className="extra content">
                  Highest medal achieved:
                  {` ${hog['highest medal achieved']}`}
                </div>
                <button
                  onClick={() => isHidden(hog.name)}
                  className="ui red button"
                >
                  Hide Me!
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default HogCard;
