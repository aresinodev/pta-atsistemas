# Prueba técnica ATSistemas

Proyecto creado con Angular 12.

# Levantar backend con json-server.

Antes de levantar el servidor de desarrollo, en otra pestaña nos vamos a la carpeta `data` dentro
de `assets` y ejecutamos el siguiente comando `json-server --watch db.json --delay 1000 --port 3000`.
Esto nos levantará un backend que se alimenta de los datos de nuestro archivo `db.json`.

## Servidor de desarrollo

Ejecutamos el siguiente comando `npm run dev` para levantar el servidor en modo desarrollo. Cuando
se haya levantado, en nuestro navegador navegamos a la siguiente url `http://localhost:4200`.

## Build

Para generar nuestra versión de la web para producción, ejecutamos el comando `npm run build` y nos generará
una carpeta llamada `dist` que dentro contendrá una carpeta con el nombre de nuestro proyecto y dentro
de esta estarán los archivos para subirlos a nuestro servidor y poner nuestra web en producción.

## Lanzar test unitarios

Ejecutamos el comando `npm run test`.
