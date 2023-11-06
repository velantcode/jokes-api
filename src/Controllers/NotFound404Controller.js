import { getResponseError } from '../Functions/GlobalFunctions';

const path = 'Controllers/NotFound404Controller';

export async function show404Messages(req, res) {
  try {
    return res.status(404).json({ err: 'Not found.' });
  } catch (e) {
    return getResponseError(res, e, `${path}/show404Messages`);
  }
}

export default {
  show404Messages,
};
