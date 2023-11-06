import { getResponse, getResponseError } from '../Functions/GlobalFunctions';

const path = 'src/Controllers/MathController';

const mcd = (a, b) => (b === 0 ? a : mcd(b, a % b));

const mcm = (a, b) => (a * b) / mcd(a, b);

export async function getSumNumber(req, res) {
  try {
    let { number } = req.query;

    if (!number || number?.match('^[0-9]+$') === null)
      return getResponse(res, { status: 422, err: 'El número indicado es inválido.' });

    number = parseInt(number, 10);

    return getResponse(res, { data: { sum: number + 1 } });
  } catch (e) {
    return getResponseError(res, e, `${path}/getSumNumber`);
  }
}

export async function getMCM(req, res) {
  try {
    let { numbers } = req.query;

    if (!numbers || (!Array.isArray(numbers) && typeof numbers === 'string' && !numbers?.split(',')?.length)) {
      return getResponse(res, { status: 422, err: 'Listado de números inválido.' });
    }

    if (numbers?.includes(',')) numbers = numbers.split(',').map((v) => v?.trim());

    if (numbers.length < 2)
      return getResponse(res, { status: 422, err: 'La lista de números debe contener al menos 2 valores.' });

    // sort
    numbers = numbers.sort();

    // check numbers
    const invalidNumbers = numbers.some((v) => v?.match('^[0-9]+$') === null);
    if (invalidNumbers) return getResponse(res, { status: 422, err: 'Uno de los números de la lista es incorrecto.' });

    numbers = numbers.map((n) => Number.parseInt(n, 10));

    const data = numbers.reduce(mcm);

    return getResponse(res, { data: { mcm: data } });
  } catch (e) {
    return getResponseError(res, e, `${path}/getMCM`);
  }
}

export default {
  getSumNumber,
  getMCM,
};
