/**
 * @apiDefine GlobalParamsErrors
 *
 * @apiError {String} err Mensaje de error
 * @apiError {Object[]} errors Listado de errores en caso de existir.
 */

/**
 * @apiDefine GlobalErrorSystem
 *
 * @apiErrorExample {JSON} Error server
 * HTTP/1.1 500 Error Internal Server
 * {
    "err": "error message",
}
 */

/**
 * @apiDefine ErrorNotFound
 *
 * @apiErrorExample {JSON} Not found
 * HTTP/1.1 404 Not Found
 * {
  "err": "Ruta no existe.",
}
 *
 */
