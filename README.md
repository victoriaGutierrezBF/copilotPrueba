# CopilotPrueba

Aplicación web full-stack con autenticación JWT compuesta por un **backend FastAPI** y un **frontend React**.

---

## Descripción

| Componente | Tecnología | Ruta |
|---|---|---|
| Backend | FastAPI + JWT | `backend/` |
| Frontend | React + Vite | `frontend/` |

### Flujo de autenticación

1. El usuario ingresa sus credenciales en la pantalla de **Login**.
2. El frontend llama a `POST /token` del backend y recibe un `access_token` y un `refresh_token`.
3. Los tokens se almacenan en **`sessionStorage`** (se borran automáticamente al cerrar el navegador).
4. La página de **Bienvenida** es una ruta protegida: si no hay sesión activa, se redirige a `/login`.
5. El botón "Cerrar sesión" elimina los tokens y redirige al login.

---

## Requisitos previos

- **Node.js** ≥ 18 y **npm** ≥ 9
- **Python** ≥ 3.11 y **Poetry** (o Docker)

---

## Backend

### Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `JWT_SECRET_KEY` | Clave secreta para firmar los JWT (≥ 32 caracteres) | `mi-clave-super-secreta-de-32-chars` |
| `ADMIN_USERNAME` | Usuario válido | `admin` |
| `ADMIN_PASSWORD` | Contraseña del usuario | `admin123` |

### Inicio con Poetry

```bash
cd backend
export JWT_SECRET_KEY="mi-clave-super-secreta-de-32-chars"
export ADMIN_USERNAME="admin"
export ADMIN_PASSWORD="admin123"
poetry install
poetry run uvicorn app.main:app --reload
```

La API quedará disponible en **http://localhost:8000**.

### Inicio con Docker

```bash
cd backend
export JWT_SECRET_KEY="mi-clave-super-secreta-de-32-chars"
export ADMIN_USERNAME="admin"
export ADMIN_PASSWORD="admin123"
docker compose up --build
```

### Endpoints disponibles

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/token` | Genera access_token y refresh_token |
| `POST` | `/token/refresh` | Renueva el access_token con el refresh_token |

---

## Frontend

### Configuración

Copia el archivo de ejemplo y ajusta la URL del backend si es necesario:

```bash
cd frontend
cp .env.example .env
# Editar .env si el backend no corre en http://localhost:8000
```

### Inicio en modo desarrollo

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en **http://localhost:5173**.

### Construcción para producción

```bash
cd frontend
npm run build
# Los archivos estáticos quedan en frontend/dist/
```

---

## Inicio rápido (ambos servicios)

Abre dos terminales:

**Terminal 1 – Backend:**
```bash
cd backend
export JWT_SECRET_KEY="mi-clave-super-secreta-de-32-chars"
export ADMIN_USERNAME="admin"
export ADMIN_PASSWORD="admin123"
poetry install && poetry run uvicorn app.main:app --reload
```

**Terminal 2 – Frontend:**
```bash
cd frontend
npm install && npm run dev
```

Luego abre **http://localhost:5173** en tu navegador e inicia sesión con:

- **Usuario:** `admin`
- **Contraseña:** `admin123`

---

## Estructura del proyecto

```
.
├── backend/                 # API FastAPI
│   ├── app/
│   │   └── main.py          # Endpoints /token y /token/refresh
│   ├── pyproject.toml
│   └── README.md
└── frontend/                # SPA React
    ├── src/
    │   ├── api/
    │   │   └── auth.js       # Llamadas HTTP al backend
    │   ├── contexts/
    │   │   ├── AuthContext.js    # Contexto de autenticación
    │   │   ├── AuthProvider.jsx  # Proveedor del contexto
    │   │   └── useAuth.js        # Hook useAuth
    │   ├── components/
    │   │   └── ProtectedRoute.jsx # Guarda de rutas privadas
    │   ├── pages/
    │   │   ├── LoginPage.jsx      # Pantalla de login
    │   │   └── WelcomePage.jsx    # Pantalla de bienvenida (protegida)
    │   ├── App.jsx                # Configuración de rutas
    │   └── main.jsx               # Punto de entrada React
    ├── .env.example
    └── index.html
```
