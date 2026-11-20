import type { IReleaseRepository } from '../ports/IReleaseRepository';
import type { ReleaseInfo } from '../models/ReleaseInfo';

export class GetAndroidReleaseUseCase {
  constructor(private readonly releaseRepository: IReleaseRepository) {}

  async execute(): Promise<ReleaseInfo> {
    return await this.releaseRepository.getLatestRelease();
  }
}
