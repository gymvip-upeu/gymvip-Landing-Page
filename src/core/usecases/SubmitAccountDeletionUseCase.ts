import type { IAccountDeletionRepository } from '../ports/IAccountDeletionRepository';
import type { AccountDeletionInput, AccountDeletionResult } from '../models/AccountDeletion';

export class SubmitAccountDeletionUseCase {
  constructor(private readonly repository: IAccountDeletionRepository) {}

  async execute(input: AccountDeletionInput): Promise<AccountDeletionResult> {
    return await this.repository.recordRequest(input);
  }
}
