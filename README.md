# Bixlabs Test Backend

## Descripción general y dominio elegido

Este proyecto es una API backend construida con Node.js y NestJS para administrar usuarios y equipos de gimnasio. El dominio abarca la gestión de un sistema de gimnasio, permitiendo registrar usuarios y controlar el inventario de equipos. La API es RESTful y utiliza una base de datos PostgreSQL para la persistencia. La autenticación se implementa con JWT y las contraseñas se almacenan de forma segura mediante hashing.

## Arquitectura breve

La arquitectura sigue el patrón modular de NestJS, con controladores, servicios y entidades para cada recurso principal (`user` y `gym-item`). Cada módulo está desacoplado y maneja su propia lógica de negocio y persistencia. Se utiliza un sistema de inyección de dependencias para facilitar la escalabilidad y el testing. La capa de autenticación se implementa como un módulo separado, utilizando JWT para proteger los endpoints. La comunicación con la base de datos PostgreSQL se realiza mediante TypeORM, permitiendo migraciones y manejo eficiente de entidades. Además, se emplean DTOs para validar y tipar los datos recibidos en las peticiones.

## Tecnologías

- Node.js
- NestJS
- TypeScript
- JWT (autenticación)
- Jest (testing)
- Zod, etc

## API usada / Endpoints propios

No se utiliza una API externa. Los endpoints principales son:

- `POST /api/user` - Crear usuario
- `POST /api/user/authenticate` - Autenticar usuario (login)
- `POST /api/gym-item` - Crear gym item
- `GET /api/gym-item` - Listar gym items
- `PUT /api/gym-item/:id` - Actualizar gym item
- `DELETE /api/gym-item/:id` - Eliminar gym item

## Variables de entorno y cómo correr local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/dchavez-bix/challenge-greg-back
   cd challenge-greg-back
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz con el siguiente contenido de ejemplo:
   ```env
   PORT=
   DATABASE_URI=
   FRONTEND_URL=
   JWT_BEARER_TOKEN_SECRET_KEY=
   PBKDF2_SALT=
   ```
4. Levanta la base de datos.
5. Ejecuta la app:
   ```bash
   npm run start:dev
   ```

## Cómo hacer deploy (o Docker Compose)

Desplegado en Render. Solo haz push a la rama principal y Vercel lo publica automáticamente.

## Usuario demo/seed

Al iniciar la aplicación, puedes usar el siguiente usuario demo para autenticación:

- **Usuario:** dchavez@gmail.com
- **Contraseña:** 123456

## Uso de IA

Este proyecto utilizó IA (GitHub Copilot) para:

- Generar la estructura inicial del proyecto.
- Crear controladores, servicios y DTOs.
- Sugerir pruebas unitarias y de integración.
- Redactar documentación y scripts de despliegue.
- Mejorar la calidad del código y acelerar el desarrollo.

Herramientas usadas:

- GitHub Copilot (VS Code)

La IA ayudó principalmente en la generación de código repetitivo, documentación y validación de buenas prácticas.

## Colección Postman/Insomnia o Swagger URL

- [Swagger UI](https://challenge-greg-back.onrender.com/docs)------------------------------FALTAAAAA

## App funcionando (URL)

- Backend: [URL de Render](https://challenge-greg-back.onrender.com/).
