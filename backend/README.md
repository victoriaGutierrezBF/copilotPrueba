# Backend JWT con FastAPI

Aplicación Web API en FastAPI que implementa autenticación básica con JWT para el usuario fijo:

- **usuario**: `admin`
- **password**: `admin123`

## Endpoints

### 1) Generar token

- **POST** `/token`
- Body JSON:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Respuesta exitosa:

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 300,
  "refresh_token": "<jwt>"
}
```

El `access_token` expira en **300 segundos**.

### 2) Refrescar token

- **POST** `/token/refresh`
- Body JSON:

```json
{
  "refresh_token": "<jwt_refresh>"
}
```

Respuesta exitosa:

```json
{
  "access_token": "<jwt_nuevo>",
  "token_type": "bearer",
  "expires_in": 300
}
```

## Uso con Poetry

Desde la carpeta `backend`:

```bash
poetry install
poetry run uvicorn app.main:app --reload
```

API disponible en: `http://localhost:8000`

## Uso con Docker

Desde la carpeta `backend`:

```bash
docker compose up --build
```

API disponible en: `http://localhost:8000`
