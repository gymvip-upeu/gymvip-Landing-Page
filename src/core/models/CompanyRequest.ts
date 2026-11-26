export interface CompanyRequestPayload {
  businessName: string;
  commercialName?: string;
  ruc: string;
  city: string;
  district: string;
  address?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  branchesCount: number;
  estimatedMembers: number;
  requestedPlanCode: 'STARTER' | 'PRO' | 'ENTERPRISE';
  message?: string;
  legalAccepted: boolean;
  legalVersion: string;
}

export function validateCompanyRequest(input: Partial<CompanyRequestPayload>): string[] {
  const errors: string[] = [];
  if (!input.businessName || input.businessName.trim().length < 3) {
    errors.push('Ingresa la razón social o nombre del gimnasio (mínimo 3 caracteres).');
  }
  if (!input.ruc || !/^\d{11}$/.test(input.ruc.trim())) {
    errors.push('El RUC peruano debe contener exactamente 11 dígitos numéricos.');
  }
  if (!input.city || input.city.trim().length < 2) {
    errors.push('Indica la ciudad de operación.');
  }
  if (!input.district || input.district.trim().length < 2) {
    errors.push('Indica el distrito principal.');
  }
  if (!input.contactName || input.contactName.trim().length < 3) {
    errors.push('Ingresa el nombre del representante o contacto.');
  }
  if (!input.contactEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.contactEmail.trim())) {
    errors.push('Ingresa un correo corporativo o de contacto válido.');
  }
  if (!input.contactPhone || input.contactPhone.replace(/[^\d]/g, '').length < 9) {
    errors.push('Ingresa un número de teléfono o WhatsApp válido (mínimo 9 dígitos).');
  }
  if (!['STARTER', 'PRO', 'ENTERPRISE'].includes(String(input.requestedPlanCode || '').toUpperCase())) {
    errors.push('Selecciona un plan SaaS válido (STARTER, PRO o ENTERPRISE).');
  }
  if (input.legalAccepted !== true) {
    errors.push('Debes aceptar de forma expresa la Política de Privacidad (Ley 29733 y D.S. 016-2024-JUS).');
  }
  return errors;
}
