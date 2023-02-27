import PropTypes from "prop-types";

export const ingredientsPropTypes = PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
      }).isRequired;
    

 