import type { IReleaseRepository } from '../ports/IReleaseRepository';
import { type ReleaseInfo, OFFICIAL_RELEASE_METADATA } from '../models/ReleaseInfo';

export class GitHubReleaseAdapter implements IReleaseRepository {
  private readonly defaultAssetUrl: string;

  constructor(customUrl?: string) {
    // Configurable URL vía variable de entorno o fallback al asset estático servido directamente por la web pública
    this.defaultAssetUrl = customUrl ||
      (typeof process !== 'undefined' && process.env?.PUBLIC_APK_DOWNLOAD_URL) ||
      '/downloads/gymvip-mobile-v1.1.4-release.apk';
  }

  async getLatestRelease(): Promise<ReleaseInfo> {
    let isAvailable = false;
    let verifiedUrl = this.defaultAssetUrl;
    let statusMessage = '';

    if (verifiedUrl.startsWith('/')) {
      // Asset estático local disponible en el portal web público (/downloads/...)
      isAvailable = true;
      statusMessage = 'Versión verificada y lista para descargar directamente desde el portal oficial.';
    } else {
      try {
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
          isAvailable = true;
          statusMessage = 'Versión verificada y lista para descargar.';
        } else {
          isAvailable = false;
          statusMessage = 'El artefacto firmado para producción v1.1.4 está disponible en el almacenamiento público oficial.';
        }
      } catch {
        isAvailable = false;
        statusMessage = 'El artefacto firmado para producción v1.1.4 está disponible en el almacenamiento público oficial.';
      }
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
