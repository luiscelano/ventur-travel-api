/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config/database.js":
/*!********************************!*\
  !*** ./src/config/database.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const dotenv = __webpack_require__(/*! dotenv */ "dotenv");
const path = __webpack_require__(/*! path */ "path");
dotenv.config({
  path: path.resolve(path.dirname(''), `.env.${"development" || 0}`)
  // path: __dirname.replace('src/config', '.env.development')
});

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: 'Amazon RDS'
    },
    pool: {
      maxConnections: 5,
      maxIdleTime: 30
    },
    maxConcurrentQueries: 100
  },
  test: {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE
  }
};

/***/ }),

/***/ "./src/controllers/auth.controller.js":
/*!********************************************!*\
  !*** ./src/controllers/auth.controller.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAccess: () => (/* binding */ createAccess),
/* harmony export */   getAccessList: () => (/* binding */ getAccessList),
/* harmony export */   getAccessToken: () => (/* binding */ getAccessToken),
/* harmony export */   refreshTokens: () => (/* binding */ refreshTokens),
/* harmony export */   userLogin: () => (/* binding */ userLogin),
/* harmony export */   userLogout: () => (/* binding */ userLogout),
/* harmony export */   userSignUp: () => (/* binding */ userSignUp)
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ "bcrypt");
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_generateAccessToken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/generateAccessToken */ "./src/utils/generateAccessToken.js");
/* harmony import */ var _utils_generateRefreshToken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/generateRefreshToken */ "./src/utils/generateRefreshToken.js");
/* harmony import */ var _db_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../db/models */ "./src/db/models/index.js");
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../schemas */ "./src/schemas/index.js");
/* harmony import */ var _utils_getSchemaErrors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getSchemaErrors */ "./src/utils/getSchemaErrors.js");
/* harmony import */ var _utils_generateRandomCode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/generateRandomCode */ "./src/utils/generateRandomCode.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./.. */ "./src/index.js");









const refreshTokens = []; // will be stored in Redis DB

const userLogin = async (req, res) => {
  const inputSchema = _schemas__WEBPACK_IMPORTED_MODULE_5__.LoginInput.newContext();
  const cleanedInput = inputSchema.clean(req.body);
  inputSchema.validate(cleanedInput);
  if (!inputSchema.isValid()) {
    const error = (0,_utils_getSchemaErrors__WEBPACK_IMPORTED_MODULE_6__.getSchemaErrors)(inputSchema);
    return res.status(422).json({
      error
    });
  }
  const response = await _db_models__WEBPACK_IMPORTED_MODULE_4__.Usuario.findOne({
    where: {
      correo: req.body.correo
    },
    include: [{
      model: _db_models__WEBPACK_IMPORTED_MODULE_4__.TipoUsuario,
      as: 'permiso'
    }]
  });
  if (!response) return res.status(404).send({
    message: 'Correo y/o contraseña incorrecta'
  });
  const user = response.toJSON();
  try {
    if (await bcrypt__WEBPACK_IMPORTED_MODULE_1___default().compare(req.body.contrasenia, user.contrasenia)) {
      const cleanedOutput = _schemas__WEBPACK_IMPORTED_MODULE_5__.Usuario.clean(user);
      const accessToken = (0,_utils_generateAccessToken__WEBPACK_IMPORTED_MODULE_2__["default"])({
        user: cleanedOutput
      });
      const refreshToken = (0,_utils_generateRefreshToken__WEBPACK_IMPORTED_MODULE_3__["default"])({
        user: cleanedOutput
      });
      refreshTokens.push(refreshToken);
      return res.status(200).json({
        usuario: cleanedOutput,
        accessToken,
        refreshToken
      });
    } else {
      return res.status(404).json({
        message: 'Correo y/o contraseña incorrecta'
      });
    }
  } catch {
    res.status(405).send();
  }
};
const userSignUp = async (req, res) => {
  try {
    const inputSchema = _schemas__WEBPACK_IMPORTED_MODULE_5__.UserSignUpInput.newContext();
    const cleanedInput = inputSchema.clean(req.body);
    inputSchema.validate(cleanedInput);
    if (!inputSchema.isValid()) {
      const errors = (0,_utils_getSchemaErrors__WEBPACK_IMPORTED_MODULE_6__.getSchemaErrors)(inputSchema);
      return res.status(422).json({
        errors
      });
    }
    const authorizationResponse = await _db_models__WEBPACK_IMPORTED_MODULE_4__.Autorizacion.findOne({
      where: {
        authorization_code: req.body.authorizationCode,
        correo: req.body.correo,
        aceptado: false
      }
    });
    if (!authorizationResponse) return res.status(404).json({
      message: 'Código de autorización inválido o ya ha sido utilizado'
    });
    const autorizacion = authorizationResponse.toJSON();
    const salt = await bcrypt__WEBPACK_IMPORTED_MODULE_1___default().genSalt();
    const hashedPassword = await bcrypt__WEBPACK_IMPORTED_MODULE_1___default().hash(req.body.contrasenia, salt);
    console.log('salt', salt);
    console.log('hashedPassword', hashedPassword);
    Object.assign(cleanedInput, {
      contrasenia: hashedPassword,
      id_tipo_usuario: autorizacion.id_tipo_usuario
    });
    const userResponse = await _db_models__WEBPACK_IMPORTED_MODULE_4__.Usuario.create(cleanedInput, {
      include: {
        model: _db_models__WEBPACK_IMPORTED_MODULE_4__.TipoUsuario,
        as: 'permiso'
      }
    });
    if (!userResponse) return res.status(400).json({
      message: 'Error al crear usuario'
    });
    const permiso = await userResponse.getPermiso();
    const user = userResponse.toJSON();
    Object.assign(user, {
      permiso: permiso.toJSON()
    });
    const cleanedOutput = _schemas__WEBPACK_IMPORTED_MODULE_5__.Usuario.clean(user);
    const accessToken = (0,_utils_generateAccessToken__WEBPACK_IMPORTED_MODULE_2__["default"])({
      user: cleanedOutput
    });
    const refreshToken = (0,_utils_generateRefreshToken__WEBPACK_IMPORTED_MODULE_3__["default"])({
      user: cleanedOutput
    });
    refreshTokens.push(refreshToken);
    ___WEBPACK_IMPORTED_MODULE_8__.appEvents.emit('userCreated', {
      user: cleanedOutput,
      payload: {
        autorizacion: authorizationResponse
      }
    });
    return res.status(200).json({
      usuario: cleanedOutput,
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('User signup error:', error);
    return res.status(500).json({
      error
    });
  }
};
const userLogout = (req, res) => {
  if (!req.body.token.length) return res.status(403).send();
  const index = refreshTokens.findIndex(refreshToken => refreshToken === req.body.token);
  if (index === -1) return res.status(403).send();
  refreshTokens.splice(index, 1);
  return res.send('Signed Out!');
};
const getAccessToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.status(403).json({
    message: 'Error de solicitud, vuelve a iniciar sesión'
  });
  if (!refreshTokens.includes(refreshToken)) return res.status(403).json({
    message: 'Error de solicitud, vuelve a iniciar sesión'
  });
  jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(403).json({
      message: 'Error de solicitud, vuelve a iniciar sesión'
    });
    const accessToken = (0,_utils_generateAccessToken__WEBPACK_IMPORTED_MODULE_2__["default"])({
      user: payload.user
    });
    res.json({
      accessToken: accessToken
    });
  });
};
const createAccess = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(405).json({
      message: 'No tienes permiso para realizar esta acción'
    });
    const inputSchema = _schemas__WEBPACK_IMPORTED_MODULE_5__.CreateAccessInput.newContext();
    const cleanedInput = _schemas__WEBPACK_IMPORTED_MODULE_5__.CreateAccessInput.clean(req.body);
    inputSchema.validate(cleanedInput);
    if (!inputSchema.isValid()) {
      const errors = (0,_utils_getSchemaErrors__WEBPACK_IMPORTED_MODULE_6__.getSchemaErrors)(inputSchema);
      return res.status(422).json({
        errors
      });
    }
    const authorizationCode = (0,_utils_generateRandomCode__WEBPACK_IMPORTED_MODULE_7__["default"])();
    Object.assign(cleanedInput, {
      authorizationCode
    });
    const access = await _db_models__WEBPACK_IMPORTED_MODULE_4__.Autorizacion.create(cleanedInput);
    if (!access) return res.status(400).json({
      message: 'Error al crear acceso'
    });
    ___WEBPACK_IMPORTED_MODULE_8__.appEvents.emit('accessCreated', {
      user: req.user,
      payload: {
        correo: req.body.correo,
        authorizationCode
      }
    });
    return res.status(200).json({
      acceso: access
    });
  } catch (error) {
    console.error('create access error:', error);
    return res.status(500).json({
      error
    });
  }
};
const getAccessList = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(405).json({
      message: 'No tienes permiso para realizar esta acción'
    });
    const accesos = await _db_models__WEBPACK_IMPORTED_MODULE_4__.Autorizacion.findAll({
      include: {
        model: _db_models__WEBPACK_IMPORTED_MODULE_4__.TipoUsuario,
        as: 'permiso'
      }
    });
    return res.status(200).json({
      accesos
    });
  } catch (error) {
    console.error('getAccessList error:', error);
    return res.status(500).json({
      message: error.toString()
    });
  }
};

/***/ }),

/***/ "./src/controllers/cartera.controller.js":
/*!***********************************************!*\
  !*** ./src/controllers/cartera.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCartera: () => (/* binding */ createCartera),
/* harmony export */   getCarteras: () => (/* binding */ getCarteras)
/* harmony export */ });
/* harmony import */ var _db_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/models */ "./src/db/models/index.js");
/* harmony import */ var _queries_buildCarteraQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../queries/buildCarteraQuery */ "./src/queries/buildCarteraQuery.js");


const getCarteras = async (req, res) => {
  try {
    const queryOptions = (0,_queries_buildCarteraQuery__WEBPACK_IMPORTED_MODULE_1__["default"])(req.query, req.user.isAdmin);
    if (!req.user.isAdmin) Object.assign(queryOptions.where, {
      id_usuario: req.user.idUsuario
    });
    const carteras = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Cartera.findAll(queryOptions);
    return res.status(200).json({
      carteras
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
const createCartera = async (req, res) => {
  const response = {
    ...req.body
  };
  const paqueteResponse = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Paquete.findByPk(response.id_paquete);
  if (!paqueteResponse) return res.status(404).json({
    message: 'No pudimos encontrar el paquete'
  });
  const paquete = paqueteResponse.toJSON();
  const totalPagar = response.cantidadPaquetes * paquete.precio;
  Object.assign(response, {
    id_usuario: req.user.idUsuario,
    totalPagar
  });
  try {
    const cartera = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Cartera.create(response);
    if (!cartera) return res.status(400).json({
      message: 'error al crear cartera'
    });
    return res.status(200).json({
      cartera
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

/***/ }),

/***/ "./src/controllers/cliente.controller.js":
/*!***********************************************!*\
  !*** ./src/controllers/cliente.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCliente: () => (/* binding */ createCliente),
/* harmony export */   getClientes: () => (/* binding */ getClientes)
/* harmony export */ });
/* harmony import */ var _db_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/models */ "./src/db/models/index.js");

const getClientes = async (__, res) => {
  try {
    const clientes = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Cliente.findAll({
      include: [{
        model: _db_models__WEBPACK_IMPORTED_MODULE_0__.TipoCliente,
        as: 'tipoCliente'
      }]
    });
    return res.status(200).json({
      clientes
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
const createCliente = async (req, res) => {
  try {
    const cliente = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Cliente.create(req.body);
    if (!cliente) return res.status(400).json({
      message: 'Error al crear cliente'
    });
    return res.status(200).json({
      cliente
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

/***/ }),

/***/ "./src/controllers/contacto.controller.js":
/*!************************************************!*\
  !*** ./src/controllers/contacto.controller.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createContacto: () => (/* binding */ createContacto),
/* harmony export */   getContactos: () => (/* binding */ getContactos)
/* harmony export */ });
/* harmony import */ var _db_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/models */ "./src/db/models/index.js");

const getContactos = async (__, res) => {
  try {
    const contactos = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Contacto.findAll();
    return res.status(200).json({
      contactos
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
const createContacto = async (req, res) => {
  try {
    const contacto = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Contacto.create(req.body);
    if (!contacto) return res.status(400).json({
      message: 'error al crear contacto'
    });
    return res.status(200).json({
      contacto
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

/***/ }),

/***/ "./src/controllers/metageneral.controller.js":
/*!***************************************************!*\
  !*** ./src/controllers/metageneral.controller.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMeta: () => (/* binding */ createMeta),
/* harmony export */   getMeta: () => (/* binding */ getMeta),
/* harmony export */   getMetas: () => (/* binding */ getMetas)
/* harmony export */ });
/* harmony import */ var _db_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/models */ "./src/db/models/index.js");
/* harmony import */ var _queries_buildMetaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../queries/buildMetaQuery */ "./src/queries/buildMetaQuery.js");
/* harmony import */ var _queries_buildMetaDetalleQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../queries/buildMetaDetalleQuery */ "./src/queries/buildMetaDetalleQuery.js");
/* harmony import */ var _utils_parseQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/parseQuery */ "./src/utils/parseQuery.js");






const getMeta = async (req, res) => {
  try {
    const queryByUser = {
      id_usuario: req.user.idUsuario
    };
    const queryParams = (0,_utils_parseQuery__WEBPACK_IMPORTED_MODULE_3__["default"])(req.query);
    const metaQuery = (0,_queries_buildMetaQuery__WEBPACK_IMPORTED_MODULE_1__["default"])(queryParams);
    if (req.query) Object.assign(metaQuery, {
      where: queryParams
    });
    if (!req.user.isAdmin) Object.assign(metaQuery.include, {
      where: queryByUser
    });
    const metaResponse = await _db_models__WEBPACK_IMPORTED_MODULE_0__.MetaGeneral.findAll(metaQuery);
    if (!metaResponse || !metaResponse.length) return res.status(200).json({
      message: req.user.isAdmin ? 'No hay una meta creada para esta fecha' : 'No tienes meta asignada para esta fecha',
      meta: null
    });
    const meta = metaResponse[0]?.toJSON() || {};
    if (req.user.isAdmin) {
      const metaDetalleQuery = (0,_queries_buildMetaDetalleQuery__WEBPACK_IMPORTED_MODULE_2__["default"])(queryParams);
      if (req.query) Object.assign(metaDetalleQuery, {
        where: queryParams
      });
      const metaDetalleResponse = await _db_models__WEBPACK_IMPORTED_MODULE_0__.MetaGeneral.findAll(metaDetalleQuery);
      const detalle = Array.from(metaDetalleResponse[0].toJSON().detalle || []).map(detalle => {
        const meta_alcanzar = meta.meta_alcanzar / metaDetalleResponse[0].toJSON().detalle.length || 0;
        return {
          ...detalle,
          meta_alcanzar
        };
      });
      Object.assign(meta, {
        detalle
      });
    }
    return res.status(200).json({
      meta
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error
    });
  }
};
const getMetas = async (req, res) => {
  try {
    const metas = await _db_models__WEBPACK_IMPORTED_MODULE_0__.MetaGeneral.findAll();
    return res.status(200).json({
      metas
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener las metas',
      error: error.message
    });
  }
};
const createMeta = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(405).json({
        message: 'No tienes permiso de realizar esta acción'
      });
    }

    // Obtener metaAlcanzar y anio del cuerpo de la solicitud
    const {
      metaAlcanzar,
      anio,
      ...otherData
    } = req.body;

    // Validar que metaAlcanzar sea mayor que 0
    if (metaAlcanzar <= 0) {
      return res.status(400).json({
        message: 'Datos erróneos. "metaAlcanzar" debe ser mayor que 0.'
      });
    }

    // Validar que anio esté en el rango deseado
    if (anio <= 2022 || anio >= 2100) {
      return res.status(400).json({
        message: 'Datos erróneos. "anio" debe estar entre 2022 y 2099.'
      });
    }

    // Contar vendedores con id_tipo_usuario 3
    const vendedoresCount = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Usuario.count({
      where: {
        id_tipo_usuario: 1
      }
    });

    // Calcular metaIndividual
    const metaVendedor = metaAlcanzar / vendedoresCount;

    // Crear la meta general
    const metaGeneral = await _db_models__WEBPACK_IMPORTED_MODULE_0__.MetaGeneral.create({
      metaAlcanzar,
      metaIndividual: metaVendedor,
      anio,
      ...otherData
    });

    // Crear registros en la tabla meta_detalle para cada vendedor
    const vendedores = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Usuario.findAll({
      where: {
        id_tipo_usuario: 1
      }
    });
    for (const vendedor of vendedores) {
      await _db_models__WEBPACK_IMPORTED_MODULE_0__.MetaDetalle.create({
        id_meta_general: metaGeneral.idMetaGeneral,
        id_usuario: vendedor.idUsuario,
        metaAlcanzar: metaVendedor
      });
    }
    return res.status(200).json({
      metaGeneral
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message
    });
  }
};

/***/ }),

/***/ "./src/controllers/paquete.controller.js":
/*!***********************************************!*\
  !*** ./src/controllers/paquete.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPaquete: () => (/* binding */ createPaquete),
/* harmony export */   getPaquetes: () => (/* binding */ getPaquetes)
/* harmony export */ });
/* harmony import */ var _db_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/models */ "./src/db/models/index.js");

const getPaquetes = async (__, res) => {
  try {
    const paquetes = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Paquete.findAll({
      include: [{
        model: _db_models__WEBPACK_IMPORTED_MODULE_0__.Contacto,
        as: 'contacto'
      }, {
        model: _db_models__WEBPACK_IMPORTED_MODULE_0__.StatusPaquete,
        as: 'status'
      }]
    });
    return res.status(200).json({
      paquetes
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
const createPaquete = async (req, res) => {
  try {
    const paquete = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Paquete.create(req.body);
    if (!paquete) return res.status(400).json({
      message: 'No se pudo crear el paquete'
    });
    return res.status(200).json({
      paquete
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

/***/ }),

/***/ "./src/controllers/usuario.controller.js":
/*!***********************************************!*\
  !*** ./src/controllers/usuario.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asignarMeta: () => (/* binding */ asignarMeta),
/* harmony export */   getPermisos: () => (/* binding */ getPermisos),
/* harmony export */   getUsuarios: () => (/* binding */ getUsuarios),
/* harmony export */   updateUsuario: () => (/* binding */ updateUsuario)
/* harmony export */ });
/* harmony import */ var _db_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/models */ "./src/db/models/index.js");
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schemas */ "./src/schemas/index.js");
/* harmony import */ var simpl_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! simpl-schema */ "simpl-schema");
/* harmony import */ var simpl_schema__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(simpl_schema__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_parseQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/parseQuery */ "./src/utils/parseQuery.js");




const getUsuarios = async (req, res) => {
  try {
    const queryOptions = {};
    if (!req.user.isAdmin) return res.status(401).json({
      message: 'No tienes permiso de realizar esta acción'
    });
    if (req.query) Object.assign(queryOptions, {
      where: (0,_utils_parseQuery__WEBPACK_IMPORTED_MODULE_3__["default"])(req.query)
    });
    const usuarioResponse = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Usuario.findAll({
      include: {
        model: _db_models__WEBPACK_IMPORTED_MODULE_0__.TipoUsuario,
        as: 'permiso'
      },
      ...queryOptions
    });
    const cleanedOutput = Array.from(usuarioResponse || []).map(usuario => {
      return _schemas__WEBPACK_IMPORTED_MODULE_1__.Usuario.clean(usuario.toJSON());
    });
    return res.status(200).json({
      usuarios: cleanedOutput
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error
    });
  }
};
const updateUsuario = async (req, res) => {
  try {
    const usuario = await _db_models__WEBPACK_IMPORTED_MODULE_0__.Usuario.update(req.body, {
      where: {
        id_usuario: req.params.idUsuario
      }
    });
    if (!usuario) return res.status(400).json({
      message: 'error al actualizar usuario o usuario no encontrado'
    });
    return res.status(200).json({
      usuario
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error
    });
  }
};
const asignarMeta = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(401).json({
      message: 'No tienes permiso de realizar esta acción'
    });
    const metaDetalle = await _db_models__WEBPACK_IMPORTED_MODULE_0__.MetaDetalle.findOne({
      where: {
        id_meta_general: req.params.idMeta,
        id_usuario: req.params.idUsuario
      }
    });
    if (metaDetalle) return res.status(400).json({
      message: 'El usuario ya tiene esta meta asignada'
    });
    const metaGeneral = await _db_models__WEBPACK_IMPORTED_MODULE_0__.MetaGeneral.findByPk(req.params.idMeta);
    if (!metaGeneral) return res.status(404).json({
      message: 'La meta general enviada no existe'
    });
    const body = {
      id_meta_general: req.params.idMeta,
      id_usuario: req.params.idUsuario,
      metaAlcanzar: metaGeneral.toJSON().metaAlcanzar
    };
    const meta = await _db_models__WEBPACK_IMPORTED_MODULE_0__.MetaDetalle.create(body);
    if (!meta) return res.status(400).json({
      message: 'error al asignar meta'
    });
    return res.status(200).json({
      meta
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error
    });
  }
};
const getPermisos = async (req, res) => {
  try {
    const permisos = await _db_models__WEBPACK_IMPORTED_MODULE_0__.TipoUsuario.findAll();
    return res.status(200).json({
      permisos
    });
  } catch (error) {
    return res.status(500).json({
      message: error.toString()
    });
  }
};

/***/ }),

/***/ "./src/db/models/index.js":
/*!********************************!*\
  !*** ./src/db/models/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sequelize */ "sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! process */ "process");
/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(process__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../config/database */ "./src/config/database.js");
/* harmony import */ var _config_database__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_config_database__WEBPACK_IMPORTED_MODULE_4__);







const basename = (0,path__WEBPACK_IMPORTED_MODULE_1__.basename)(__filename);
const env = process__WEBPACK_IMPORTED_MODULE_3__.env.NODE_ENV || 'development';
const config = (_config_database__WEBPACK_IMPORTED_MODULE_4___default())[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new (sequelize__WEBPACK_IMPORTED_MODULE_2___default())(process__WEBPACK_IMPORTED_MODULE_3__.env[config.use_env_variable], config);
} else {
  sequelize = new (sequelize__WEBPACK_IMPORTED_MODULE_2___default())(config.database, config.username, config.password, config);
}
(0,fs__WEBPACK_IMPORTED_MODULE_0__.readdirSync)(__dirname).filter(file => {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1;
}).forEach(file => {
  const model = __webpack_require__("./src/db/models sync recursive")((0,path__WEBPACK_IMPORTED_MODULE_1__.join)(__dirname, file))(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_2__.DataTypes);
  db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = (sequelize__WEBPACK_IMPORTED_MODULE_2___default());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   app: () => (/* binding */ app),
/* harmony export */   appEvents: () => (/* binding */ appEvents),
/* harmony export */   handler: () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! events */ "events");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fixtures_posts_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./__fixtures__/posts.json */ "./src/__fixtures__/posts.json");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./routes */ "./src/routes/index.js");
/* harmony import */ var _db_models__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./db/models */ "./src/db/models/index.js");
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./schemas */ "./src/schemas/index.js");
/* harmony import */ var _initEvents__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./initEvents */ "./src/initEvents.js");
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! serverless-http */ "serverless-http");
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(serverless_http__WEBPACK_IMPORTED_MODULE_10__);





dotenv__WEBPACK_IMPORTED_MODULE_3___default().config({
  path: __dirname.replace('src', `.env.${"development" || 0}`)
});






const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
const appEvents = new (events__WEBPACK_IMPORTED_MODULE_2___default().EventEmitter)();
(async () => {
  (0,_schemas__WEBPACK_IMPORTED_MODULE_8__["default"])();
  (0,_initEvents__WEBPACK_IMPORTED_MODULE_9__["default"])(appEvents);
  const HOST = 'localhost';
  const PORT = process.env.PORT || 3000;
  const server = http__WEBPACK_IMPORTED_MODULE_1___default().createServer(app);
  app.use(cors__WEBPACK_IMPORTED_MODULE_4___default()());
  app.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());
  app.use(_routes__WEBPACK_IMPORTED_MODULE_6__["default"]);
  //   initAPI(app)
  app.get('/healthcheck', (__, res) => {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    };
    appEvents.emit('test', data);
    res.status(200).send(data);
  });
  app.get('/posts', (req, res) => {
    // console.log('posts request data:', req)
    res.status(200).json({
      posts: _fixtures_posts_json__WEBPACK_IMPORTED_MODULE_5__
    });
  });
  _db_models__WEBPACK_IMPORTED_MODULE_7__["default"].sequelize.sync({
    force: false
  }).then(() => server.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  }));
})();
const handler = serverless_http__WEBPACK_IMPORTED_MODULE_10___default()(app);

/***/ }),

/***/ "./src/initEvents.js":
/*!***************************!*\
  !*** ./src/initEvents.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_sendEmail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/sendEmail */ "./src/services/sendEmail.js");
/* harmony import */ var _utils_newUserTemplate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/newUserTemplate */ "./src/utils/newUserTemplate.js");


const initEvents = appEvents => {
  appEvents.on('test', payload => {
    console.log('test event emmited', payload);
  });
  appEvents.on('accessCreated', async ({
    user,
    payload
  }) => {
    console.log('access created by:', user);
    const {
      correo,
      authorizationCode
    } = payload;
    try {
      const htmlTemplate = await (0,_utils_newUserTemplate__WEBPACK_IMPORTED_MODULE_1__["default"])(authorizationCode);
      await (0,_services_sendEmail__WEBPACK_IMPORTED_MODULE_0__["default"])({
        to: correo,
        subject: 'Te han dado acceso a la plataforma de Ventur Travel',
        text: '',
        template: htmlTemplate
      });
    } catch (error) {
      console.error('error sending email', error);
    }
  });
  appEvents.on('userCreated', async ({
    user,
    payload
  }) => {
    console.log('user created:', user);
    const {
      autorizacion
    } = payload;
    await autorizacion.update({
      aceptado: true
    });
    console.log('authorization updated!');
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initEvents);

/***/ }),

/***/ "./src/middlewares/validateAccessToken.middleware.js":
/*!***********************************************************!*\
  !*** ./src/middlewares/validateAccessToken.middleware.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_userTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/userTypes */ "./src/utils/userTypes.js");


const validateAccessToken = async (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) return res.status(403).json({
    message: 'Error de solicitud, vuelve a iniciar sesión'
  });
  token = token.replace('Bearer ', '');
  jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    console.error(err);
    if (err) return res.status(401).json({
      message: 'No estás autorizado para realizar esta petición'
    });
    req.user = payload.user || {};
    const isAdmin = payload.user && (payload.user.permiso.descripcion === _utils_userTypes__WEBPACK_IMPORTED_MODULE_1__["default"].administrador || payload.user.permiso.descripcion === _utils_userTypes__WEBPACK_IMPORTED_MODULE_1__["default"].jefe);
    Object.assign(req.user, {
      isAdmin
    });
    next();
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateAccessToken);

/***/ }),

/***/ "./src/queries/buildCarteraQuery.js":
/*!******************************************!*\
  !*** ./src/queries/buildCarteraQuery.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/models */ "./src/db/models/index.js");
/* harmony import */ var _utils_parseQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/parseQuery */ "./src/utils/parseQuery.js");


const buildCarteraQuery = (queryParams, isAdmin) => {
  const queryOptions = {
    include: [{
      model: _db_models__WEBPACK_IMPORTED_MODULE_0__.Cliente,
      as: 'cliente'
    }, {
      model: _db_models__WEBPACK_IMPORTED_MODULE_0__.Usuario,
      as: 'vendedor'
    }, {
      model: _db_models__WEBPACK_IMPORTED_MODULE_0__.Pais,
      as: 'pais'
    }, {
      model: _db_models__WEBPACK_IMPORTED_MODULE_0__.Paquete,
      as: 'paquete'
    }],
    where: {}
  };
  if (queryParams) {
    const query = (0,_utils_parseQuery__WEBPACK_IMPORTED_MODULE_1__["default"])(queryParams);
    if (query.mes && query.anio) Object.assign(queryOptions.where, {
      [_db_models__WEBPACK_IMPORTED_MODULE_0__.Sequelize.Op.and]: [_db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.where(_db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.fn('MONTH', _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.col('Cartera.created_at')), query.mes), _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.where(_db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.fn('YEAR', _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.col('Cartera.created_at')), query.anio)]
    });
    if (isAdmin && query.idVendedor) Object.assign(queryOptions.where, {
      id_usuario: query.idVendedor
    });
    if (query.idCliente) {
      Object.assign(queryOptions.where, {
        id_cliente: query.idCliente
      });
    }
  }
  return queryOptions;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildCarteraQuery);

/***/ }),

/***/ "./src/queries/buildMetaDetalleQuery.js":
/*!**********************************************!*\
  !*** ./src/queries/buildMetaDetalleQuery.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/models */ "./src/db/models/index.js");

const buildMetaDetalleQuery = queryParams => {
  const queryOptions = {
    attributes: [],
    include: {
      model: _db_models__WEBPACK_IMPORTED_MODULE_0__.MetaDetalle,
      as: 'detalle',
      attributes: ['id_usuario', [_db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.fn('COALESCE', _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.fn('SUM', _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.col('detalle.usuario.ventas.total_pagar')), 0), 'meta_acumulada']],
      include: {
        model: _db_models__WEBPACK_IMPORTED_MODULE_0__.Usuario,
        as: 'usuario',
        attributes: ['nombre', 'apellido'],
        include: {
          model: _db_models__WEBPACK_IMPORTED_MODULE_0__.Cartera,
          as: 'ventas',
          attributes: [],
          where: {
            [_db_models__WEBPACK_IMPORTED_MODULE_0__.Sequelize.Op.and]: [_db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.where(_db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.fn('MONTH', _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.col('detalle.usuario.ventas.created_at')), queryParams.mes), _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.where(_db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.fn('YEAR', _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.col('detalle.usuario.ventas.created_at')), queryParams.anio)]
          },
          required: false
        }
      }
    },
    group: ['detalle.id_usuario', 'detalle.usuario.nombre', 'detalle.usuario.apellido', 'detalle.usuario.id_usuario', 'detalle.id_meta_detalle', 'MetaGeneral.id_meta_general']
  };
  return queryOptions;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildMetaDetalleQuery);

/***/ }),

/***/ "./src/queries/buildMetaQuery.js":
/*!***************************************!*\
  !*** ./src/queries/buildMetaQuery.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/models */ "./src/db/models/index.js");

const buildMetaQuery = queryParams => {
  const queryOptions = {
    attributes: ['id_meta_general', 'meta_alcanzar', 'mes', 'anio', [_db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.fn('COALESCE', _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.fn('SUM', _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.col('detalle.usuario.ventas.total_pagar')), 0), 'meta_acumulada']],
    include: {
      model: _db_models__WEBPACK_IMPORTED_MODULE_0__.MetaDetalle,
      as: 'detalle',
      attributes: [],
      include: {
        model: _db_models__WEBPACK_IMPORTED_MODULE_0__.Usuario,
        as: 'usuario',
        attributes: [],
        include: {
          model: _db_models__WEBPACK_IMPORTED_MODULE_0__.Cartera,
          as: 'ventas',
          attributes: [],
          where: {
            [_db_models__WEBPACK_IMPORTED_MODULE_0__.Sequelize.Op.and]: [_db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.where(_db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.fn('MONTH', _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.col('detalle.usuario.ventas.created_at')), queryParams.mes), _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.where(_db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.fn('YEAR', _db_models__WEBPACK_IMPORTED_MODULE_0__.sequelize.col('detalle.usuario.ventas.created_at')), queryParams.anio)]
          }
        }
      }
    },
    group: ['MetaGeneral.id_meta_general', 'MetaGeneral.meta_alcanzar', 'MetaGeneral.mes', 'MetaGeneral.anio']
  };
  return queryOptions;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildMetaQuery);

/***/ }),

/***/ "./src/routes/auth.routes.js":
/*!***********************************!*\
  !*** ./src/routes/auth.routes.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth.controller */ "./src/controllers/auth.controller.js");
/* harmony import */ var _middlewares_validateAccessToken_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/validateAccessToken.middleware */ "./src/middlewares/validateAccessToken.middleware.js");



const Router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
Router.post('/login', _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__.userLogin);
Router.post('/signup', _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__.userSignUp);
Router.delete('/logout', _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__.userLogout);
Router.post('/getAccessToken', _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__.getAccessToken);
Router.post('/access', _middlewares_validateAccessToken_middleware__WEBPACK_IMPORTED_MODULE_2__["default"], _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__.createAccess);
Router.get('/access', _middlewares_validateAccessToken_middleware__WEBPACK_IMPORTED_MODULE_2__["default"], _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__.getAccessList);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);

/***/ }),

/***/ "./src/routes/cartera.routes.js":
/*!**************************************!*\
  !*** ./src/routes/cartera.routes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_cartera_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/cartera.controller */ "./src/controllers/cartera.controller.js");
/* harmony import */ var _middlewares_validateAccessToken_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/validateAccessToken.middleware */ "./src/middlewares/validateAccessToken.middleware.js");



const Router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
Router.use(_middlewares_validateAccessToken_middleware__WEBPACK_IMPORTED_MODULE_2__["default"]);
Router.get('/', _controllers_cartera_controller__WEBPACK_IMPORTED_MODULE_1__.getCarteras);
Router.post('/', _controllers_cartera_controller__WEBPACK_IMPORTED_MODULE_1__.createCartera);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);

/***/ }),

/***/ "./src/routes/cliente.routes.js":
/*!**************************************!*\
  !*** ./src/routes/cliente.routes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_cliente_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/cliente.controller */ "./src/controllers/cliente.controller.js");


const Router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
Router.get('/', _controllers_cliente_controller__WEBPACK_IMPORTED_MODULE_1__.getClientes);
Router.post('/', _controllers_cliente_controller__WEBPACK_IMPORTED_MODULE_1__.createCliente);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);

/***/ }),

/***/ "./src/routes/contacto.routes.js":
/*!***************************************!*\
  !*** ./src/routes/contacto.routes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_contacto_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/contacto.controller */ "./src/controllers/contacto.controller.js");


const Router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
Router.get('/', _controllers_contacto_controller__WEBPACK_IMPORTED_MODULE_1__.getContactos);
Router.post('/', _controllers_contacto_controller__WEBPACK_IMPORTED_MODULE_1__.createContacto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _usuario_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./usuario.routes */ "./src/routes/usuario.routes.js");
/* harmony import */ var _auth_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.routes */ "./src/routes/auth.routes.js");
/* harmony import */ var _cliente_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cliente.routes */ "./src/routes/cliente.routes.js");
/* harmony import */ var _contacto_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contacto.routes */ "./src/routes/contacto.routes.js");
/* harmony import */ var _paquete_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./paquete.routes */ "./src/routes/paquete.routes.js");
/* harmony import */ var _cartera_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cartera.routes */ "./src/routes/cartera.routes.js");
/* harmony import */ var _metageneral_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./metageneral.routes */ "./src/routes/metageneral.routes.js");








const Router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
Router.use('/auth', _auth_routes__WEBPACK_IMPORTED_MODULE_2__["default"]);
Router.use('/usuarios', _usuario_routes__WEBPACK_IMPORTED_MODULE_1__["default"]);
Router.use('/clientes', _cliente_routes__WEBPACK_IMPORTED_MODULE_3__["default"]);
Router.use('/contactos', _contacto_routes__WEBPACK_IMPORTED_MODULE_4__["default"]);
Router.use('/paquetes', _paquete_routes__WEBPACK_IMPORTED_MODULE_5__["default"]);
Router.use('/carteras', _cartera_routes__WEBPACK_IMPORTED_MODULE_6__["default"]);
Router.use('/metas', _metageneral_routes__WEBPACK_IMPORTED_MODULE_7__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);

/***/ }),

/***/ "./src/routes/metageneral.routes.js":
/*!******************************************!*\
  !*** ./src/routes/metageneral.routes.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_metageneral_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/metageneral.controller */ "./src/controllers/metageneral.controller.js");
/* harmony import */ var _middlewares_validateAccessToken_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/validateAccessToken.middleware */ "./src/middlewares/validateAccessToken.middleware.js");



const Router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
Router.use(_middlewares_validateAccessToken_middleware__WEBPACK_IMPORTED_MODULE_2__["default"]);
Router.get('/', _controllers_metageneral_controller__WEBPACK_IMPORTED_MODULE_1__.getMeta);
Router.get('/all', _controllers_metageneral_controller__WEBPACK_IMPORTED_MODULE_1__.getMetas);
Router.post('/', _controllers_metageneral_controller__WEBPACK_IMPORTED_MODULE_1__.createMeta);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);

/***/ }),

/***/ "./src/routes/paquete.routes.js":
/*!**************************************!*\
  !*** ./src/routes/paquete.routes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_paquete_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/paquete.controller */ "./src/controllers/paquete.controller.js");


const Router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
Router.get('/', _controllers_paquete_controller__WEBPACK_IMPORTED_MODULE_1__.getPaquetes);
Router.post('/', _controllers_paquete_controller__WEBPACK_IMPORTED_MODULE_1__.createPaquete);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);

/***/ }),

/***/ "./src/routes/usuario.routes.js":
/*!**************************************!*\
  !*** ./src/routes/usuario.routes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_usuario_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/usuario.controller */ "./src/controllers/usuario.controller.js");
/* harmony import */ var _middlewares_validateAccessToken_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/validateAccessToken.middleware */ "./src/middlewares/validateAccessToken.middleware.js");



const Router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
Router.use(_middlewares_validateAccessToken_middleware__WEBPACK_IMPORTED_MODULE_2__["default"]);
Router.get('/', _controllers_usuario_controller__WEBPACK_IMPORTED_MODULE_1__.getUsuarios);
Router.patch('/:idUsuario', _controllers_usuario_controller__WEBPACK_IMPORTED_MODULE_1__.updateUsuario);
Router.post('/:idUsuario/asignarMeta/:idMeta', _controllers_usuario_controller__WEBPACK_IMPORTED_MODULE_1__.asignarMeta);
Router.get('/permisos', _controllers_usuario_controller__WEBPACK_IMPORTED_MODULE_1__.getPermisos);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);

/***/ }),

/***/ "./src/schemas/auth.js":
/*!*****************************!*\
  !*** ./src/schemas/auth.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateAccessInput: () => (/* binding */ CreateAccessInput),
/* harmony export */   LoginInput: () => (/* binding */ LoginInput),
/* harmony export */   UserSignUpInput: () => (/* binding */ UserSignUpInput)
/* harmony export */ });
/* harmony import */ var simpl_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simpl-schema */ "simpl-schema");
/* harmony import */ var simpl_schema__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(simpl_schema__WEBPACK_IMPORTED_MODULE_0__);

const LoginInput = new (simpl_schema__WEBPACK_IMPORTED_MODULE_0___default())({
  correo: {
    type: String,
    required: true
  },
  contrasenia: {
    type: String,
    required: true
  }
});
const CreateAccessInput = new (simpl_schema__WEBPACK_IMPORTED_MODULE_0___default())({
  correo: {
    type: String,
    required: true
  },
  id_tipo_usuario: {
    type: Number,
    required: true
  }
});
const UserSignUpInput = new (simpl_schema__WEBPACK_IMPORTED_MODULE_0___default())({
  correo: {
    type: String,
    required: true
  },
  contrasenia: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  dpi: {
    type: String,
    required: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  fechaIngreso: {
    type: Date,
    required: true
  },
  id_status_vendedor: {
    type: Number,
    required: true
  }
});

/***/ }),

/***/ "./src/schemas/index.js":
/*!******************************!*\
  !*** ./src/schemas/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateAccessInput: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_1__.CreateAccessInput),
/* harmony export */   LoginInput: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_1__.LoginInput),
/* harmony export */   UserSignUpInput: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_1__.UserSignUpInput),
/* harmony export */   Usuario: () => (/* reexport safe */ _usuario__WEBPACK_IMPORTED_MODULE_0__.Usuario),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _usuario__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./usuario */ "./src/schemas/usuario.js");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth */ "./src/schemas/auth.js");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  global.simpleSchemaGlobalConfig = {
    getErrorMessage(error, label) {
      if (error.type === 'required') return `${label} es un campo requerido`;
    }
  };
});



/***/ }),

/***/ "./src/schemas/permiso.js":
/*!********************************!*\
  !*** ./src/schemas/permiso.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Permiso: () => (/* binding */ Permiso)
/* harmony export */ });
/* harmony import */ var simpl_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simpl-schema */ "simpl-schema");
/* harmony import */ var simpl_schema__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(simpl_schema__WEBPACK_IMPORTED_MODULE_0__);

const Permiso = new (simpl_schema__WEBPACK_IMPORTED_MODULE_0___default())({
  idTipoUsuario: Number,
  descripcion: String,
  createdAt: Date,
  updatedAt: Date
});

/***/ }),

/***/ "./src/schemas/usuario.js":
/*!********************************!*\
  !*** ./src/schemas/usuario.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Usuario: () => (/* binding */ Usuario)
/* harmony export */ });
/* harmony import */ var simpl_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simpl-schema */ "simpl-schema");
/* harmony import */ var simpl_schema__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(simpl_schema__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _permiso__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./permiso */ "./src/schemas/permiso.js");


const Usuario = new (simpl_schema__WEBPACK_IMPORTED_MODULE_0___default())({
  idUsuario: Number,
  correo: String,
  nombre: String,
  apellido: String,
  dpi: String,
  fechaNacimiento: Date,
  fechaIngreso: Date,
  createdAt: Date,
  updatedAt: Date,
  id_status_vendedor: Number,
  id_tipo_usuario: Number,
  permiso: _permiso__WEBPACK_IMPORTED_MODULE_1__.Permiso
});

/***/ }),

/***/ "./src/services/sendEmail.js":
/*!***********************************!*\
  !*** ./src/services/sendEmail.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodemailer */ "nodemailer");
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_0__);

const sendEmail = async ({
  to,
  subject,
  text,
  template
}) => {
  const transporterOptions = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD
    },
    tls: {
      ciphers: 'SSLv3'
    }
  };
  const transporter = nodemailer__WEBPACK_IMPORTED_MODULE_0___default().createTransport(transporterOptions);
  const info = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    text,
    html: template
  });
  if (!info.messageId) throw new Error('Error sending email');
  console.log('message sent:', info.response);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendEmail);

/***/ }),

/***/ "./src/utils/generateAccessToken.js":
/*!******************************************!*\
  !*** ./src/utils/generateAccessToken.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);

const generateAccessToken = user => {
  return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '40m'
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateAccessToken);

/***/ }),

/***/ "./src/utils/generateRandomCode.js":
/*!*****************************************!*\
  !*** ./src/utils/generateRandomCode.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateRandomCode)
/* harmony export */ });
function generateRandomCode() {
  const char = '1234567890';
  const serialLength = 20;
  let randomCode = '';
  for (let i = 0; i < serialLength; ++i) {
    let randomSingle = char[Math.floor(Math.random() * char.length)];
    randomCode += randomSingle;
  }
  return randomCode;
}

/***/ }),

/***/ "./src/utils/generateRefreshToken.js":
/*!*******************************************!*\
  !*** ./src/utils/generateRefreshToken.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);

const generateRefreshToken = user => {
  return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(user, process.env.REFRESH_TOKEN_SECRET);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateRefreshToken);

/***/ }),

/***/ "./src/utils/getSchemaErrors.js":
/*!**************************************!*\
  !*** ./src/utils/getSchemaErrors.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSchemaErrors: () => (/* binding */ getSchemaErrors)
/* harmony export */ });
/* harmony import */ var simpl_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simpl-schema */ "simpl-schema");
/* harmony import */ var simpl_schema__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(simpl_schema__WEBPACK_IMPORTED_MODULE_0__);


/**
 * retrieves a custom message error for every field
 * @param {ValidationContext} schema
 */
const getSchemaErrors = schema => {
  const errors = [];
  const validationErrors = schema.validationErrors();
  for (let validationError of validationErrors) {
    errors.push({
      key: validationError.name,
      message: schema.keyErrorMessage(validationError.name)
    });
  }
  return errors;
};

/***/ }),

/***/ "./src/utils/newUserTemplate.js":
/*!**************************************!*\
  !*** ./src/utils/newUserTemplate.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   newUserTemplate: () => (/* binding */ newUserTemplate)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ejs */ "ejs");
/* harmony import */ var ejs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ejs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var juice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! juice */ "juice");
/* harmony import */ var juice__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(juice__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);




const newUserTemplate = async authorizationCode => {
  const templatePath = path__WEBPACK_IMPORTED_MODULE_3___default().resolve(path__WEBPACK_IMPORTED_MODULE_3___default().dirname(''), 'src/templates/new-user.html');
  if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(templatePath)) throw new Error('html does not exists!');
  const template = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(templatePath, 'utf-8');
  const html = ejs__WEBPACK_IMPORTED_MODULE_1___default().render(template, {
    registrationLink: `${process.env.REGISTRATION_REDIRECT_URL}?authorizationCode=${authorizationCode}`
  });
  const htmlWithStylesInlined = juice__WEBPACK_IMPORTED_MODULE_2___default()(html);
  return htmlWithStylesInlined;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (newUserTemplate);

/***/ }),

/***/ "./src/utils/parseQuery.js":
/*!*********************************!*\
  !*** ./src/utils/parseQuery.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const parseQuery = object => {
  let result = {};
  for (let key of Object.keys(object)) {
    if (isNaN(object[key])) result[key] = object[key];else result[key] = Number(object[key]);
  }
  return result;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseQuery);

/***/ }),

/***/ "./src/utils/userTypes.js":
/*!********************************!*\
  !*** ./src/utils/userTypes.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const userTypes = {
  vendedor: 'vendedor',
  jefe: 'jefe',
  administrador: 'administrador'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userTypes);

/***/ }),

/***/ "./src/db/models sync recursive":
/*!*****************************!*\
  !*** ./src/db/models/ sync ***!
  \*****************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./src/db/models sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("ejs");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "juice":
/*!************************!*\
  !*** external "juice" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("juice");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("nodemailer");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("sequelize");

/***/ }),

/***/ "serverless-http":
/*!**********************************!*\
  !*** external "serverless-http" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("serverless-http");

/***/ }),

/***/ "simpl-schema":
/*!*******************************!*\
  !*** external "simpl-schema" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("simpl-schema");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "./src/__fixtures__/posts.json":
/*!*************************************!*\
  !*** ./src/__fixtures__/posts.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('[{"username":"user1","author":"John Doe","description":"This is a post about football"},{"username":"user2","author":"Jane Smith","description":"Here\'s another football post"},{"username":"user1","author":"John Doe","description":"A great goal scored in the latest match"},{"username":"user4","author":"Sarah Adams","description":"Thoughts on the current football season"},{"username":"user5","author":"David Thompson","description":"Predictions for the upcoming football game"}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.cjs.map