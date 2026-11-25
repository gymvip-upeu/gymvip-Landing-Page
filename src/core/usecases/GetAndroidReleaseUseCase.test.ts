import { describe, it } from 'node:test';
import assert from 'node:assert';
import { GetAndroidReleaseUseCase } from './GetAndroidReleaseUseCase.js';
import type { IReleaseRepository } from '../ports/IReleaseRepository.js';
import type { ReleaseInfo } from '../models/ReleaseInfo.js';
import { OFFICIAL_RELEASE_METADATA } from '../models/ReleaseInfo.js';

describe('GetAndroidReleaseUseCase', () => {
  it('returns release metadata with SHA-256 and apk size', async () => {
    const mockRepo: IReleaseRepository = {
      async getLatestRelease(): Promise<ReleaseInfo> {
        return {
          ...OFFICIAL_RELEASE_METADATA,
          downloadUrl: 'https://example.com/release.apk',
          isAvailable: true,
          availabilityStatus: 'AVAILABLE',
          statusMessage: 'Listo para descargar'
        };
      }
    };

    const useCase = new GetAndroidReleaseUseCase(mockRepo);
    const release = await useCase.execute();

    assert.strictEqual(release.version, '1.1.4');
    assert.strictEqual(release.sha256, 'D9E030C0CFC3C5E142B0C0CCB3D95CD266F08007EF45C7A4DA920204EEF67D61');
    assert.strictEqual(release.apkName, 'gymvip-mobile-v1.1.4-release.apk');
    assert.strictEqual(release.isAvailable, true);
  });
});
