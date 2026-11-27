import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import type { IReleaseRepository } from '../ports/IReleaseRepository';
import { type ReleaseInfo, OFFICIAL_RELEASE_METADATA } from '../models/ReleaseInfo';

async function matchesOfficialAsset(chunks: AsyncIterable<Uint8Array>): Promise<boolean> {
  const hash = createHash('sha256');
  let bytes = 0;
  for await (const chunk of chunks) {
    bytes += chunk.byteLength;
    if (bytes > OFFICIAL_RELEASE_METADATA.apkSizeBytes) return false;
    hash.update(chunk);
  }
  return bytes === OFFICIAL_RELEASE_METADATA.apkSizeBytes &&
    hash.digest('hex') === OFFICIAL_RELEASE_METADATA.sha256.toLowerCase();
}

async function* readResponse(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

export class GitHubReleaseAdapter implements IReleaseRepository {
  private readonly downloadUrl: string;
  private readonly localUrl = '/downloads/' + OFFICIAL_RELEASE_METADATA.apkName;

  constructor(customUrl?: string, private readonly publicDirectory = join(process.cwd(), 'public')) {
    this.downloadUrl = customUrl || process.env.PUBLIC_APK_DOWNLOAD_URL || this.localUrl;
  }

  async getLatestRelease(): Promise<ReleaseInfo> {
    let available = false;
    try {
      if (this.downloadUrl === this.localUrl) {
        available = await matchesOfficialAsset(createReadStream(join(this.publicDirectory, this.localUrl.slice(1))));
      } else if (new URL(this.downloadUrl).protocol === 'https:') {
        const response = await fetch(this.downloadUrl, { signal: AbortSignal.timeout(15000) });
        if (response.ok && response.body && new URL(response.url).protocol === 'https:') {
          available = await matchesOfficialAsset(readResponse(response.body));
        }
      }
    } catch {
      // A missing or unreachable artifact is an unavailable release.
    }
    return {
      ...OFFICIAL_RELEASE_METADATA,
      downloadUrl: available ? this.downloadUrl : '',
      isAvailable: available,
      availabilityStatus: available ? 'AVAILABLE' : 'COMING_SOON',
      statusMessage: available
        ? 'El archivo publicado coincide con el tamaño y SHA-256 del paquete oficial.'
        : 'La descarga se habilitará cuando el archivo oficial esté disponible y se compruebe su integridad.'
    };
  }
}
