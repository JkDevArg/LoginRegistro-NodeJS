const { hash } = require('bcrypt');
const bcrypt = require('bcrypt')

function login(req, res){
    if(req.session.loggedin != true){
        res.render('login/index');
    }else{
        res.redirect('/')
    }
}

function auth(req, res){
    const data = req.body
    //console.log(data)
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
            if(userdata.length > 0){
                //console.log('Todo Ok')
                userdata.forEach(element => {
                    bcrypt.compare(data.password, element.password, (err, isMatch) => {
                        if(!isMatch){
                            res.render('login/index', { error: 'El Usuario/Contraseña son incorrectos!' })
                        }else{
                            //console.log('Contraseñas Ok')
                            req.session.loggedin = true
                            req.session.nombre = element.nombre
                            //req.session.email = element.email

                            res.redirect('/')
                        }
                        //console.log(element.password)
                    });
                })
            }else{
                res.render('login/index', { error: 'El Usuario no existe!' })
            }
        })
    })
}

function registro(req, res){
    if(req.session.loggedin != true){
        res.render('login/registro');
    }else{
        res.redirect('/')
    }
}

function storeUsuario(req, res){
    const data = req.body

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
            if(userdata.length > 0){
                res.render('login/registro', { error: 'El Usuario ya existe!' })
                //console.log('El usuario ya existe')
            }else{
                bcrypt.hash(data.password, 12).then(hash => {
                    data.password = hash;
                    //console.log(hash)
                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
                            //console.log('Contraseñas Ok')
                            req.session.loggedin = true
                            req.session.nombre = data.nombre
                            //req.session.email = element.email
                            res.redirect('/')
                        })
                    })
                })
            }
        })
    })
    //console.log(data)
}

function salir(req, res){
    if(req.session.loggedin == true){
        req.session.destroy()
        
    }
    res.redirect('/login')
}

module.exports = {
    login,
    registro,
    storeUsuario,
    auth,
    salir,
}