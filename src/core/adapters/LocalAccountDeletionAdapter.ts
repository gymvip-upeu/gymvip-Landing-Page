import type { IAccountDeletionRepository } from '../ports/IAccountDeletionRepository';
import { type AccountDeletionInput, type AccountDeletionResult, AccountDeletionValidator } from '../models/AccountDeletion';

export class LocalAccountDeletionAdapter implements IAccountDeletionRepository {
  async recordRequest(input: AccountDeletionInput): Promise<AccountDeletionResult> {
    const validation = AccountDeletionValidator.validate(input);
    if (!validation.valid) {
      return {
        success: false,
        errorMessage: validation.error || 'Datos de solicitud inválidos.'
      };
    }

    const trackingCode = AccountDeletionValidator.generateTrackingCode();
    const registeredAt = new Date().toISOString();

    // En navegador cliente, registra el código para que el usuario conserve constancia
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const history = JSON.parse(window.localStorage.getItem('gymvip_arco_requests') || '[]');
        history.push({
          trackingCode,
          documentNumber: input.documentNumber.slice(0, 4) + '****',
          email: input.email.replace(/(.{2})(.*)(?=@)/, '$1****'),
          registeredAt,
          status: 'REGISTRADO_PENDIENTE_VALIDACION'
        });
        window.localStorage.setItem('gymvip_arco_requests', JSON.stringify(history));
      } catch {
        // Fallback defensivo si el almacenamiento local está restringido
      }
    }

    return {
      success: true,
      trackingCode,
      registeredAt
    };
  }
}
