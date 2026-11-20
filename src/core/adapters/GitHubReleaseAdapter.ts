import type { IReleaseRepository } from '../ports/IReleaseRepository';
import { type ReleaseInfo, OFFICIAL_RELEASE_METADATA } from '../models/ReleaseInfo';

export class GitHubReleaseAdapter implements IReleaseRepository {
  private readonly defaultAssetUrl: string;

  constructor(customUrl?: string) {
    // Configurable URL vía variable de entorno o fallback estándar de GitHub Releases
    this.defaultAssetUrl = customUrl ||
      (typeof process !== 'undefined' && process.env?.PUBLIC_APK_DOWNLOAD_URL) ||
      'https://github.com/gymvip-upeu/gymvip-mobile/releases/download/v1.1.1/GYM_VIP_Mobile_Render_v1.1.1_Release.apk';
  }

  async getLatestRelease(): Promise<ReleaseInfo> {
    let isAvailable = false;
    let verifiedUrl = this.defaultAssetUrl;
    let statusMessage = '';

    try {
      // Verificar si el enlace configurado responde con un archivo real mediante HEAD request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(verifiedUrl, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'GymVip-PublicPortal/1.1'
        }
      });
      clearTimeout(timeoutId);

      if (response.ok || response.status === 302 || response.status === 301) {
        // En GitHub Releases, las descargas devuelven 302 hacia objects.githubusercontent.com
        isAvailable = true;
        statusMessage = 'Versión verificada y lista para descargar.';
      } else {
        isAvailable = false;
        statusMessage = 'El artefacto firmado para producción v1.1.1 está compilado localmente en entregables/android/ y listo para ser publicado en GitHub Releases.';
      }
    } catch {
      // Si la verificación falla o está en entorno de build offline
      isAvailable = false;
      statusMessage = 'El artefacto firmado para producción v1.1.1 está compilado localmente en entregables/android/ y listo para ser publicado en GitHub Releases.';
    }

    return {
      ...OFFICIAL_RELEASE_METADATA,
      downloadUrl: verifiedUrl,
      isAvailable,
      availabilityStatus: isAvailable ? 'AVAILABLE' : 'COMING_SOON',
      statusMessage
    };
  }
}
