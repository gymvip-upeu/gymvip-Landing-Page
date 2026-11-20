# GYM VIP — Portal Público Oficial (VIP CENTER FIT)

Portal web público informativo, centro de descargas para Android y plataforma de cumplimiento normativo (Ley N° 29733 de Protección de Datos Personales de Perú).

Desarrollado con **Astro 5 + TypeScript**, generación estática (SSG) y arquitectura desacoplada (*Clean Architecture*) para los flujos con comportamiento interactivo.

---

## 1. Arquitectura del Proyecto

```text
gymvip-publico/
├── astro.config.mjs             # Configuración del compilador Astro (modo estático SSG)
├── tsconfig.json                # Configuración TypeScript estricta
├── package.json                 # Scripts de build, pruebas y dependencias
├── vercel.json                  # Reglas de enrutamiento Vercel, redirecciones 301 y headers
├── public/                      # Recursos estáticos (robots.txt, favicon.svg)
├── legacy/                      # Respaldo histórico de páginas HTML/CSS/JS originales
├── dist/                        # Salida estática compilada lista para CDN
└── src/
    ├── core/                    # Clean Architecture (comportamiento real desacoplado)
    │   ├── models/              # Modelos de dominio y validaciones (ReleaseInfo, AccountDeletion)
    │   ├── ports/               # Interfaces / Contratos de repositorios (IReleaseRepository, IAccountDeletionRepository)
    │   ├── adapters/            # Implementaciones de infraestructura (GitHubReleaseAdapter, LocalAccountDeletionAdapter)
    │   └── usecases/            # Casos de uso (GetAndroidReleaseUseCase, SubmitAccountDeletionUseCase)
    ├── layouts/
    │   ├── BaseLayout.astro     # Estructura base HTML5, meta tags, tokens Dark & Gold y skip-links
    │   └── LegalLayout.astro    # Plantilla unificada para documentos de cumplimiento legal
    ├── components/
    │   ├── Header.astro         # Navegación responsive con botón CTA directo al sistema web
    │   ├── Footer.astro         # Pie de página institucional y accesos legales
    │   ├── Hero.astro           # Portada concisa con beneficios clave y llamadas a la acción
    │   ├── Benefits.astro       # Propuesta de valor tecnológica (QR dinámico, caja transparente)
    │   ├── Schedules.astro      # Horarios oficiales de entrenamiento y sede presencial
    │   ├── Memberships.astro    # Planes de membresía presenciales sin cargos recurrentes
    │   ├── FaqSection.astro     # Preguntas frecuentes en acordeón nativo accesible
    │   ├── QrCode.astro         # Generador de código QR SVG en tiempo de build
    │   └── AccountDeletionForm.astro # Formulario interactivo de supresión de datos ARCO
    └── pages/
        ├── index.astro          # Portada principal (/)
        ├── descargar.astro      # Centro de descarga de la App Android (/descargar)
        ├── contacto.astro       # Canales oficiales de atención y sede presencial (/contacto)
        ├── eliminar-cuenta.astro# Procedimiento y formulario formal ARCO (/eliminar-cuenta)
        ├── privacidad.astro     # Política de privacidad bajo Ley N° 29733 (/privacidad)
        ├── terminos.astro       # Términos y condiciones del servicio (/terminos)
        ├── aviso-legal.astro    # Aviso legal y titularidad del proyecto (/aviso-legal)
        ├── atribuciones.astro   # Propiedad intelectual y atribuciones (/atribuciones)
        └── licencias.astro      # SBOM y catálogo de licencias de código abierto (/licencias)
```

---

## 2. Requisitos y Configuración Local

- **Node.js:** Versión 18.17+, 20+ o 22+ (probado y verificado en Node.js v26 LTS).
- **Gestor de paquetes:** `npm` (v10+).

### Instalación de dependencias
```bash
npm install
```

### Servidor de desarrollo local
```bash
npm run dev
```
El portal estará disponible en `http://localhost:4321`.

### Verificación estricta de tipos y diagnóstico
```bash
npm run check
```

### Ejecución de pruebas unitarias de dominio
```bash
npm test
```

### Compilación estática de producción
```bash
npm run build
```
Genera los archivos HTML estáticos y assets optimizados en el directorio `dist/`.

---

## 3. Despliegue en Vercel como Proyecto Independiente

Para desplegar este portal como proyecto independiente dentro del monorepo GYM VIP en Vercel:

1. **Crear nuevo proyecto en el Dashboard de Vercel:**
   - Seleccionar el repositorio `gymvip-upeu/gymvip` (o el repositorio raíz correspondiente).
2. **Configuración de Directorio Raíz (*Root Directory*):**
   - Establecer `Root Directory` en: `gymvip-publico`.
3. **Parámetros de Construcción:**
   - **Framework Preset:** `Astro`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. **Variables de Entorno Opcionales:**
   - `PUBLIC_APK_DOWNLOAD_URL`: URL directa del archivo APK firmado en GitHub Releases (ej. `https://github.com/gymvip-upeu/gymvip-mobile/releases/download/v1.1.1/GYM_VIP_Mobile_Render_v1.1.1_Release.apk`).
5. **Redirecciones y Seguridad Automáticas (`vercel.json`):**
   - Redirecciones permanentes (HTTP 301) para rutas antiguas con extensión `.html` hacia rutas limpias (`/index.html` -> `/`, `/contacto.html` -> `/contacto`, `/descargas` -> `/descargar`, etc.).
   - Headers HTTP de seguridad incluidos: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.

---

## 4. Enlaces de Integración con el Ecosistema

- **Acceso a la Plataforma Web (Socios y Administración):**
  Todos los botones y enlaces del portal dirigen de forma fija y segura a:
  `https://gymvip-frontend.vercel.app/inicio`
  *(Verificado con respuesta HTTP 200 OK)*.
- **Backend de Producción:**
  `https://gymvip-backend.onrender.com`

---

## 5. Procedimiento para Publicación de Nuevas Versiones del APK Android

Para actualizar la versión del APK disponible en `/descargar`:

1. **Compilar y firmar el APK en el proyecto `gymvip-mobile`:**
   ```powershell
   Set-Location gymvip-mobile
   .\gradlew.bat assembleRelease
   ```
   El paquete firmado se genera en `gymvip-mobile/composeApp/build/outputs/apk/release/composeApp-release.apk` y se copia en `entregables/android/GYM_VIP_Mobile_Render_vX.Y.Z_Release.apk`.
2. **Obtener el Checksum SHA-256 e integridad:**
   ```powershell
   Get-FileHash "entregables/android/GYM_VIP_Mobile_Render_v1.1.1_Release.apk" -Algorithm SHA256
   ```
   *Valor verificado para v1.1.1:* `0B7462D30653E40E5AF1D06211F2DCBF068050FC69556FD8865D82FCB4435CDF` (13,969,920 bytes).
3. **Publicar en GitHub Releases:**
   - Crear una nueva Release con la etiqueta `v1.1.1` en el repositorio público de distribución de `gymvip-mobile` (ej. `https://github.com/gymvip-upeu/gymvip-mobile/releases`).
   - Adjuntar el asset con el nombre exacto esperado: `GYM_VIP_Mobile_Render_v1.1.1_Release.apk`.
4. **Comprobación:**
   - La página `/descargar` detecta automáticamente la disponibilidad del asset vía HEAD request. Si no está publicado aún, presenta el estado honesto de "Próximamente / Compilado localmente" sin generar enlaces rotos ni descargas 404.

---

## 6. Equipo de Desarrollo de Software (VIP DevStudio)

El portal web público y el ecosistema digital **GYM VIP** han sido concebidos, diseñados e implementados por el equipo de ingeniería de software:

- **Nombre del Equipo:** `VIP DevStudio`
- **Institución:** Universidad Peruana Unión (UPeU) — Facultad de Ingeniería y Arquitectura
- **Sede de Desarrollo:** **Sede en Ñaña** (Campus Universitario, Km 19 Carretera Central, Lurigancho-Chosica, Lima — Perú)
- **Contacto de Ingeniería y Soporte Técnico:** [devteam@gymvip.pe](mailto:devteam@gymvip.pe)
- **Organización GitHub:** [https://github.com/gymvip-upeu](https://github.com/gymvip-upeu)
- **Repositorio Oficial de la Landing Page:** [https://github.com/gymvip-upeu/gymvip-Landing-Page.git](https://github.com/gymvip-upeu/gymvip-Landing-Page.git)

### Estructura de Ramas en el Repositorio
- `main`: Rama de producción estable desplegada automáticamente en CDN (Vercel).
- `develop`: Rama de integración activa del equipo de desarrollo para nuevas características.
- `v1-landing-page`: Rama congelada que preserva la Versión 1.0 de la Landing Page pública migrada a Astro 5 con Clean Architecture.

