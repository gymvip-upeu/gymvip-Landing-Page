import test from 'node:test';
import assert from 'node:assert';
import { GetAndroidReleaseUseCase } from './GetAndroidReleaseUseCase';
import type { IReleaseRepository } from '../ports/IReleaseRepository';
import { OFFICIAL_RELEASE_METADATA } from '../models/ReleaseInfo';
import { GitHubReleaseAdapter } from '../adapters/GitHubReleaseAdapter';

test('GetAndroidReleaseUseCase', async (t) => {
  await t.test('returns v1.1.3 release metadata with verified SHA-256 and size', async () => {
    const mockRepo: IReleaseRepository = {
      async getLatestRelease() {
        return {
          ...OFFICIAL_RELEASE_METADATA,
          downloadUrl: '/downloads/gymvip-mobile-release-v1.1.3.apk',
          isAvailable: true,
          availabilityStatus: 'AVAILABLE',
          statusMessage: 'APK verificado.',
        };
      },
    };

    const useCase = new GetAndroidReleaseUseCase(mockRepo);
    const release = await useCase.execute();

    assert.strictEqual(release.version, '1.1.3');
    assert.strictEqual(release.releaseTag, 'v1.1.3');
    assert.strictEqual(release.apkSizeBytes, 33862737);
    assert.strictEqual(
      release.sha256,
      '151764BA7F162C97FDD518518EAAD47A72E7BCF74C18406937874C285103356D',
    );
    assert.strictEqual(release.apkName, 'gymvip-mobile-release-v1.1.3.apk');
    assert.strictEqual(release.isAvailable, true);
  });

  await t.test('GitHubReleaseAdapter resolves valid ReleaseInfo matching availability rules', async () => {
    const adapter = new GitHubReleaseAdapter();
    const release = await adapter.getLatestRelease();

    assert.strictEqual(release.version, '1.1.3');
    assert.ok(release.downloadUrl.length > 0);
    assert.ok(['AVAILABLE', 'COMING_SOON'].includes(release.availabilityStatus));
  });
});
