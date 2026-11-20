import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SubmitAccountDeletionUseCase } from './SubmitAccountDeletionUseCase.js';
import { LocalAccountDeletionAdapter } from '../adapters/LocalAccountDeletionAdapter.js';

describe('SubmitAccountDeletionUseCase', () => {
  it('successfully processes valid ARCO request and returns tracking code', async () => {
    const adapter = new LocalAccountDeletionAdapter();
    const useCase = new SubmitAccountDeletionUseCase(adapter);

    const result = await useCase.execute({
      documentNumber: '72345678',
      fullName: 'Carlos Rojas',
      email: 'carlos.rojas@gmail.com',
      consent: true
    });

    assert.strictEqual(result.success, true);
    assert.match(result.trackingCode || '', /^GYM-DEL-\d{4}-\d{6}$/);
  });

  it('fails when consent is missing', async () => {
    const adapter = new LocalAccountDeletionAdapter();
    const useCase = new SubmitAccountDeletionUseCase(adapter);

    const result = await useCase.execute({
      documentNumber: '72345678',
      fullName: 'Carlos Rojas',
      email: 'carlos.rojas@gmail.com',
      consent: false
    });

    assert.strictEqual(result.success, false);
    assert.match(result.errorMessage || '', /consentimiento/i);
  });
});
