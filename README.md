# LoginRegistro-NodeJS
Login y Registro con NodeJS + MySQL

## Instalar Modulos
```npm install```

## Importar Base de Datos
```nodejs.sql```

## Editar con tu editor de código favorito
```app.js```

```javascript
app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nodejs'
}))
```

## Iniciar Servidor
```javascript
npm run dev
```

## Crear usuario
```
  http://localhost:9000/registro
```

## Login
```
  http://localhost:9000/login
```
### User: admin@admin.com
### Pass: admin
