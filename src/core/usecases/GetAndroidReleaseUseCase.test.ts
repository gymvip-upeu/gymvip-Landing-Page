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
    assert.strictEqual(release.sha256, '0B7462D30653E40E5AF1D06211F2DCBF068050FC69556FD8865D82FCB4435CDF');
    assert.strictEqual(release.apkName, 'GYM_VIP_Mobile_Render_v1.1.1_Release.apk');
    assert.strictEqual(release.isAvailable, true);
  });
});
