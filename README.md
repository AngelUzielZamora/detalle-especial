# Naye OS 2.2

Se conserva lo ya funcional de 2.1:
- Diario local + último pensamiento en Home
- XP, niveles y logros
- Naye Quest
- Cupones N+A
- Terminal de Ángel
- Cápsula del tiempo
- Constelación
- Corazón "El primero"
- Cartita
- Expediente
- N + A
- Oráculo
- Citas
- Recuerdos
- Ábreme cuando...
- Secretos
- Acerca de

Nuevo en 2.2:
- Misiones diarias
- Monedas
- Tienda de temas
- Temas Rosa, Noche, Lavanda y Pixel
- Mascota "Mochi"
- Cajas secretas por XP

Persistencia: localStorage. Compatible con GitHub Pages.


## Naye OS 2.3 — Birthday Update
- Basada directamente sobre el proyecto 2.2 recibido.
- Se conservan intactas las apps existentes.
- Contador hasta el 21 de agosto de 2026.
- Mensajes diarios del 17 al 20 de agosto.
- Birthday Mode automático el 21 de agosto.
- Mochi con modo cumpleaños y confeti.
- App Cumple de Naye.
- App Aventura 21.08, bloqueada hasta el viernes.
- `js/special-events.js` deja `relationshipUpdate: false` para una futura 3.0 manual.


## Naye OS 3.0 — Girlfriend Edition (preparada y dormida)
La 3.0 ya viene dentro de este proyecto, pero permanece completamente desactivada.

Para activarla después de la propuesta, editar únicamente:

`js/special-events.js`

Cambiar:

`relationshipUpdate: false`

por:

`relationshipUpdate: true`

No hace falta tocar ningún otro archivo.

Al activarse:
- Home pasa visualmente a Girlfriend Edition.
- Aparece `Relationship status updated`.
- Se muestra el contador de días desde el 21/08/2026.
- Aparece la app `Nueva etapa`.
- Se dispara una celebración visual.
- Se desbloquea el logro `Nueva etapa desbloqueada`.
- Las funciones de Birthday Update y todas las apps anteriores permanecen intactas.
