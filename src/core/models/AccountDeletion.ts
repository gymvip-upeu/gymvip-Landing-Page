export interface AccountDeletionInput {
  documentNumber: string;
  fullName: string;
  email: string;
  phone?: string;
  reason?: string;
  consent: boolean;
}

export interface AccountDeletionResult {
  success: boolean;
  trackingCode?: string;
  errorMessage?: string;
  registeredAt?: string;
}

export class AccountDeletionValidator {
  static validate(input: AccountDeletionInput): { valid: boolean; error?: string } {
    if (!input.documentNumber || input.documentNumber.trim().length < 8) {
      return { valid: false, error: 'Ingrese un número de documento válido (DNI de al menos 8 dígitos).' };
    }

    if (!input.fullName || input.fullName.trim().length < 3) {
      return { valid: false, error: 'Ingrese sus nombres y apellidos completos.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email || !emailRegex.test(input.email.trim())) {
      return { valid: false, error: 'Ingrese un correo electrónico válido.' };
    }

    if (!input.consent) {
      return { valid: false, error: 'Debe otorgar el consentimiento y confirmación de supresión de datos conforme a ley.' };
    }

    return { valid: true };
  }

  static generateTrackingCode(year: number = new Date().getFullYear()): string {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `GYM-DEL-${year}-${randomDigits}`;
  }
}
