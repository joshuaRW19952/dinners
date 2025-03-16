import placeholder from '../../../../assets/placeholder.jpg';
import './DinnerCard.css';
import PropTypes from 'prop-types';

export const DinnerCard = props => {
  const { name, type, time } = props;
  return (
    <div>
      <img src={placeholder}></img>
      <span>{name}</span>
      <span>{type}</span>
      <span>{time}</span>
    </div>
  );
};

DinnerCard.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  time: PropTypes.string,
};
