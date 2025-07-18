#!/bin/bash

# Script para desarrollo local del frontend
# Uso: ./dev.sh [comando]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar ayuda
show_help() {
    echo -e "${GREEN}🚀 Royal Bike Frontend - Script de Desarrollo${NC}"
    echo ""
    echo "Uso: ./dev.sh [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo "  dev         - Iniciar servidor de desarrollo"
    echo "  build       - Construir para producción"
    echo "  build-docker - Construir imagen Docker"
    echo "  preview     - Previsualizar build de producción"
    echo "  lint        - Ejecutar linter"
    echo "  clean       - Limpiar dependencias y cache"
    echo "  install     - Instalar dependencias"
    echo "  help        - Mostrar esta ayuda"
}

# Verificar si Node.js está instalado
check_node() {
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js no está instalado${NC}"
        echo "Por favor instala Node.js versión 18 o superior"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 16 ]; then
        echo -e "${YELLOW}⚠️  Advertencia: Se recomienda Node.js versión 16 o superior${NC}"
    fi
}

# Verificar si las dependencias están instaladas
check_dependencies() {
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
        npm install
    fi
}

# Función principal
main() {
    check_node
    
    case "${1:-dev}" in
        "dev"|"start")
            echo -e "${GREEN}🔥 Iniciando servidor de desarrollo...${NC}"
            check_dependencies
            npm run dev
            ;;
        "build")
            echo -e "${GREEN}🏗️  Construyendo para producción...${NC}"
            check_dependencies
            npm run build
            ;;
        "build-docker")
            echo -e "${GREEN}🐳 Construyendo imagen Docker...${NC}"
            docker build -t bike-frontend:latest .
            echo -e "${GREEN}✅ Imagen Docker construida exitosamente${NC}"
            ;;
        "preview")
            echo -e "${GREEN}👀 Iniciando preview de producción...${NC}"
            check_dependencies
            npm run preview
            ;;
        "lint")
            echo -e "${GREEN}🔍 Ejecutando linter...${NC}"
            check_dependencies
            npm run lint
            ;;
        "clean")
            echo -e "${YELLOW}🧹 Limpiando cache y dependencias...${NC}"
            rm -rf node_modules
            rm -rf dist
            rm -rf .vite
            npm cache clean --force
            echo -e "${GREEN}✅ Limpieza completada${NC}"
            ;;
        "install")
            echo -e "${GREEN}📦 Instalando dependencias...${NC}"
            npm install
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            echo -e "${RED}❌ Comando desconocido: $1${NC}"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

main "$@"
