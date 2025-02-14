## Simple Clima app

Una aplicación desarrollada en Next.js que muestra el clima actual de una ciudad.

## Tecnologías utilizadas
- Next.js
- Jest (Testing) junto a testing-library/react
- OpenWeatherMap API
- Axios

## Instalación
Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
npm install # si estas con npm
yarn install # si estas con yarn
```

## Configuración
Para configurar la aplicación, crea un archivo `.env.local` en la raíz del proyecto y agrega tu API key de OpenWeatherMap

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=tu_api_key
```

Por razones de seguridad, no he incluido el archivo `.env.local` en el repositorio.

## Uso
Para iniciar el servidor de desarrollo, ejecuta el siguiente comando:

```bash
npm run dev
# or
yarn dev
```

Abre el puerto [http://localhost:3000](http://localhost:3000) con tu navegador para explorar.

## Pruebas
Para ejecutar las pruebas, ejecuta el siguiente comando:
```bash
npm run test
# or
yarn test
```

Las pruebas utilizan Jest y Axios. El porcentaje de coverage es superior al 80 % y se cubren aspectos fundamentales desde la prueba de la API y el endpoint hasta la validacion de datos en el input y que se muestren resultados en la vista, como las imagenes. 
Tambien incluye un snapshot de la vista.

## Despliegue

El proyecto ha sido además desplegado en Vercel, pueden visitarlo en el siguiente link: [Simple Clima App](https://weather-site-smoky-eight.vercel.app/)
