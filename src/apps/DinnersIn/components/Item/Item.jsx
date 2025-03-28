import PropTypes from 'prop-types';
import { CheckMd } from '../icons/CheckMd';
import { CloseMd } from '../icons/CloseMd';
import './Item.css';

export const Item = props => {
  const { name, onClick, isExcluded, isSelection } = props;

  const renderControl = () => {
    return isExcluded ? (
      <button className="control" type="button" onClick={() => onClick(false, name)}>
        <CheckMd />
      </button>
    ) : (
      <button className="control" type="button" onClick={() => onClick(true, name)}>
        <CloseMd />
      </button>
    );
  };

  return (
    <div className={`item ${isSelection ? 'selected' : ''}`}>
      <span className="item-name">{name}</span>
      <div className="controls">
        {renderControl()}
      </div>
    </div>
  );
};

Item.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  isExcluded: PropTypes.bool,
  isSelection: PropTypes.bool,
};
