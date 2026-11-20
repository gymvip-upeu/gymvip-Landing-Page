import type { ReleaseInfo } from '../models/ReleaseInfo';

export interface IReleaseRepository {
  getLatestRelease(): Promise<ReleaseInfo>;
}
