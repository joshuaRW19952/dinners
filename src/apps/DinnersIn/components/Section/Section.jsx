/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    exclusions.includes(selection?.name) && onRandom();
  }, [exclusions]);

  const handleItemInclusion = (exclude, name) => {
    if (exclude && !exclusions.includes(name)) {
      setExclusions([...exclusions, name]);
    } else if (!exclude) {
      setExclusions(exclusions.filter(excluded => excluded !== name));
    }
  };

  const { excludedDinners, includedDinners } = dinners.reduce((acc, curr) => {
    if (exclusions.includes(curr.name)) return { ...acc, excludedDinners: [...acc.excludedDinners, curr] };
    return { ...acc, includedDinners: [...acc.includedDinners, curr] };
  }, { excludedDinners: [], includedDinners: [] });

  const renderDinners = (dinnersToRender, excluded) => dinnersToRender.map(dinner => {
    const { name } = dinner;
    return  <Item key={name} name={name} onClick={handleItemInclusion} isExcluded={excluded} isSelection={name === selection?.name} />;
  });



  const content = (
    <div className="section-content-wrapper">
      <div className="section-content">
        <div className="subsection">
          <span className="subsection-title">included</span>
          <div className="included-dinners">{renderDinners(includedDinners)}</div>
        </div>
        {excludedDinners.length > 0 ? (
          <div className="subsection">
            <span className="subsection-title">excluded</span>
            <div className="excludedDinners">{renderDinners(excludedDinners, true)}</div>
          </div>
        ) : null}
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
