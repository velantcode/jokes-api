/**
 * @api {get} /jokes (00) Obtener listado de chistes registrados.
 * @apiVersion 0.0.1
 * @apiName listJokes
 * @apiGroup Jokes
 *
 * @apiSuccess {Object[]} data Datos de retorno.
 *
 * @apiSuccess {Number} data.id ID del chiste.
 * @apiSuccess {String} data.joke Chiste.
 *
 * @apiSuccessExample {JSON} Success
 * HTTP/1.1 200 Success
 * {
  "data": [
    {
      "id": 1,
      "joke": "Joke 1"
    },
    .
    .
    .
  ]
}
 *
 * @apiSuccessExample {JSON} Success empty list
 * HTTP/1.1 200 Success
 * {
  "data": []
}
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiUse GlobalErrorSystem
 *
 */

/**
 * @api {post} /jokes (01) Registrar nuevo chiste.
 * @apiVersion 0.0.1
 * @apiName createJokes
 * @apiGroup Jokes
 *
 * @apiBody {String} joke Chiste a registrar.
 *
 * @apiExample {JSON} Example JSON Request
 * {
  "joke": "Joke 1"
}
 *
 * @apiSuccess {String} msg Mensaje de retorno.
 * @apiSuccess {Object} data Datos de retorno.
 *
 * @apiSuccess {Number} data.id ID del chiste.
 * @apiSuccess {String} data.joke Chiste.
 *
 * @apiSuccessExample {JSON} Success
 * HTTP/1.1 201 Created
 * {
  "msg": "¡Chiste guardado!",
  "data": {
    "id": 1,
    "joke": "Joke 1"
  }
}
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiErrorExample {JSON} Error en los parámentros
 * HTTP/1.1 422 Unprocessable Entity
 * {
  "err": "¡Error en los parámetros!",
  "errors": [
    {
      "err": "El texto del chiste es incorrecto..",
      "input": "joke"
    }
  ]
}
 *
 * @apiUse GlobalErrorSystem
 *
 */

/**
 * @api {get} /jokes/:jokeId (02) Obtener detalles de un chiste.
 * @apiVersion 0.0.1
 * @apiName showJokes
 * @apiGroup Jokes
 *
 * @apiParam {Number} jokeId ID del chiste.
 *
 * @apiSuccess {Object} data Datos de retorno.
 *
 * @apiSuccess {Number} data.id ID del chiste.
 * @apiSuccess {String} data.joke Chiste.
 *
 * @apiSuccessExample {JSON} Success
 * HTTP/1.1 200 Success
 * {
  "data": {
    "id": 1,
    "joke": "Joke 1"
  }
}
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiErrorExample {JSON} ID inválido.
 * HTTP/1.1 422 Unprocessable Entity
 * {
  "err": "El chiste seleccionado es inválido."
}
 *
 * @apiErrorExample {JSON} No existe.
 * HTTP/1.1 404 Not Found
 * {
  "err": "¡Chiste no enconrado!"
}
 *
 * @apiUse GlobalErrorSystem
 *
 */

/**
 * @api {put} /jokes/:jokeId (03) Actualizar un chiste.
 * @apiVersion 0.0.1
 * @apiName updateJokes
 * @apiGroup Jokes
 *
 * @apiParam {Number} jokeId ID del chiste.
 *
 * @apiBody {String} joke Chiste a actualizar.
 *
 * @apiExample {JSON} Example JSON Request
 * {
  "joke": "Joke 1 updated!"
}
 *
 * @apiSuccess {String} msg Mensaje de retorno.
 * @apiSuccess {Object} data Datos de retorno.
 *
 * @apiSuccess {Number} data.id ID del chiste.
 * @apiSuccess {String} data.joke Chiste.
 *
 * @apiSuccessExample {JSON} Success
 * HTTP/1.1 200 Success
 * {
  "msg": "¡Chiste actualizado!",
  "data": {
    "id": 1,
    "joke": "Joke 1 updated!"
  }
}
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiErrorExample {JSON} Error en los parámetros.
 * HTTP/1.1 422 Unprocessable Entity
 * {
  "err": "¡Error en los parámetros",
  "errors": [
    {
      "err": "El texto del chiste es incorrecto..",
      "input": "joke"
    }
  ]
}
 *
 *
 * @apiErrorExample {JSON} ID inválido.
 * HTTP/1.1 422 Unprocessable Entity
 * {
  "err": "El chiste seleccionado es inválido."
}
 *
 * @apiErrorExample {JSON} No existe
 * HTTP/1.1 404 Not Found
 * {
  "err": "¡Chiste no encontrado!"
}
 *
 * @apiUse GlobalErrorSystem
 *
 */

/**
 * @api {delete} /jokes/:jokeId (04) Eliminar un chiste.
 * @apiVersion 0.0.1
 * @apiName deleteJokes
 * @apiGroup Jokes
 *
 * @apiParam {Number} jokeId ID del chiste.
 *
 * @apiSuccess {String} msg Mensaje de retorno.
 *
 * @apiSuccessExample {JSON} Success
 * HTTP/1.1 200 Success
 * {
  "msg": "Chiste eliminado exitosamente.",
}
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiErrorExample {JSON} ID inválido.
 * HTTP/1.1 422 Unprocessable Entity
 * {
  "err": "El chiste seleccionado es inválido."
}
 *
 * @apiUse GlobalErrorSystem
 *
 */
