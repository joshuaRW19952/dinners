import PropTypes from 'prop-types';
import { useState } from 'react';
import { ChevronRightLg } from '../icons/ChevronRightLg';
import { Item } from '../Item/Item';
import { getRandomElement } from '../../utils';
import './Section.css';

export const Section = props => {
  const { type, dinners = [], selection, setSelection, exclusions, setExclusions } = props;
  const [open, setOpen] = useState(true);

  const onRandom = () => {
    const dinner = getRandomElement(dinners.filter(dinner => dinner.name !== selection?.name && !exclusions.includes(dinner.name)));
    setSelection(dinner || selection);
  };

  const handleItemInclusion = (exclude, name) => {
    if (exclude && !exclusions.includes(name)) {
      setExclusions([...exclusions, name]);
    } else if (!exclude) {
      setExclusions(exclusions.filter(excluded => excluded !== name));
    }
  };

  const content = (
    <div className="section-content-wrapper">
      <div className="section-content">
        {dinners.map(dinner => {
          const { name } = dinner;
          return  <Item key={name} name={name} onClick={handleItemInclusion} isExcluded={exclusions.includes(name)} />;
        })}
        <div className="section-content-bottom">
          <div className="selection">
            <span>{selection?.name}</span>
            <div className="selection-details">
              <span>
                <span>time: </span>
                <span>{selection?.time}</span>
              </span>
              <span>
                <span>ingredients: </span>
                <span>{selection?.ingredients}</span>
              </span>
              <span>
                <span>sides: </span>
                <span>{selection?.sides}</span>
              </span>
            </div>
          </div>
          <div className="selection-controls">
            <button type="button" onClick={onRandom}>random</button>
            <button type="button" onClick={() => setExclusions([])}>clear exclusions</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`section ${open ? 'open' : ''}`.trim()}>
      <div type="button" className="section-controller" onClick={() => setOpen(!open)}>
        <span>{type}</span>
        <ChevronRightLg />
      </div>
      {open ? content : null}
    </div>
  ) ;
};

Section.propTypes = {
  type: PropTypes.string,
  dinners: PropTypes.array,
  selection: PropTypes.object,
  setSelection: PropTypes.func,
  exclusions: PropTypes.array,
  setExclusions: PropTypes.func,
};
