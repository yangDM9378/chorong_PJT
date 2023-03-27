/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/function-component-definition */
import { useState } from 'react';
import { Link } from 'react-router-dom';

const DevDropDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onToggle = () => setIsOpen(!isOpen);
  const onOptionClicked = () => {
    setIsOpen(false);
  };
  return (
    <div className="inline-block text-left">
      <button
        className="inline-flex px-4 py-1 text-lg font-bold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        type="button"
        onClick={onToggle}
      >
        Div
      </button>
      <div>
        <ul className="absolute z-10 w-20 bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          {isOpen && (
            <>
              <li>
                <Link to="/" onClick={onOptionClicked}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/stage" onClick={onOptionClicked}>
                  stage
                </Link>
              </li>
              <li>
                <Link to="/map/1" onClick={onOptionClicked}>
                  광주맵
                </Link>
              </li>
              <li>
                <Link to="/map/2" onClick={onOptionClicked}>
                  싸피맵
                </Link>
              </li>
              <li>
                <Link to="/camera" onClick={onOptionClicked}>
                  카메라
                </Link>
              </li>
              <li>
                <Link to="/culturalpropertydetail" onClick={onOptionClicked}>
                  문화재정보
                </Link>
              </li>
              <li>
                <Link to="/quiz" onClick={onOptionClicked}>
                  퀴즈
                </Link>
              </li>
              <li>
                <Link to="/quizsocre" onClick={onOptionClicked}>
                  퀴즈점수
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DevDropDown;
