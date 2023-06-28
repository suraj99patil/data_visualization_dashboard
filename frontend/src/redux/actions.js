import axios from 'axios';

export const FETCH_CHART_DATA_REQUEST = 'FETCH_CHART_DATA_REQUEST';
export const FETCH_CHART_DATA_SUCCESS = 'FETCH_CHART_DATA_SUCCESS';
export const FETCH_CHART_DATA_FAILURE = 'FETCH_CHART_DATA_FAILURE';

export const fetchChartData = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CHART_DATA_REQUEST });
    try {
      const response = await axios.get('http://localhost:3000/api/test/chart'); // Update the URL to include the backend server URL
      dispatch({
        type: FETCH_CHART_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_CHART_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};
