import { checkJokeParams } from '../FormRequest/JokesLocalFormRequest';
import { JOKES_TYPES } from '../Functions/Constans';
import { getResponse, getResponseError } from '../Functions/GlobalFunctions';
import GeneralJokes from '../Models/GeneralJokes';
import { getRandomJoke } from '../Services/JokesExternalService';

const path = 'src/Controllers/Jokes';

function getRandomValue() {
  return Math.random() >= 0.5 ? 1 : 0;
}

function getModelJoke(value, isRandom = false) {
  if (!value) return null;
  if (isRandom) return { joke: value.value || value.joke };
  return {
    id: value.id,
    joke: value.joke,
    created_at: value.created_at,
    updated_at: value.updated_at,
  };
}

export async function getJoke(req, res) {
  try {
    let { type } = req.params;

    if (type && !JOKES_TYPES.includes(type?.toLowerCase())) {
      return getResponse(res, { status: 422, err: 'Tipo de referencia inválido.' });
    }
    if (!type) {
      const random = getRandomValue();
      type = JOKES_TYPES[random];
    }

    const response = await getRandomJoke(type.toLowerCase());

    if (!response.success) return getResponse(res, response);

    const data = getModelJoke(response.data, true);

    return getResponse(res, { data });
  } catch (e) {
    return getResponseError(res, e, `${path}/getJoke`);
  }
}

export async function createJokes(req, res) {
  try {
    const { data, err } = checkJokeParams(req.body);

    if (err) return getResponse(res, { status: 422, err });

    const totals = await GeneralJokes.find().countDocuments().exec();

    const joke = new GeneralJokes({
      id: totals + 1,
      joke: data.joke,
    });
    await joke.save();

    return getResponse(res, { status: 201, msg: '¡Chiste guardado!', data: getModelJoke(joke) });
  } catch (e) {
    return getResponseError(res, e, `${path}/createJokes`);
  }
}

export async function getListJokesLocal(req, res) {
  try {
    const data = await GeneralJokes.find({}, { _id: 0, __v: 0 }).exec();
    return getResponse(res, { data });
  } catch (e) {
    return getResponseError(res, e, `${path}/getListJokesLocal`);
  }
}

export async function showJokes(req, res) {
  try {
    let { id } = req.params;

    if (Number.isNaN(Number(id?.trim())))
      return getResponse(res, { status: 422, err: 'El chiste seleccionado es inválido.' });

    id = parseInt(id, 10);

    const joke = await GeneralJokes.findOne({ id }, { _id: 0, __v: 0 }).exec();

    if (!joke) return getResponse(res, { status: 404, err: '¡Chiste no encontrado!' });

    return getResponse(res, { data: getModelJoke(joke) });
  } catch (e) {
    return getResponseError(res, e, `${path}/showJokes`);
  }
}

export async function updateJokes(req, res) {
  try {
    let { id } = req.params;
    if (Number.isNaN(Number(id?.trim())))
      return getResponse(res, { status: 422, err: 'El chiste seleccionado es inválido.' });

    const { data, err } = checkJokeParams(req.body);

    if (err) return getResponse(res, { status: 422, err });

    id = parseInt(id, 10);

    const joke = await GeneralJokes.findOne({ id }, { __v: 0 }).exec();

    if (!joke) return getResponse(res, { status: 404, err: '¡Chiste no encontrado!' });

    joke.joke = data.joke;
    await joke.save();

    return getResponse(res, { msg: '¡Chiste actualizado!', data: getModelJoke(joke) });
  } catch (e) {
    return getResponseError(res, e, `${path}/updateJokes`);
  }
}

export async function removeJokes(req, res) {
  try {
    let { id } = req.params;
    if (Number.isNaN(Number(id?.trim())))
      return getResponse(res, { status: 422, err: 'El chiste seleccionado es inválido.' });

    id = parseInt(id, 10);

    GeneralJokes.deleteOne({ id }).exec();

    return getResponse(res, { msg: 'Chiste eliminado exitosamente.' });
  } catch (e) {
    return getResponseError(res, e, `${path}/removeJokes`);
  }
}

export default {
  createJokes,
  getJoke,
  getListJokesLocal,
  removeJokes,
  showJokes,
  updateJokes,
};
