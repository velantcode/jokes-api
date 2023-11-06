import Axios from 'axios';
import { showConsoleError } from '../Functions/GlobalFunctions';

const pathFile = 'Services/AxiosService';

const headers = {
  Accept: 'application/json',
};

const axios = Axios.create({ withCredentials: false });

function getErrorCatch(error) {
  const ret = {
    error: 'Error desconocido.',
    status: null,
    extraData: null,
  };

  if (error) {
    showConsoleError(pathFile, error);
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    if (error.response) {
      if (error.response.status) ret.status = error.response.status;

      if (error.response.data) {
        const { data } = error.response;

        if (data) ret.error = data.mss || data.err || error.toString();
        else ret.error = 'Error desconocido.';
      } else ret.error = error.toString() || 'Error desconocido.';
    } else ret.error = error.toString();
  }

  return ret;
}

/**
 * @function getData
 * @param {String} endpoint Endpoint to request.
 * @param {Object|Null} params Optional query params (optional).
 * @return {Object} response Response data or error.
 */
export async function getData(endpoint, params = {}) {
  const controller = new AbortController();
  const { signal } = controller;
  try {
    const res = await axios.get(endpoint, { params, signal, headers });
    return { success: true, data: res.data };
  } catch (e) {
    controller.abort();
    return { success: false, ...getErrorCatch(e) };
  }
}

export default {
  getData,
};
