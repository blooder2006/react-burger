import PropTypes from "prop-types";

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

checkResponse.propTypes = {
  res: PropTypes.object.isRequired,
};
