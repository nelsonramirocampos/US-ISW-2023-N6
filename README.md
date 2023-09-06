# DeliveryEat! Servicio de delivery de "lo que sea"

DeliverEat! es una aplicación de delivery que ofrece la conveniencia de pedir una amplia variedad de productos desde restaurantes, farmacias, tiendas de ropa, tecnología y más, y los entrega directamente en el domicilio del usuario. Su objetivo es facilitar la vida de las personas al proporcionar un servicio de entrega rápido y eficiente para todo tipo de necesidades, eliminando la necesidad de visitar físicamente los establecimientos.


## Requisitos

Asegúrate de tener los siguientes requisitos instalados en tu sistema antes de trabajar con este proyecto:

1. **Node.js**: Este proyecto utiliza Node.js para ejecutar scripts y gestionar dependencias. Puedes descargarlo desde [la página oficial de Node.js](https://nodejs.org/). Para verificar si Node.js está instalado en tu sistema y ver su versión, ejecuta el siguiente comando en tu terminal:

   ```bash
   node -v
   ```

   Esto mostrará la versión de Node.js si está instalada. Si no lo está, sigue el enlace anterior para descargar e instalar Node.js.

2. **npm**: npm es el administrador de paquetes de Node.js y se instala automáticamente junto con Node.js. Para verificar la versión de npm, ejecuta el siguiente comando en tu terminal:

   ```bash
   npm -v
   ```

   Esto mostrará la versión de npm si está instalada. Si no lo está, debería instalarse automáticamente junto con Node.js.

3. **Git**: Git es necesario para clonar y gestionar repositorios de GitHub. Si aún no tienes Git instalado, puedes descargarlo desde [la página oficial de Git](https://git-scm.com/). Para verificar si Git está instalado en tu sistema y ver su versión, ejecuta el siguiente comando en tu terminal:

   ```bash
   git --version
   ```

   Esto mostrará la versión de Git si está instalada. Si no lo está, sigue el enlace anterior para descargar e instalar Git.


## Uso

Para utilizar este proyecto, sigue estos pasos:

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/nelsonramirocampos/US-ISW-2023-N6.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd US-ISW-2023-N6
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

4. Inicia la aplicación en modo de desarrollo:

   ```bash
   npm start
   ```

La aplicación se abrirá automáticamente en tu navegador predeterminado. Puedes realizar cambios en el código fuente en la carpeta `src` y ver los cambios en tiempo real mientras la aplicación se ejecuta en modo de desarrollo.

## Publicar en GitHub Pages

Para publicar tu proyecto en GitHub Pages y compartirlo con otros, sigue estos pasos:

1. Asegúrate de que tienes una rama llamada `gh-pages` en tu repositorio. Si no la tienes, crea una:

   ```bash
   git checkout -b gh-pages
   ```

2. Compila la aplicación para producción:

   ```bash
   npm run predeploy
   ```

   Esto generará una carpeta llamada `build` en la raíz del proyecto.

4. Publica la rama `gh-pages` en GitHub:

   ```bash
      npm run deploy
   ```

   Tu proyecto estará disponible en GitHub Pages en la siguiente URL: https://nelsonramirocampos.github.io/US-ISW-2023-N6

## Mantener Actualizado GitHub Pages

Si realizas cambios en la rama `master` y deseas actualizar GitHub Pages, sigue estos pasos:

1. Cambia a la rama `gh-pages`:

   ```bash
   git checkout gh-pages
   ```

2. Fusiona los cambios de la rama `master` en la rama `gh-pages`:

   ```bash
   git merge master
   ```

3. Compila nuevamente la aplicación para producción:

   ```bash
   npm run predeploy
   ```

4. Publica la rama `gh-pages` en GitHub:

   ```bash
      npm run deploy
   ```


Ahora, tu proyecto estará actualizado en GitHub Pages con los cambios de la rama `master`.
