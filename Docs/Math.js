/**
 * @api {get} /math/sum?number=INTEGER_NUMBER (00) Obtener la suma de un número entero dado.
 * @apiVersion 0.0.1
 * @apiName sumMath
 * @apiGroup Math
 * @apiDescription Se envía un valor numérico (entero) via Query Params. A este parametro se le sumará el valor de 1.
 *
 * @apiQuery {Number} number Número entero.
 *
 * @apiSuccess {Object} data Datos de retorno.
 * @apiSuccess {Number} data.sum Suma obternida.
 *
 * @apiSuccessExample {JSON} Success
 * HTTP/1.1 200 Success
 * {
  "data": {
    "sum": 1
  }
}
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiErrorExample {JSON} Número inválido.
 * HTTP/1.1 422 Unprocessable Entity
 * {
  "err": "El número indicado es inválido."
}
 *
 * @apiUse GlobalErrorSystem
 *
 */

/**
 * @api {get} /math/mcm?numbers[]=INTEGER_NUMBER&numbers[]=INTEGER_NUMBER&numbers[]=INTEGER_NUMBER (01) Obtener el mínimo común múltiplo de un listado de números.
 * @apiVersion 0.0.1
 * @apiName mcmMath
 * @apiGroup Math
 * @apiDescription Se envía un listado valores numéricos (enteros) via Query Params. A partir de este se calculará el mínimo común
 * múltiplo (MCM).
 *
 * El listado de números puede enviarse de 2 maneras:
 *
 * - 1. Un arreglo de números. Ejemplo: [1, 2, 3, 4, 5].
 * - 2. Una cadena de texto que contenga los números separados por comas (,). Ejemplo: 1,2,3,4,5
 *
 * @apiQuery {Number[]|String} numbers Listado de números.
 *
 * @apiSuccess {Object} data Datos de retorno.
 * @apiSuccess {Number} data.mcm Suma obternida.
 *
 * @apiSuccessExample {JSON} Success
 * HTTP/1.1 200 Success
 * {
  "data": {
    "mcm": 60
  }
}
 *
 * @apiUse GlobalParamsErrors
 *
 * @apiErrorExample {JSON} Listado de números inválido.
 * HTTP/1.1 422 Unprocessable Entity
 * {
  "err": "Listado de números inválido."
}
 *
 * @apiErrorExample {JSON} Número de la lista incorrecto
 * HTTP/1.1 422 Unprocessable Entity
 * {
  "err": "Uno de los números de la lista es incorrecto."
}
 *
 * @apiErrorExample {JSON} Menor a 2 valores
 * HTTP/1.1 422 Unprocessable Entity
 * {
  "err": "La lista de números debe contener al menos 2 valores."
}
 *
 * @apiUse GlobalErrorSystem
 *
 */
