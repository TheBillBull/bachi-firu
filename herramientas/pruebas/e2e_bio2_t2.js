// Prueba pulsando de verdad: ficha «de un vistazo» del tema 2 de Biología (plegar, móvil oscuro) y los cuatro widgets nuevos.
// Uso: node herramientas/pruebas/e2e_bio2_t2.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't2');
    const d = p.locator('#detail-t2');
    const sinDesb = async () => p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
    // ---- ficha
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': hay una ficha', await vz.count(), 1);
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 5 mini-tablas', await vz.locator('.vz-bl table').count(), 5);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': ficha sin desborde', await sinDesb(), true);
    // ---- bio2_azucar
    const wa = d.locator('[data-w=bio2_azucar]');
    await wa.scrollIntoViewIfNeeded();
    const lec = async (w, t) => (await w.locator('.lec', { hasText: t }).locator('b').innerText());
    chk(cfg.nom + ': azúcar: glucosa abierta 4 C* y 16', [await lec(wa, 'C asimétricos'), await lec(wa, 'Estereoisómeros')], r => r[0] === '4' && r[1] === '16');
    chk(cfg.nom + ': azúcar: Fischer con 6 carbonos', await wa.locator('svg text').filter({ hasText: /^C[1-6]$/ }).count(), 6);
    await wa.locator('.chip-btn', { hasText: 'Anillo α' }).click();
    chk(cfg.nom + ': glucosa anillo: 5 C*, 32, piranosa', [await lec(wa, 'C asimétricos'), await lec(wa, 'Estereoisómeros'), await lec(wa, 'Forma')], r => r[0] === '5' && r[1] === '32' && /piranosa/.test(r[2]));
    chk(cfg.nom + ': anillo α: OH anomérico (azul) abajo', await wa.locator('svg .t-p').first().evaluate(e => +e.getAttribute('y')), y => y > 150);
    await wa.locator('.chip-btn', { hasText: 'Anillo β' }).click();
    chk(cfg.nom + ': anillo β: OH anomérico (azul) arriba', await wa.locator('svg .t-p').first().evaluate(e => +e.getAttribute('y')), y => y < 100);
    await wa.locator('.chip-btn', { hasText: 'D-fructosa' }).click();
    chk(cfg.nom + ': fructosa anillo: 4 C*, 16, furanosa', [await lec(wa, 'C asimétricos'), await lec(wa, 'Estereoisómeros'), await lec(wa, 'Forma')], r => r[0] === '4' && r[1] === '16' && /furanosa/.test(r[2]));
    await wa.locator('.chip-btn', { hasText: 'Cadena abierta' }).click();
    chk(cfg.nom + ': fructosa abierta: 3 C* y 8', [await lec(wa, 'C asimétricos'), await lec(wa, 'Estereoisómeros')], r => r[0] === '3' && r[1] === '8');
    await wa.locator('.chip-btn', { hasText: 'D-galactosa' }).click();
    chk(cfg.nom + ': galactosa: epímero en C4', await wa.locator('.b2t2-nota').innerText(), t => /C4/.test(t));
    await wa.locator('.chip-btn', { hasText: 'D-ribosa' }).click();
    chk(cfg.nom + ': ribosa: aldopentosa, 3 C*', [await lec(wa, 'Tipo'), await lec(wa, 'C asimétricos')], r => /aldopentosa/.test(r[0]) && r[1] === '3');
    await wa.locator('.chip-btn', { hasText: 'desoxirribosa' }).click();
    chk(cfg.nom + ': desoxirribosa: C₅H₁₀O₄ y 2 C*', [await lec(wa, 'Fórmula'), await lec(wa, 'C asimétricos')], r => r[0] === 'C₅H₁₀O₄' && r[1] === '2');
    await wa.locator('.chip-btn', { hasText: 'Anillo β' }).click();
    chk(cfg.nom + ': desoxirribosa anillo furanosa 3 C*', [await lec(wa, 'Forma'), await lec(wa, 'C asimétricos')], r => /furanosa/.test(r[0]) && r[1] === '3');
    chk(cfg.nom + ': azúcar sin desborde', [await wa.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await sinDesb()], r => r[0] && r[1]);
    // ---- bio2_disac
    const wd = d.locator('[data-w=bio2_disac]');
    await wd.scrollIntoViewIfNeeded();
    const unir = wd.locator('[data-unir]'), hidro = wd.locator('[data-hidro]');
    chk(cfg.nom + ': disac: al inicio «Unir» activo y «Hidrolizar» no', [await unir.isEnabled(), await hidro.isEnabled()], r => r[0] && !r[1]);
    const caso = async (a, c) => { await wd.locator('[data-p1] .chip-btn', { hasText: a }).click(); await wd.locator('[data-p2] .chip-btn', { hasText: c }).click(); await unir.click(); return wd.locator('.lec').allInnerTexts(); };
    chk(cfg.nom + ': α-glucosa + glucosa = maltosa reductora', (await caso('α-D-glucosa', 'D-glucosa')).join(' '), t => /Maltosa/.test(t) && /sí/.test(t));
    chk(cfg.nom + ': masa 342', (await wd.locator('.lec').allInnerTexts()).join(' '), t => /342/.test(t));
    chk(cfg.nom + ': β-galactosa + glucosa = lactosa', (await caso('β-D-galactosa', 'D-glucosa')).join(' '), t => /Lactosa/.test(t) && /sí/.test(t));
    chk(cfg.nom + ': α-glucosa + fructosa = sacarosa no reductora', (await caso('α-D-glucosa', 'D-fructosa')).join(' '), t => /Sacarosa/.test(t) && /no \(Fehling/.test(t));
    chk(cfg.nom + ': β-glucosa + glucosa = celobiosa', (await caso('β-D-glucosa', 'D-glucosa')).join(' '), t => /Celobiosa/.test(t));
    await caso('β-D-galactosa', 'D-fructosa');
    chk(cfg.nom + ': pareja rara: aviso', await wd.locator('.b2t2-nota').innerText(), t => /no es uno de los/.test(t));
    await hidro.click();
    chk(cfg.nom + ': hidrolizar vuelve a dos monosacáridos', await wd.locator('.lec').first().innerText(), t => /2 monosacáridos/.test(t));
    chk(cfg.nom + ': disac sin desborde', [await wd.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await sinDesb()], r => r[0] && r[1]);
    // ---- bio2_poli
    const wp = d.locator('[data-w=bio2_poli]');
    await wp.scrollIntoViewIfNeeded();
    const tab = async (t) => { await wp.locator('.chip-btn', { hasText: t }).click(); return wp.locator('.b2t2-tab').innerText(); };
    chk(cfg.nom + ': poli: 4 fichas', await wp.locator('.chip-btn').count(), 4);
    chk(cfg.nom + ': amilosa: hélice, azul', await tab('Amilosa'), t => /hélice/.test(t) && /azul/.test(t));
    chk(cfg.nom + ': amilopectina: α(1→6)', await tab('Amilopectina'), t => /α\(1→6\)/.test(t));
    chk(cfg.nom + ': glucógeno: hígado y pardo', await tab('Glucógeno'), t => /hígado/.test(t) && /pardo/.test(t));
    chk(cfg.nom + ': celulosa: β(1→4) y no digerible', await tab('Celulosa'), t => /β\(1→4\)/.test(t) && /no \(/.test(t));
    chk(cfg.nom + ': celulosa: 60 glucosas dibujadas', await wp.locator('svg circle').count(), 60);
    chk(cfg.nom + ': poli sin desborde', [await wp.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await sinDesb()], r => r[0] && r[1]);
    // ---- bio2_lab
    const wl = d.locator('[data-w=bio2_lab]');
    await wl.scrollIntoViewIfNeeded();
    const prueba = async (mu, re) => {
      await wl.locator('[data-mu] [data-k=' + mu + ']').click(); await wl.locator('[data-re] [data-k=' + re + ']').click();
      chk(cfg.nom + ': ' + mu + '/' + re + ': antes de pulsar, un solo tubo', await wl.locator('.b2t2-tubos figure').count(), 1);
      await wl.locator('[data-prueba]').click();
      return wl.locator('.b2t2-despues').getAttribute('data-res');
    };
    chk(cfg.nom + ': glucosa + Fehling positivo', await prueba('glu', 'fe'), 'pos');
    chk(cfg.nom + ': sacarosa + Fehling negativo', await prueba('sac', 'fe'), 'neg');
    chk(cfg.nom + ': sacarosa hidrolizada + Fehling positivo', await prueba('sach', 'fe'), 'pos');
    chk(cfg.nom + ': almidón + Fehling negativo', await prueba('almi', 'fe'), 'neg');
    chk(cfg.nom + ': almidón + Lugol positivo', await prueba('almi', 'lu'), 'pos');
    chk(cfg.nom + ': celulosa + Lugol negativo', await prueba('cel', 'lu'), 'neg');
    chk(cfg.nom + ': lactosa + Fehling positivo', await prueba('lac', 'fe'), 'pos');
    chk(cfg.nom + ': explicación visible', await wl.locator('.b2t2-nota').innerText(), t => /Positivo/.test(t));
    chk(cfg.nom + ': lab sin desborde', [await wl.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await sinDesb()], r => r[0] && r[1]);
    if (captura) {
      const sufijo = cfg.nom === 'escritorio' ? 'claro' : 'movil-oscuro';
      await wa.locator('.chip-btn', { hasText: 'D-glucosa' }).click(); await wa.locator('.chip-btn', { hasText: 'Anillo α' }).click();
      await wa.screenshot({ path: captura.replace('.png', '-azucar-' + sufijo + '.png') });
      await wd.locator('[data-p1] .chip-btn', { hasText: 'α-D-glucosa' }).click(); await wd.locator('[data-p2] .chip-btn', { hasText: 'D-fructosa' }).click(); await wd.locator('[data-unir]').click();
      await wd.screenshot({ path: captura.replace('.png', '-disac-' + sufijo + '.png') });
      await wp.locator('.chip-btn', { hasText: 'Celulosa' }).click();
      await wp.screenshot({ path: captura.replace('.png', '-poli-' + sufijo + '.png') });
      await wl.locator('[data-mu] [data-k=glu]').click(); await wl.locator('[data-re] [data-k=fe]').click(); await wl.locator('[data-prueba]').click();
      await wl.screenshot({ path: captura.replace('.png', '-lab-' + sufijo + '.png') });
    }
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
