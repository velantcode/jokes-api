function checkTitlesOrDescriptions(value) {
  return value && /^[a-zA-ZÁÉÍÓÚÀÈÌÒÙàèìòùáéíóúÂÊÎÔÛâêîôûÄËÏÖÜäëïöüñÑ0-9\s.,#*?¿¡!()\-+"'/@]{3,2000}/g.test(`${value}`);
}

export function checkJokeParams({ joke }) {
  const ret = {
    data: {}, // object to validated data
    err: undefined,
  };

  // add yours validations for your vars
  if (typeof joke !== 'string' || !checkTitlesOrDescriptions(joke)) {
    ret.err = 'El texto del chiste es incorrecto.';
  } else ret.data.joke = joke?.trim();

  return ret;
}

export default { checkJokeParams };
