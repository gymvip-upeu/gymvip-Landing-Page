import { describe, it } from 'node:test';
import assert from 'node:assert';
import { AccountDeletionValidator } from './AccountDeletion.js';

describe('AccountDeletionValidator', () => {
  it('validates a complete and correct ARCO request input', () => {
    const input = {
      documentNumber: '70123456',
      fullName: 'Juan Pérez Mendoza',
      email: 'juan.perez@example.com',
      consent: true
    };
    const result = AccountDeletionValidator.validate(input);
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.error, undefined);
  });

  it('rejects short or empty document numbers', () => {
    const input = {
      documentNumber: '123',
      fullName: 'Juan Pérez',
      email: 'juan@example.com',
      consent: true
    };
    const result = AccountDeletionValidator.validate(input);
    assert.strictEqual(result.valid, false);
    assert.match(result.error || '', /documento/i);
  });

  it('rejects invalid email formats', () => {
    const input = {
      documentNumber: '70123456',
      fullName: 'Juan Pérez',
      email: 'correo-no-valido',
      consent: true
    };
    const result = AccountDeletionValidator.validate(input);
    assert.strictEqual(result.valid, false);
    assert.match(result.error || '', /correo/i);
  });

  it('rejects requests without consent checkbox', () => {
    const input = {
      documentNumber: '70123456',
      fullName: 'Juan Pérez',
      email: 'juan@example.com',
      consent: false
    };
    const result = AccountDeletionValidator.validate(input);
    assert.strictEqual(result.valid, false);
    assert.match(result.error || '', /consentimiento|supresión/i);
  });

  it('generates a valid tracking code with format GYM-DEL-YYYY-XXXXXX', () => {
    const code = AccountDeletionValidator.generateTrackingCode(2026);
    assert.match(code, /^GYM-DEL-2026-\d{6}$/);
  });
});
