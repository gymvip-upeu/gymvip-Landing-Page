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

    assert.strictEqual(release.version, '1.1.1');
    assert.strictEqual(release.sha256, 'C3DDE6423BEAFF89160188AA7A5A7B79638B6BD28171F70FA797AFD65EFD64E5');
    assert.strictEqual(release.apkName, 'gymvip-mobile-v1.1.1-release.apk');
    assert.strictEqual(release.isAvailable, true);
  });
});
