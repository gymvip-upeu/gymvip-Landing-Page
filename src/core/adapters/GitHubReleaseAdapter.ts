import fs from 'node:fs';
import path from 'node:path';
import type { IReleaseRepository } from '../ports/IReleaseRepository';
import { OFFICIAL_RELEASE_METADATA, type ReleaseInfo } from '../models/ReleaseInfo';

const LOCAL_PUBLIC_APK_PATH = `/downloads/${OFFICIAL_RELEASE_METADATA.apkName}`;
const GITHUB_RELEASES_URL = 'https://github.com/gymvip-upeu/gymvip-mobile/releases';

/**
 * Adaptador de entrega de compilaciones Android oficiales de GYM VIP.
 * Comprueba en tiempo de generación estática (SSG) si el APK firmado se
 * encuentra presente en `public/downloads/` para servir descarga local directa,
 * o en su defecto expone de forma transparente el repositorio oficial de Releases.
 */
export class GitHubReleaseAdapter implements IReleaseRepository {
  async getLatestRelease(): Promise<ReleaseInfo> {
    const apkFileOnDisk = path.resolve(process.cwd(), 'public', 'downloads', OFFICIAL_RELEASE_METADATA.apkName);
    const hasLocalApk = fs.existsSync(apkFileOnDisk);

    if (hasLocalApk) {
      return {
        ...OFFICIAL_RELEASE_METADATA,
        downloadUrl: LOCAL_PUBLIC_APK_PATH,
        isAvailable: true,
        availabilityStatus: 'AVAILABLE',
        statusMessage: `Paquete APK universal v${OFFICIAL_RELEASE_METADATA.version} verificado (SHA-256 oficial) listo para descarga directa.`,
      };
    }

    return {
      ...OFFICIAL_RELEASE_METADATA,
      downloadUrl: GITHUB_RELEASES_URL,
      isAvailable: false,
      availabilityStatus: 'COMING_SOON',
      statusMessage: 'El binario APK no reside en el bundle estático Git; consulta la sección oficial de Releases o recepción en sede.',
    };
  }
}
