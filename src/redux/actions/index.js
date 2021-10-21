export const NAME = 'NAME';
export const EMAIL = 'EMAIL';

export const sendName = (payload) => ({ type: NAME, payload });
export const sendEmail = (payload) => ({ type: EMAIL, payload });

/* / action creator data from API Trivia
export function getCoin(data) {
  return {
    type: GET_API_DATA,
    payload: data,
  };
}

export function faildedRequest(error) {
  return {
    type: FAILED_REQUEST,
    payload: error,
  };
}

export function fetchDataAction() {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return async (dispatch) => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      return dispatch(getCoin(data));
    } catch (error) {
      dispatch(faildedRequest(error));
    }
  };
} */
