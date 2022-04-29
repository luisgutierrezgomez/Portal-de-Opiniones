# Portal-de-Opiniones

Implementar un API que permita publicar opiniones sobre cualquier tema y que otras personas puedan verlas

ANÓNIMO:
●Ver las opiniones publicadas (públicas)
●Login
●Registro

USUARIOS REGISTRADOS:
●Gestión del perfil: actualizar email, password
●Publicar una opinión
●Opcional: Votar positivamente o negativamente otras opiniones

ENTIDADES

Users:
id
username
role: registered, guest
active
email
password
registrationCode
passwordUpdateCode
created_at
lastUpdate
lastAuthUpdate

Opinion:
id
user
text
created_at

Opinion_votes:
id
entry_id
vote
user_id

Categories
id
category_id
category

ENDPOINTS

POST /user Registrar un usuario ✅

GET /user/:id Devolver información de un usuario ✅
POST /login Login de usuario (devuelve token) ✅

PUT /user/:id Edita email de un usuario y username (require un token)(authentication)

PUT /user/:id/password Edita password de un usuario(require un token)(authentication)

Si queda tiempo:
DELETE /user/:id Borra un usuario concreto (Sólo el propio usuario debería borrarse a sí mismo, ¿mantener las opiniones para no desestructurar el foro?)✅?
POST /user/recover-password Envía código para resetear la contraseña
POST /user/reset-password Resetea la password

POST/ Crear una opinión (cabecera con token, como en el vídeo de Berto)
GET/ Listado de todas las opiniones (mirar en diario de viages el listEntries. Filtrar por categoria, ordenar por fecha, media de votos, ...)
http://localhost:300/opiniones?categoria=politica&order=fecha&order-direction=asc

PUT /opinion/:id Edita una opinión (falta hacer el endpoint)(necesita cabecera con token)(solo el usuario que la creó puede editarla)
POST /opinion/vote Otorga un voto(poner también el token)(poner un límite de un voto por opinión)
