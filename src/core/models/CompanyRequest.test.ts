import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCompanyRequest } from './CompanyRequest.ts';

test('validateCompanyRequest exige RUC de 11 dígitos y consentimiento legal explícito', () => {
  const errors = validateCompanyRequest({
    businessName: 'Gym Demo',
    ruc: '12345',
    city: 'Lima',
    district: 'Surco',
    contactName: 'Luis',
    contactEmail: 'luis@gymdemo.pe',
    contactPhone: '987654321',
    requestedPlanCode: 'PRO',
    legalAccepted: false,
  });
  assert.ok(errors.some((e) => e.includes('11 dígitos')));
  assert.ok(errors.some((e) => e.includes('Política de Privacidad')));
});

test('validateCompanyRequest aprueba solicitud empresarial B2B completa', () => {
  const errors = validateCompanyRequest({
    businessName: 'Fit Club Perú SAC',
    ruc: '20601234567',
    city: 'Juliaca',
    district: 'San Román',
    contactName: 'María Torres',
    contactEmail: 'gerencia@fitclub.pe',
    contactPhone: '+51 951 222 333',
    branchesCount: 2,
    estimatedMembers: 240,
    requestedPlanCode: 'PRO',
    legalAccepted: true,
    legalVersion: 'v2.0-2026',
  });
  assert.deepEqual(errors, []);
});
