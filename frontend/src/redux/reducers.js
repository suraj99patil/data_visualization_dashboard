// reducers.js
import {
  FETCH_CHART_DATA_REQUEST,
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_FAILURE,
} from './actions';

const initialState = {
  chartData: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHART_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CHART_DATA_SUCCESS:
      return { ...state, loading: false, chartData: action.payload };
    case FETCH_CHART_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
