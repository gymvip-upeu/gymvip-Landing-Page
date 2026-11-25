/**
 * Catálogo centralizado y verificado de VIP CENTER FIT (GYM VIP).
 *
 * Política de veracidad estricta:
 * - Solo incluye horarios, servicios (V12 backend), sedes y reglas comerciales reales.
 * - NO inventa precios en PEN ni porcentajes de descuento promocional no confirmados.
 * - Identifica las imágenes provenientes del ecosistema móvil/web como referencias visuales.
 */

export interface GymPlan {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  featured: boolean;
  durationLabel: string;
  renewalPolicy: string;
  priceDisplay: string;
  priceSubtext: string;
  ctaLabel: string;
  ctaHref: string;
  highlights: { text: string; included: boolean }[];
  extraDetails: string[];
}

export interface GymServiceItem {
  id: string;
  name: string;
  shortTitle: string;
  location: string;
  schedule: string;
  modality: string;
  description: string;
  detailNote: string;
  image: string;
  imageAlt: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  image: string;
  imageAlt: string;
  referenceCaption: string;
}

export interface ScheduleRow {
  days: string;
  hours: string;
  note?: string;
}

export interface FaqItem {
  id: string;
  category: 'Planes y Pagos' | 'Acceso QR' | 'App Móvil' | 'Privacidad ARCO';
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const SITE_BRAND = {
  brandName: 'VIP CENTER FIT',
  ecosystemName: 'GYM VIP',
  tagline: 'Luxury Fitness & Control Digital',
  sedeNombre: 'Sede Central Juliaca',
  sedeCiudad: 'Juliaca, San Román, Puno — Perú',
  sedeNotaUbicacion: 'Dirección exacta de calle y numeración confirmada en canal de atención y recepción.',
  frontendUrl: 'https://gymvip-frontend.vercel.app/inicio',
  supportEmail: 'soporte@gymvip.pe',
  devStudioName: 'VIP DevStudio — Sede en Ñaña',
  devStudioDetail: 'Campus Universitario UPeU (Km 19 Carretera Central, Lurigancho-Chosica, Lima — Perú)',
  devEmail: 'devteam@gymvip.pe',
  githubOrgUrl: 'https://github.com/gymvip-upeu',
  githubLandingUrl: 'https://github.com/gymvip-upeu/gymvip-Landing-Page',
  legalAgeMin: 18,
  checkInCutMinutes: 45,
};

export const HERO_SLIDES = [
  {
    id: 'slide-club',
    eyebrow: 'SEDE CENTRAL · JULIACA, PUNO',
    titleLead: 'Entrena con disciplina,',
    titleAccent: 'control QR y soporte digital.',
    description:
      'Musculación, zona cardiovascular, clases grupales VIP y seguimiento real de tu membresía en un solo ecosistema conectado a tu teléfono.',
    primaryCta: { label: 'Explorar Membresías', href: '#planes' },
    secondaryCta: { label: 'Descargar App Android', href: '/descargar' },
    image: '/images/hero-club.webp',
    imageAlt: 'Entrenamiento de fuerza y mancuernas — visual referencial VIP CENTER FIT',
    referenceNote: 'Visual de referencia del ecosistema VIP CENTER FIT.',
    stats: [
      { label: 'Ciclo de vigencia', value: '30 días continuos' },
      { label: 'Acceso sin colas', value: 'QR Dinámico (60s)' },
      { label: 'App Android oficial', value: 'APK v1.1.3 firmada' },
    ],
  },
  {
    id: 'slide-app',
    eyebrow: 'AUTOSERVICIO DEL SOCIO · APP MÓVIL v1.1.3',
    titleLead: 'Tu carnet digital,',
    titleAccent: 'suplementos y horarios en tu mano.',
    description:
      'Consulta tu estado de vigencia incluso sin conexión, reserva productos del stand de suplementos y valida tu ingreso en recepción mediante código QR.',
    primaryCta: { label: 'Obtener APK v1.1.3', href: '/descargar' },
    secondaryCta: { label: 'Portal Web Administradores', href: SITE_BRAND.frontendUrl, external: true },
    image: '/images/hero-athlete.webp',
    imageAlt: 'Atleta entrenando con mancuernas — visual de marca GYM VIP',
    referenceNote: 'Recurso gráfico oficial del ecosistema GYM VIP.',
    stats: [
      { label: 'Modo Offline', value: 'Caché SQLite segura' },
      { label: 'Retiro en tienda', value: 'Ticket QR opaco' },
      { label: 'Privacidad', value: 'Ley N° 29733 (ARCO)' },
    ],
  },
];

export const SCHEDULES: ScheduleRow[] = [
  { days: 'Lunes a Viernes', hours: '06:00 – 22:00', note: 'Turno corrido' },
  { days: 'Sábados', hours: '07:00 – 20:00', note: 'Horario regular' },
  { days: 'Domingos', hours: '08:00 – 14:00', note: 'Mañana y bienestar' },
  { days: 'Feriados', hours: '08:00 – 12:00', note: 'Horario especial' },
];

export const GYM_PLANS: GymPlan[] = [
  {
    id: 'mensual',
    name: 'Plan Mensual',
    subtitle: 'Ideal para iniciar tu rutina con flexibilidad ciclo a ciclo en sede.',
    featured: false,
    durationLabel: '30 días calendario continuos',
    renewalPolicy: 'Sin renovación automática ni débitos ocultos',
    priceDisplay: 'Tarifa oficial en Soles (PEN)',
    priceSubtext: 'Monto vigente confirmado en mostrador de Juliaca al momento del alta',
    ctaLabel: 'Consultar en Recepción',
    ctaHref: '/contacto',
    highlights: [
      { text: 'Acceso a Sala de Musculación y Zona Cardio', included: true },
      { text: 'Ingreso seguro mediante QR dinámico en App Móvil', included: true },
      { text: 'Uso de lockers y vestuarios durante la sesión', included: true },
      { text: 'Clases grupales VIP según cupo diario', included: true },
      { text: 'Prioridad en asesoría nutricional programada', included: false },
      { text: 'Pausa preventiva por viaje o descanso médico', included: false },
    ],
    extraDetails: [
      'Cómputo exacto de 30 días continuos en zona horaria America/Lima.',
      '0 días de gracia tras vencimiento; se renueva de forma presencial.',
      'Medios habilitados: Efectivo, POS/Tarjeta, Yape, Plin o enlace CulqiLink emitido en recepción.',
    ],
  },
  {
    id: 'trimestral',
    name: 'Plan Trimestral',
    subtitle: 'La opción más elegida para consolidar hábito, fuerza y seguimiento real.',
    badge: 'MÁS ELEGIDO',
    featured: true,
    durationLabel: '90 días calendario continuos',
    renewalPolicy: 'Control de vigencia y alertas anticipadas',
    priceDisplay: 'Tarifa oficial en Soles (PEN)',
    priceSubtext: 'Condición preferencial confirmada presencialmente en recepción',
    ctaLabel: 'Solicitar en Sede Central',
    ctaHref: '/contacto',
    highlights: [
      { text: 'Acceso irrestricto en todos los horarios regulares', included: true },
      { text: 'Carnet digital QR offline y notificaciones de vencimiento', included: true },
      { text: 'Clases grupales VIP (sujeto a cupo y horario de sala)', included: true },
      { text: 'Acceso prioritario a Asesoría Nutricional Básica (Mar/Jue)', included: true },
      { text: 'Acceso a Área de Bienestar / Sauna Seco (Vie–Dom)', included: true },
      { text: 'Pausa extendida anual sujeta a evaluación administrativa', included: false },
    ],
    extraDetails: [
      'Comprobante oficial emitido al instante en caja o vía canal autorizado.',
      'Compatible con compra y retiro QR en el Stand de Suplementos desde la App.',
      'Revalidación inmediata de acceso sin colas mediante escaneo QR en torniquete.',
    ],
  },
  {
    id: 'semestral-anual',
    name: 'Plan Semestral / Anual',
    subtitle: 'Compromiso sostenido de rendimiento con atención preferente de sala.',
    featured: false,
    durationLabel: '180 o 360 días continuos',
    renewalPolicy: 'Cobertura extendida con trazabilidad completa',
    priceDisplay: 'Tarifa oficial en Soles (PEN)',
    priceSubtext: 'Planificación semestral o anual cotizada directamente en mostrador',
    ctaLabel: 'Consultar en Recepción',
    ctaHref: '/contacto',
    highlights: [
      { text: 'Acceso integral a musculación, cardio y clases grupales', included: true },
      { text: 'Evaluación inicial y asesoría nutricional programada', included: true },
      { text: 'Acceso completo a lockers, vestuarios y Sauna Seco', included: true },
      { text: 'Registro y reserva de suplementos desde la App Móvil', included: true },
      { text: 'Atención preferente en recepción para renovación o soporte', included: true },
      { text: 'Congelamiento preventivo por descanso médico o viaje justificado', included: true },
    ],
    extraDetails: [
      'Condiciones de congelamiento preventivo verificadas en recepción según historial de vigencia.',
      'Control documental transparente de inicio, vencimiento y recibo.',
      'Para menores de edad se requiere registro presencial de apoderado conforme a Ley N° 29733.',
    ],
  },
];

export const DAILY_PASS_INFO = {
  title: 'Pase Diario (1 día)',
  badge: 'MODALIDAD POR DÍA',
  description:
    '¿Visitas Juliaca o deseas conocer las instalaciones antes de contratar una membresía? Solicita un Pase Diario válido para el día de emisión directamente en mostrador con tu DNI/CE.',
  ctaLabel: 'Ver Requisitos de Ingreso',
  ctaHref: '/contacto',
};

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp-sala',
    title: 'Salas de Fuerza y Entrenamiento',
    subtitle: 'Piso 1 · Musculación, peso libre y racks',
    badge: 'Visual referencial',
    description:
      'Espacio diseñado para entrenamiento estructurado de fuerza, hipertrofia y acondicionamiento físico con orden operativo de sala.',
    image: '/images/exp-welcome.webp',
    imageAlt: 'Sala de musculación equipada con racks, bancos y iluminación cálida — visual referencial',
    referenceCaption: 'Imagen conceptual de ambiente VIP; equipamiento oficial verificado en sede Juliaca.',
  },
  {
    id: 'exp-qr',
    title: 'Check-in Digital por Código QR',
    subtitle: 'Recepción · Torniquete de verificación rápida',
    badge: 'Implementado en App',
    description:
      'El socio escanea el desafío temporal emitido por el mostrador mediante la App Android para validar vigencia en milisegundos.',
    image: '/images/exp-qr.webp',
    imageAlt: 'Validación de acceso mediante código QR entre smartphone y tablet de recepción',
    referenceCaption: 'Ilustración de flujo real de verificación QR invertido implementado en App y Portal.',
  },
  {
    id: 'exp-comunidad',
    title: 'Comunidad y Acompañamiento Real',
    subtitle: 'Asistencia técnica y soporte presencial',
    badge: 'Visual referencial',
    description:
      'Recepción activa de lunes a domingo, registro guiado de socios y asesoramiento sobre tus servicios incluidos.',
    image: '/images/exp-community.webp',
    imageAlt: 'Socios conversando en recepción luego de entrenar — visual referencial VIP CENTER FIT',
    referenceCaption: 'Visual referencial de comunidad VIP CENTER FIT.',
  },
];

// Servicios exactamente alineados con la migración V12 del backend (gym_services)
export const GYM_SERVICES: GymServiceItem[] = [
  {
    id: 'srv-musculacion',
    name: 'Musculación y Peso Libre',
    shortTitle: 'MUSCULACIÓN',
    location: 'Piso 1 · Sala Principal',
    schedule: 'L–D (horario regular)',
    modality: 'Libre / Asistencia técnica',
    description: 'Zona principal equipada para entrenamiento de fuerza con pesas libres, barras, poleas y máquinas guiadas.',
    detailNote:
      'Servicio base incluido en todos los planes vigentes y Pase Diario. Ingreso permitido hasta 45 minutos antes del cierre de sede.',
    image: '/images/exp-welcome.webp',
    imageAlt: 'Área de musculación y peso libre — visual referencial',
  },
  {
    id: 'srv-cardio',
    name: 'Zona Cardiovascular',
    shortTitle: 'ZONA CARDIO',
    location: 'Piso 2 · Sala Cardio',
    schedule: 'L–D (horario regular)',
    modality: 'Libre / Circuito aeróbico',
    description: 'Equipos orientados a resistencia aeróbica, recuperación activa y quema calórica controlada.',
    detailNote:
      'Disponible en horario regular de lunes a domingo y feriados durante el turno habilitado.',
    image: '/images/hero-club.webp',
    imageAlt: 'Entrenamiento y zona de acondicionamiento físico — visual referencial',
  },
  {
    id: 'srv-grupales',
    name: 'Clases Grupales VIP',
    shortTitle: 'CLASES GRUPALES VIP',
    location: 'Piso 2 · Sala Multiusos',
    schedule: 'L–V 07:00–09:00 / 18:00–21:00',
    modality: 'Grupal · Sujeto a cupo',
    description: 'Sesiones dirigidas orientadas a movilidad, resistencia funcional y trabajo en grupo.',
    detailNote:
      'Sujeto a cupo y programación diaria confirmada en recepción. No se publican grillas cerradas sin confirmación operativa.',
    image: '/images/exp-community.webp',
    imageAlt: 'Entrenamiento grupal y comunidad en gimnasio — visual referencial',
  },
  {
    id: 'srv-nutricion',
    name: 'Asesoría Nutricional Básica',
    shortTitle: 'NUTRICIÓN VIP',
    location: 'Consultorio VIP',
    schedule: 'Mar y Jue 16:00–20:00',
    modality: 'Cita / Orientación básica',
    description: 'Orientación alimentaria inicial alineada a objetivos de composición corporal y hábitos saludables.',
    detailNote:
      'Atención presencial los martes y jueves de 16:00 a 20:00. Consulta disponibilidad de turno al llegar a recepción.',
    image: '/images/hero-athlete.webp',
    imageAlt: 'Enfoque físico y asesoría nutricional — recurso gráfico oficial',
  },
  {
    id: 'srv-sauna',
    name: 'Sauna Seco de Bienestar',
    shortTitle: 'SAUNA SECO',
    location: 'Área de Bienestar',
    schedule: 'Vie–Dom 14:00–20:00',
    modality: 'Recuperación post-entreno',
    description: 'Espacio de relajación térmica para recuperación muscular al cierre de tu semana de entrenamiento.',
    detailNote:
      'Operativo de viernes a domingo (14:00–20:00), respetando el horario de cierre dominical de la sede.',
    image: '/images/exp-qr.webp',
    imageAlt: 'Recepción de bienestar y acceso de socios — visual referencial',
  },
  {
    id: 'srv-lockers',
    name: 'Lockers y Vestuarios',
    shortTitle: 'LOCKERS Y DUCHAS',
    location: 'Planta Baja · Vestuarios',
    schedule: 'L–D (horario regular)',
    modality: 'Uso por sesión',
    description: 'Casilleros y vestuarios organizados para resguardar tus pertenencias mientras entrenas.',
    detailNote:
      'Disponibles durante tu permanencia diaria en el centro. Recomendamos llevar candado personal.',
    image: '/images/exp-supplements.webp',
    imageAlt: 'Zona interior equipada de mostrador y vestuario — visual referencial',
  },
];

export const SUPPLEMENTS_HIGHLIGHT = {
  overline: 'STAND EN SEDE + CATÁLOGO EN APP',
  title: 'Stand de Suplementos y Pedido desde App',
  description:
    'Explora proteínas, creatina, aminoácidos y accesorios desde la App Móvil, arma tu carrito con reserva temporal real de stock (30 min), reporta tu pago en caja y retira mediante ticket QR opaco (rtk_...).',
  image: '/images/exp-supplements.webp',
  imageAlt: 'Stand y mostrador de suplementos deportivos VIP CENTER FIT — visual referencial',
};

export const TECH_HIGHLIGHT = {
  overline: 'TRANSPARENCIA DIGITAL Y SEGURIDAD',
  title: 'Acceso Biométrico, QR Dinámico y Ley LPDP',
  description:
    'Olvídate de carnets extraviados o cobros sorpresa: tu teléfono valida la entrada cada 60 segundos con protección biométrica local y respaldo explícito de tus derechos ARCO bajo la Ley N° 29733.',
  image: '/images/exp-qr.webp',
  imageAlt: 'Control de acceso digital por código QR en recepción VIP CENTER FIT',
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-planes-1',
    category: 'Planes y Pagos',
    defaultOpen: true,
    question: '¿Dónde veo los precios exactos y cómo contrato un plan?',
    answer:
      'Las tarifas exactas vigentes en Soles (PEN) y la contratación se gestionan directamente en el mostrador oficial de VIP CENTER FIT en Juliaca. Esto garantiza que recibas tu comprobante físico/digital y la fecha exacta de vigencia sin cargos automáticos escondidos.',
  },
  {
    id: 'faq-planes-2',
    category: 'Planes y Pagos',
    question: '¿Qué medios de pago aceptan y hay débito automático?',
    answer:
      'Aceptamos Efectivo, POS (tarjeta), Yape, Plin, transferencia bancaria y órdenes digitales CulqiLink generadas únicamente por recepción. Ningún plan realiza cobros recurrentes automáticos a tu tarjeta.',
  },
  {
    id: 'faq-planes-3',
    category: 'Planes y Pagos',
    question: '¿Los menores de edad pueden entrenar en VIP CENTER FIT?',
    answer:
      'La inscripción autónoma requiere mayoría de edad (18 años) con DNI/CE vigente. Para menores de edad, el registro exige validación y firma presencial del apoderado legal conforme a la Ley N° 29733.',
  },
  {
    id: 'faq-qr-1',
    category: 'Acceso QR',
    question: '¿Cómo funciona el ingreso con código QR en recepción?',
    answer:
      'Al activar tu cuenta de socio en recepción, la App VIP CENTER FIT muestra tu carnet digital y permite escanear el desafío QR dinámico (con rotación temporal) del torniquete/tablet de recepción para autorizar tu paso al instante.',
  },
  {
    id: 'faq-app-1',
    category: 'App Móvil',
    question: '¿La App está en Google Play Store o cómo la descargo?',
    answer:
      'Actualmente la App oficial para Android (desde Android 7.0 Nougat, API 24) se distribuye de forma directa mediante paquete APK universal firmado criptográficamente (v1.1.3) desde /descargar con verificación SHA-256 pública. No se encuentra en Play Store ni App Store.',
  },
  {
    id: 'faq-app-2',
    category: 'App Móvil',
    question: '¿Qué pasa si entro al gimnasio sin internet en mi celular?',
    answer:
      'La App almacena de forma segura en caché local (SQLite) el resumen de tu membresía y catálogo consultado recientemente para mostrar tu carnet en modo offline.',
  },
  {
    id: 'faq-arco-1',
    category: 'Privacidad ARCO',
    question: '¿Cómo solicito la eliminación o rectificación de mis datos personales?',
    answer:
      'Puedes ejercer tus derechos ARCO (Ley N° 29733) de manera directa en /eliminar-cuenta para generar un expediente de seguimiento, o escribiendo a soporte@gymvip.pe.',
  },
];
