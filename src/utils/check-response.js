import PropTypes from "prop-types";

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
};

checkResponse.propTypes = {
  res: PropTypes.object.isRequired,
};
