const express = require('express')
const LoginController = require('../controllers/LoginController')

const router = express.Router()

router.get('/login', LoginController.login)
router.post('/login', LoginController.auth)
router.get('/registro', LoginController.registro)
router.post('/registro', LoginController.storeUsuario)
router.get('/salir', LoginController.salir)


module.exports = router;