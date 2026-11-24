# GYM VIP — Portal Público Oficial y Centro de Descarga (`gymvip-Landing-Page` / `gymvip-publico`)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Astro Version](https://img.shields.io/badge/Astro-5.4-BC52EE.svg)]()
[![TypeScript Version](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg)]()
[![Architecture](https://img.shields.io/badge/Clean%20Architecture-Enabled-success.svg)]()
[![LPDP Compliance](https://img.shields.io/badge/LPDP%20Ley%2029733-Per%C3%BA-blue.svg)]()
[![Branch](https://img.shields.io/badge/branch-ACOSTA--MEJORAS--Y--ACTUALIZACIONES-yellow.svg)]()
[![License](https://img.shields.io/badge/license-Academic%20Proprietary-lightgrey.svg)]()

> **Ubicación en el Workspace:** `gymvip-publico/`  
> **Organización Oficial:** [gymvip-upeu/gymvip-Landing-Page](https://github.com/gymvip-upeu/gymvip-Landing-Page)  
> **Documentación Centralizada:** `../documentos/`  
> **Fecha de Actualización:** 23 de Noviembre de 2026 | Revisión Canónica v2.5

---

## 1. Nombre del Componente
**GYM VIP Public Portal & Official App Distribution** (`gymvip-Landing-Page` / `gymvip-publico`).

---

## 2. Propósito
Constituir la presencia institucional pública del centro de entrenamiento **VIP CENTER FIT**, ofreciendo un canal web rápido, accesible y confiable para que clientes y prospectos consulten horarios, tarifas y sedes, accedan a la aplicación web del gimnasio, descarguen de forma segura el APK release oficial para Android, y ejerzan sus derechos de privacidad bajo la Ley N° 29733 de Protección de Datos Personales de Perú.

---

## 3. Responsabilidades
- **Presencia Web Institucional:** Portada informativa responsive con propuesta de valor Luxury Fitness, catálogo comercial de membresías y sedes físicas reales.
- **Acceso Directo al Sistema Web:** Enlace canónico y visible (`https://gymvip-frontend.vercel.app/inicio`) sin forzar redirecciones automáticas que bloqueen la lectura de la landing.
- **Centro Oficial de Descarga de la App Android (`/descargar`):** Página estable de destino para códigos QR impresos en recepción, con botón de descarga del APK release, especificación de versión (`v1.1.3`), fecha, requisitos de hardware y huella criptográfica SHA-256.
- **Cumplimiento Normativo LPDP:** Canal formal de derechos ARCO (`/eliminar-cuenta`) con validación de identidad e informe de consecuencias legales.
- **Información Legal y Transparencia:** Términos de servicio, política de privacidad, aviso legal, catálogo de licencias de código abierto (SBOM) y atribuciones de propiedad intelectual.

---

## 4. Arquitectura
Generación de Sitio Estático (SSG) de alto rendimiento impulsada por **Astro 5**, complementada con principios de **Clean Architecture** en TypeScript para los módulos interactivos:
- **`src/core/models/`:** Modelos de dominio inmutables (`ReleaseInfo`, `AccountDeletionRequest`).
- **`src/core/ports/`:** Contratos e interfaces desacopladas de repositorios (`IReleaseRepository`, `IAccountDeletionRepository`).
- **`src/core/adapters/`:** Implementaciones de infraestructura (`GitHubReleaseAdapter`, `LocalAccountDeletionAdapter`).
- **`src/core/usecases/`:** Casos de uso de negocio puros (`GetAndroidReleaseUseCase`, `SubmitAccountDeletionUseCase`).
- **`src/layouts/`:** Plantillas reutilizables (`BaseLayout.astro`, `LegalLayout.astro`) con metadatos Open Graph, tokens de color Dark & Gold y accesibilidad WCAG AA.
- **`src/components/`:** Componentes de interfaz (Hero, Beneficios, Horarios, Preguntas Frecuentes, Generador QR en SVG).
- **`src/pages/`:** 9 rutas estáticas optimizadas para CDN.

---

## 5. Tecnologías y Versiones Reales
| Tecnología | Versión Oficial | Propósito |
|---|---|---|
| **Astro Framework** | 5.4.x | Compilador web estático SSG con cero JavaScript por defecto |
| **TypeScript** | 5.7.x | Tipado estático estricto y contratos de Clean Architecture |
| **Node.js** | 20.x LTS / 22.x | Entorno de compilación y ejecución de scripts |
| **npm** | 10.x | Gestor de paquetes reproducible |
| **Vercel Edge Network** | Producción | Servidor CDN perimetral con compresión Brotli |

---

## 6. Estructura de Carpetas
```text
gymvip-publico/
├── astro.config.mjs             # Configuración del compilador Astro (modo SSG)
├── tsconfig.json                # Configuración TypeScript estricta
├── package.json                 # Scripts de build, test y dependencias
├── vercel.json                  # Headers HTTP de seguridad y caché en Vercel
├── CONTRIBUTING.md              # Estándar obligatorio de commits
├── README.md                    # Esta documentación canónica
├── public/                      # Recursos estáticos servidos en la raíz
│   ├── robots.txt               # Instrucciones para motores de búsqueda
│   ├── favicon.svg              # Isotipo vectorial Dark & Gold
│   └── gymvip-mobile-release-v1.1.3.apk # Binario universal Android
└── src/
    ├── core/                    # Clean Architecture en TypeScript
    │   ├── models/              # ReleaseInfo.ts, AccountDeletion.ts
    │   ├── ports/               # Interfaces de repositorio
    │   ├── adapters/            # Adaptadores de datos locales y GitHub
    │   └── usecases/            # Casos de uso de descarga y ARCO
    ├── layouts/                 # BaseLayout.astro, LegalLayout.astro
    ├── components/              # Header, Footer, Hero, Benefits, QrCode, etc.
    └── pages/                   # index, descargar, contacto, eliminar-cuenta, etc.
```

---

## 7. Funcionalidades
1. **Portada Institucional (`/`):** Hero section con botones de acción directa, grid de beneficios tecnológicos, horarios de atención y planes presenciales en Soles (PEN).
2. **Página de Descarga Oficial (`/descargar`):** Resumen técnico del APK v1.1.3, tamaño (38 MB), requisitos Android 8.0+ (API 24+) y huella digital SHA-256 verificable.
3. **Canal ARCO de Supresión de Cuenta (`/eliminar-cuenta`):** Formulario con validación DNI y correo para solicitud de revocación conforme a la Ley N° 29733.
4. **Directorio y Contacto (`/contacto`):** Ubicación real de sedes (Sede Ñaña UPeU Km 19 Chosica / Sede Juliaca), correos autorizados (`devteam@gymvip.pe`, `soporte@gymvip.pe`).
5. **Transparencia Legal:** Páginas estáticas para términos, privacidad, aviso legal, atribuciones y licencias.

---

## 8. Usuarios y Roles Correspondientes
- **Público General y Socios:** Navegación libre, descarga del aplicativo móvil, consulta de información y ejercicio de derechos de privacidad.
- **Equipo de Soporte y Legal:** Procesamiento de solicitudes de eliminación recibidas a través del canal oficial.

---

## 9. Requisitos Previos
- **Node.js:** Versión 20 LTS o 22 LTS instalada.
- **npm:** Versión 10+.

---

## 10. Instalación desde Cero
```powershell
# 1. Clonar el repositorio
git clone https://github.com/gymvip-upeu/gymvip-Landing-Page.git
Set-Location gymvip-publico

# 2. Situarse en la rama de trabajo
git checkout ACOSTA-MEJORAS-Y-ACTUALIZACIONES

# 3. Instalación de dependencias
npm ci
```

---

## 11. Variables de Entorno
Configurar en `.env` (o en el panel de Vercel):
```env
PUBLIC_FRONTEND_URL=https://gymvip-frontend.vercel.app
PUBLIC_APK_DOWNLOAD_URL=/gymvip-mobile-release-v1.1.3.apk
PUBLIC_CONTACT_EMAIL=soporte@gymvip.pe
```

---

## 12. Configuración Local
El proyecto no requiere base de datos ni servicios externos en ejecución para renderizar sus páginas públicas.

---

## 13. Comandos de Ejecución
```powershell
# Servidor de desarrollo local con recarga rápida
npm run dev
```
Disponible en `http://localhost:4321`.

---

## 14. Comandos de Compilación
```powershell
# Compilación de producción SSG
npm run build

# Salida estática generada en: dist/
# Para previsualizar el sitio compilado:
npm run preview
```

---

## 15. Pruebas
```powershell
# Ejecutar suite de pruebas unitarias de casos de uso y adaptadores
npm test
```
*Total de pruebas ejecutadas:* 8 tests pasando satisfactoriamente.

---

## 16. Integraciones
- **gymvip-frontend:** Enlace institucional directo desde el botón "Ingresar" en el Header.
- **gymvip-mobile:** Distribución del archivo binario APK release firmado.

---

## 17. Seguridad
- Sitio 100% estático: superficie de ataque prácticamente nula.
- Cabeceras de seguridad estrictas en `vercel.json`: Content-Security-Policy (CSP), X-Content-Type-Options, X-Frame-Options: DENY, HSTS pre-activado.
- Cero recolección de contraseñas ni almacenamiento de datos sensibles en el portal público.

---

## 18. Despliegue
- **Plataforma Productiva:** Vercel Hosting (Edge CDN).
- **Dominio Oficial:** `https://gymvip.vercel.app` (o dominio institucional asignado).

---

## 19. Solución de Problemas Frecuentes
- **Error 404 al descargar el APK:** Asegurarse de que el archivo `.apk` esté ubicado en la carpeta `public/` antes de ejecutar `npm run build`.
- **Incompatibilidad de enlaces:** Comprobar que `PUBLIC_FRONTEND_URL` apunte a la URL activa del frontend.

---

## 20. Limitaciones Conocidas
- El portal no procesa compras ni reservas en línea; orienta al usuario hacia la sede física o hacia las aplicaciones web y móvil.

---

## 21. Enlaces hacia los Otros Repositorios
- **Backend API:** [gymvip-backend](https://github.com/gymvip-upeu/gymvip-backend)
- **Frontend Web:** [gymvip-frontend](https://github.com/gymvip-upeu/gymvip-frontend)
- **App Móvil:** [gymvip-mobile](https://github.com/gymvip-upeu/gymvip-mobile)
- **Comunicaciones:** [gymvip-ms-comunicaciones](https://github.com/gymvip-upeu/gymvip-ms-comunicaciones)

---

## 22. Enlaces hacia Diagramas
- **Flujo de Distribución y Descarga APK:** `../documentos/diagramas/09-Flujos-Funcionales/06_flujo_distribucion_apk_y_actualizacion.puml`

---

## 23. Enlaces hacia ESTADO_PROYECTO.md
- Documento Central: [`../documentos/ESTADO_PROYECTO.md`](../documentos/ESTADO_PROYECTO.md)

---

## 24. Fecha y Revisión de Referencia
- **Fecha:** 23 de Noviembre de 2026.
- **Revisión de Ingeniería:** Consolidación Maestra Sprint 1 & 2 / Release Candidate v2.5.
- **Autoría:** Equipo de Ingeniería GYM VIP / VIP CENTER FIT.
