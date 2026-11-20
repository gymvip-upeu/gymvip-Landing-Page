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
  releaseDate: '19 de Noviembre de 2026',
  minAndroid: 'Android 7.0 (Nougat, API 24) o superior',
  apkName: 'GYM_VIP_Mobile_Render_v1.1.1_Release.apk',
  apkSizeBytes: 13969920,
  apkSizeFormatted: '13.3 MB',
  sha256: '0B7462D30653E40E5AF1D06211F2DCBF068050FC69556FD8865D82FCB4435CDF',
  signatureScheme: 'APK Signature Scheme v2 (Verificado)',
  backendUrl: 'https://gymvip-backend.onrender.com',
  instructions: [
    'Descarga el archivo APK oficial en tu dispositivo Android.',
    'Si tu navegador muestra la advertencia de seguridad de Android sobre "fuentes desconocidas", selecciona "Configuración" y activa "Permitir desde esta fuente".',
    'Abre el archivo descargado y presiona "Instalar".',
    'Abre GYM VIP e inicia sesión con las credenciales entregadas en recepción del gimnasio.'
  ]
};
