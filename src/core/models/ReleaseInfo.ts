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
  version: '1.1.1',
  releaseTag: 'v1.1.1',
  releaseDate: '20 de Noviembre de 2026',
  minAndroid: 'Android 8.0 (Oreo, API 26) o superior',
  apkName: 'gymvip-mobile-v1.1.1-release.apk',
  apkSizeBytes: 39873034,
  apkSizeFormatted: '38.0 MB',
  sha256: 'C3DDE6423BEAFF89160188AA7A5A7B79638B6BD28171F70FA797AFD65EFD64E5',
  signatureScheme: 'APK Signature Scheme v1 & v2 (Firma Oficial CN=GYM VIP Mobile)',
  backendUrl: 'https://gymvip-backend.onrender.com',
  instructions: [
    'Descarga el archivo APK oficial en tu dispositivo Android.',
    'Si tu navegador muestra la advertencia de seguridad de Android sobre "fuentes desconocidas", selecciona "Configuración" y activa "Permitir desde esta fuente".',
    'Abre el archivo descargado y presiona "Instalar". (Si tenías una versión debug previa de prueba, desinstálala primero debido al cambio al certificado oficial de producción).',
    'Abre GYM VIP e inicia sesión con las credenciales entregadas en recepción del gimnasio.'
  ]
};
