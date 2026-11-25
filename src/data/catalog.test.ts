import test from 'node:test';
import assert from 'node:assert';
import {
  FAQ_ITEMS,
  GYM_PLANS,
  GYM_SERVICES,
  SCHEDULES,
  SITE_BRAND,
} from './catalog';

test('Catálogo Comercial VIP CENTER FIT (Integridad y Veracidad)', async (t) => {
  await t.test('no contiene precios ni promociones numéricas inventadas en Soles', () => {
    const serialized = JSON.stringify(GYM_PLANS);
    assert.strictEqual(/S\/\s*\d+/i.test(serialized), false, 'No deben existir precios ficticios en S/');
    assert.strictEqual(/\d+%\s*(off|descuento)/i.test(serialized), false, 'No deben existir porcentajes ficticios');
  });

  await t.test('contiene los 3 planes comerciales y un único plan destacado', () => {
    assert.strictEqual(GYM_PLANS.length, 3);
    const featured = GYM_PLANS.filter((p) => p.featured);
    assert.strictEqual(featured.length, 1);
    assert.strictEqual(featured[0].id, 'trimestral');
  });

  await t.test('incluye los 6 servicios confirmados en migración V12 del backend', () => {
    assert.strictEqual(GYM_SERVICES.length, 6);
    for (const srv of GYM_SERVICES) {
      assert.ok(srv.location.length > 3);
      assert.ok(srv.schedule.length > 3);
      assert.ok(srv.image.startsWith('/images/'));
    }
  });

  await t.test('horarios e información de sede coinciden con configuración oficial', () => {
    assert.strictEqual(SCHEDULES.length, 4);
    assert.strictEqual(SITE_BRAND.supportEmail, 'soporte@gymvip.pe');
    assert.ok(FAQ_ITEMS.length >= 6);
  });
});
