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
  version: '1.1.3',
  releaseTag: 'v1.1.3',
  releaseDate: '23 de Noviembre de 2026',
  minAndroid: 'Android 7.0 (Nougat, API 24) o superior',
  apkName: 'gymvip-mobile-release-v1.1.3.apk',
  apkSizeBytes: 33862737,
  apkSizeFormatted: '32.3 MB',
  sha256: '151764BA7F162C97FDD518518EAAD47A72E7BCF74C18406937874C285103356D',
  signatureScheme: 'APK Signature Scheme v2 & v3 (Firma Oficial CN=GYM VIP Mobile)',
  backendUrl: 'https://gymvip-backend.onrender.com',
  instructions: [
    'Descarga el archivo APK oficial en tu dispositivo Android.',
    'Si tu navegador muestra la advertencia de seguridad de Android sobre "fuentes desconocidas", selecciona "Configuración" y activa "Permitir desde esta fuente".',
    'Abre el archivo descargado y presiona "Instalar". (Si tenías una versión debug previa de prueba, desinstálala primero debido al cambio al certificado oficial de producción).',
    'Abre GYM VIP e inicia sesión con las credenciales entregadas en recepción del gimnasio.'
  ]
};
