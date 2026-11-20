import type { AccountDeletionInput, AccountDeletionResult } from '../models/AccountDeletion';

export interface IAccountDeletionRepository {
  recordRequest(input: AccountDeletionInput): Promise<AccountDeletionResult>;
}
