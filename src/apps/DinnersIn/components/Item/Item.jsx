import PropTypes from 'prop-types';
import { CheckMd } from '../icons/CheckMd';
import { CloseMd } from '../icons/CloseMd';
import './Item.css';

export const Item = props => {
  const { name, onClick, isExcluded } = props;
  return (
    <div className={`item ${isExcluded ? 'excluded' : 'not-excluded'}`}>
      <span className="item-name">{name}</span>
      <div className="controls">
        <button className="control control-check" type="button" onClick={() => onClick(false, name)}><CheckMd /></button>
        <button className="control control-x" type="button" onClick={() => onClick(true, name)}><CloseMd /></button>
      </div>
    </div>
  );
};

Item.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  isExcluded: PropTypes.bool,
};
