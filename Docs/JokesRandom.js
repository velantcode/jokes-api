/**
 * @api {get} /jokes/random/:type? (00) Obtener un chiste aleatorio de API remota.
 * @apiVersion 0.0.1
 * @apiName getJokesRandom
 * @apiGroup JokesRandom
 *
 * @apiDescription Se obtiene un chiste aleatorio de una API remota. Opcionalmente, puede enviarse un parámetro, para poder
 * obtener un chiste de una API en específico.
 *
 * @apiParam {String|Null} type Fuente de donde se obtendrá el chiste. Valores:
 * - Chuck: Para obtener un chiste de la api: https://api.chucknorris.io/
 * - Dad: Para obtener un chiste de la api: https://icanhazdadjoke.com/
 *
 * El parámetro es opcional, en caso de no ser enviado, se tomará un chiste aleatoriamente de alguna de las 2 APIs.
 *
 * @apiSuccess {Object} data Datos de retorno.
 * @apiSuccess {Number} data.joke Chiste obternido.
 *
 * @apiSuccessExample {JSON} Success random
 * HTTP/1.1 200 Success
 * {
  "data": {
    "joke": "Chuck Norris' drumset is all cowbell."
  }
}
 *
 * @apiSuccessExample {JSON} Success type=Chuck
 * HTTP/1.1 200 Success
 * {
  "data": {
    "joke": "When Chuck Norris goes swimming sharks hear scary music."
  }
}
 *
 * @apiSuccessExample {JSON} Success type=Dad
 * HTTP/1.1 200 Success
 * {
  "data": {
    "joke": "Have you heard about the owl sanctuary job opening? It’s all night shifts but they’re all a hoot over there."
  }
}
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiErrorExample {JSON} Tipo referencia inválido.
 * HTTP/1.1 422 Unprocessable Entity
 * {
  "err": "Tipo de referencia inválido."
}
 *
 * @apiUse GlobalErrorSystem
 *
 */
