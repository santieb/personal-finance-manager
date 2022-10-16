# Alkemy-fullstack
Alkemy-fullstack es un challenge de desarrollo web construido con el objetivo de administrar presupuestos personales.
## Comenzando 🚀

Haz un clon del repositorio

```
git clone https://github.com/santieb/alkemy-fullstack.git
```

Instala las dependencias tanto del back como del front

```
npm install
```

### Instrucciones📄

**1 - Variables de entorno**

Crea un archivo **".env"** e inserta los datos tomando como referencia el archivo **".env.sample"** tanto en el back como en el front. Debería quedar algo asi:

***Backend***

```
PORT=3001
DATABASE_URL=databaseURL
SECRET_KEY=secretkey
```

***Frontend***

```
VITE_BACKEND_URL=http://localhost:3001
```

**2 - Ejecución**

***Backend***
`npm run start`
`npm run prisma:migrate`

***Frontend***
`npm run dev`

## Autor ✒️

* **Santiago Barreto** - [santieb](https://github.com/santieb) 

Challenge propuesto por [Alkemy](https://www.alkemy.org/)
