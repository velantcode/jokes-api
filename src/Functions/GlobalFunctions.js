import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function showConsoleError(pathFile, error) {
  console.error(`${dayjs().toISOString()} - Error: ${pathFile}`);
  console.error(`${error}`);
}

export function showConsoleLog(msg) {
  console.log(`${dayjs().toISOString()} - ${msg}`);
}

export function getResponseError(res, err, pathFile) {
  showConsoleError(`${pathFile}`, err);
  return res.status(500).json({
    err: err?.toString() || 'Error desconocido.',
  });
}

export function getResponse(res, { data, errors, err, msg, status } = {}) {
  return res.status(status || 200).json({ msg, data, err, errors });
}

export default {
  getResponse,
  getResponseError,
  showConsoleError,
  showConsoleLog,
};
