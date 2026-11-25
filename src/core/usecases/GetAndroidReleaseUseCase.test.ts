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
    assert.strictEqual(release.sha256, 'CC1B24CD04E50EEF1A9E7FFDE7E417543E6D1EEC2BEE2E090D2B3731DA003F74');
    assert.strictEqual(release.apkName, 'gymvip-mobile-v1.1.4-release.apk');
    assert.strictEqual(release.isAvailable, true);
  });
});
