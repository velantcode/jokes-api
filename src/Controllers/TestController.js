import { getResponse, getResponseError } from '../Functions/GlobalFunctions';

/*
  Example method for controller
 */

const path = 'Controllers/TestController';

export function myTest(req, res) {
  try {
    return getResponse(res, { msg: 'Welcome to API.' });
  } catch (e) {
    return getResponseError(res, e, `${path}/myTest`);
  }
}

export default {
  myTest,
};
