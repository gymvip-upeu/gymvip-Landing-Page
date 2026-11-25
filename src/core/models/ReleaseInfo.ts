export interface ReleaseInfo {
  version: string;
  releaseTag: string;
  releaseDate: string;
  minAndroid: string;
  apkName: string;
  apkSizeBytes: number;
  apkSizeFormatted: string;
  sha256: string;
  signatureScheme: string;
  backendUrl: string;
  downloadUrl: string;
  isAvailable: boolean;
  availabilityStatus: 'AVAILABLE' | 'COMING_SOON';
  statusMessage: string;
  instructions: string[];
}

export const OFFICIAL_RELEASE_METADATA: Omit<ReleaseInfo, 'downloadUrl' | 'isAvailable' | 'availabilityStatus' | 'statusMessage'> = {
  version: '1.1.4',
  releaseTag: 'v1.1.4',
  releaseDate: '25 de Noviembre de 2026',
  minAndroid: 'Android 7.0 (Nougat, API 24) o superior',
  apkName: 'gymvip-mobile-v1.1.4-release.apk',
  apkSizeBytes: 35842414,
  apkSizeFormatted: '34.2 MB',
  sha256: 'CC1B24CD04E50EEF1A9E7FFDE7E417543E6D1EEC2BEE2E090D2B3731DA003F74',
  signatureScheme: 'APK Signature Scheme v2 & v3 (Firma Oficial CN=GYM VIP Mobile)',
  backendUrl: 'https://gymvip-backend.onrender.com',
  instructions: [
    'Descarga el archivo APK oficial en tu dispositivo Android.',
    'Si tu navegador muestra la advertencia de seguridad de Android sobre "fuentes desconocidas", selecciona "Configuración" y activa "Permitir desde esta fuente".',
    'Abre el archivo descargado y presiona "Instalar". (Si tenías una versión debug previa de prueba, desinstálala primero debido al cambio al certificado oficial de producción).',
    'Abre GYM VIP e inicia sesión con las credenciales entregadas en recepción del gimnasio.'
  ]
};
