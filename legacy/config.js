// ==============================================================================
// GYM VIP — Configuración Unificada de Entorno para Portal Público
// Permite desacoplar enlaces de producción respecto de entornos locales.
// ==============================================================================

const GymVipConfig = {
  environments: {
    development: {
      portalUrl: 'http://localhost:5173/login',
      apiUrl: 'http://localhost:8081/api/v1'
    },
    production: {
      // En producción el portal administrativo se hospeda en dominio HTTPS seguro
      portalUrl: window.GYMVIP_PORTAL_URL || '/portal/login',
      apiUrl: window.GYMVIP_API_URL || '/api/v1'
    }
  },

  isLocal: function() {
    const host = window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.startsWith('10.');
  },

  getPortalUrl: function() {
    return this.isLocal() ? this.environments.development.portalUrl : this.environments.production.portalUrl;
  },

  initLinks: function() {
    document.querySelectorAll('[data-portal-link]').forEach(el => {
      el.href = this.getPortalUrl();
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  GymVipConfig.initLinks();
});
