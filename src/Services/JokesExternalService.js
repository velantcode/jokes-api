import { getData } from './AxiosService';
import { showConsoleError } from '../Functions/GlobalFunctions';

const pathFile = 'Services/JokesExternalService';

const ENDPOINTS = {
  chuck: 'https://api.chucknorris.io/jokes/random',
  dad: 'https://icanhazdadjoke.com',
};

export async function getRandomJoke(type = 'chuck') {
  try {
    const endpoint = ENDPOINTS[type];
    if (!endpoint) return { success: false, status: 422, error: 'Invalid param!' };
    return await getData(endpoint);
  } catch (e) {
    showConsoleError(pathFile, e);
    return { success: false, error: e.toString() };
  }
}

export default { getRandomJoke };
