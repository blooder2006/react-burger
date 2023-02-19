import PropTypes from "prop-types";

export const checkReponse = (res, state, setState) => {
    
    return res.ok
      ? res.json() 
      : res.json().then((err) => {
          Promise.reject(err);
          setState({ ...state, error: err.message });
          
        });
  };

  checkReponse.propTypes = { 
    res: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    setState: PropTypes.func.isRequired,
};