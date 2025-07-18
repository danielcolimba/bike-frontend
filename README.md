# React + Vite

# 🚴‍♂️ Royal Bike - Frontend

Frontend de la aplicación Royal Bike desarrollado con React + Vite / Tailwind y nginx.

## 📋 Requisitos

- **Node.js 18+**
- **npm 8+**
- **Docker** (opcional, para contenedores)

## 🚀 Inicio Rápido

### Desarrollo Local

1. **Clonar e instalar dependencias:**
```bash
cd bike-frontend/royal-bike
npm install
```

2. **Configurar variables de entorno:**
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env según tu entorno:
# Para desarrollo local sin Docker:
VITE_API_BASE_URL=http://localhost:8000
VITE_API_AUTH_BASE_URL=http://localhost:8001

# Para Docker Compose (rutas relativas):
VITE_API_BASE_URL=/api
VITE_API_AUTH_BASE_URL=/auth
```

3. **Iniciar servidor de desarrollo:**
```bash
npm run dev
# o usar el script helper
./dev.sh dev
```

### 🐳 Con Docker

1. **Construir imagen:**
```bash
docker build -t bike-frontend:latest .
# o usar el script
./dev.sh build-docker
```

2. **Ejecutar contenedor:**
```bash
docker run -p 3000:80 bike-frontend:latest
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas de la aplicación
├── context/            # Contextos de React
├── config/             # Configuración (rutas API)
├── assets/             # Imágenes y recursos estáticos
├── App.jsx             # Componente principal
└── main.jsx           # Punto de entrada

nginx.conf              # Configuración del servidor web
dockerfile              # Definición del contenedor
.env.example           # Ejemplo de variables de entorno
```

## 🛠️ Scripts Disponibles

### Scripts npm
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build
npm run lint         # Ejecutar linter
```

### Script helper (./dev.sh)
```bash
./dev.sh dev         # Iniciar desarrollo
./dev.sh build       # Construir producción
./dev.sh build-docker # Construir imagen Docker
./dev.sh clean       # Limpiar cache
./dev.sh help        # Ver ayuda
```

## 🌐 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | URL base del API backend | `/api` o `http://localhost:8000` |
| `VITE_API_AUTH_BASE_URL` | URL base del API de auth | `/auth` o `http://localhost:8001` |
| `VITE_APP_ENV` | Entorno de la aplicación | `development`, `production` |
| `VITE_PORT` | Puerto del servidor dev | `3000` |

## 🔧 Configuración de Nginx

El archivo `nginx.conf` está configurado para:

- ✅ Servir aplicación SPA (Single Page Application)
- ✅ Proxy reverso para APIs (`/api/*` → backend:8000)
- ✅ Proxy reverso para auth (`/auth/*` → auth:8001)
- ✅ Headers CORS configurados
- ✅ Cache de archivos estáticos
- ✅ Logs de acceso y errores

## 🐳 Docker

### Dockerfile Multi-stage

1. **Stage 1 (builder):** Construye la aplicación React
2. **Stage 2 (nginx):** Sirve archivos estáticos con nginx

### Variables de construcción
```bash
docker build 
  --build-arg VITE_API_BASE_URL=/api 
  --build-arg VITE_API_AUTH_BASE_URL=/auth 
  -t bike-frontend:latest .
```

## 🔗 Integración con Backend

El frontend se comunica con:

- **Backend API** (puerto 8000): Productos, carrito, compras
- **Auth Service** (puerto 8001): Autenticación y usuarios
- **Cart Service** (puerto 8002): Gestión de carrito (via backend)

### Endpoints principales:
```javascript
// Auth
POST /auth/login/
POST /auth/register/user/

// Products
GET /api/products/
GET /api/top-bicycles/

// Cart
GET /api/cart/view/
POST /api/cart/add/
PUT /api/cart/update/
DELETE /api/cart/remove/
```

## 🚀 Despliegue

### Con Docker Compose
```bash
# Desde el directorio bike-backend
docker-compose up frontend
```

### Producción
1. Construir imagen optimizada
2. Configurar variables de entorno
3. Desplegar con nginx como proxy reverso

## 🐛 Troubleshooting

### Problemas comunes:

1. **Error de conexión API:**
   - Verificar variables de entorno
   - Comprobar que backend esté ejecutándose
   - Revisar configuración de nginx

2. **Problemas de CORS:**
   - Verificar headers en nginx.conf
   - Comprobar configuración de backend

3. **Build falla:**
   - Limpiar cache: `./dev.sh clean`
   - Reinstalar dependencias: `npm install`

