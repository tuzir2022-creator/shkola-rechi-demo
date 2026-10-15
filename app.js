(function () {
  var root = document.documentElement;
  var range = document.getElementById('vol');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setVol(v) { root.style.setProperty('--vol', String(v)); }

  // одно «включение голоса» при загрузке: от шёпота к полной громкости
  if (!reduce) {
    var t0 = null, dur = 1400;
    setVol(0.05); range.value = 5;
    requestAnimationFrame(function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      var v = 0.05 + 0.95 * e;
      setVol(v); range.value = Math.round(v * 100);
      if (p < 1) requestAnimationFrame(step);
    });
  }

  range.addEventListener('input', function () { setVol(range.value / 100); });

  // демо-форма: данные никуда не уходят
  var form = document.getElementById('form');
  var status = document.getElementById('status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.trim();
    if (!name || !phone) { status.textContent = 'Заполните имя и телефон.'; return; }
    status.textContent = 'Спасибо, ' + name + '! В демо заявка не отправляется.';
    form.reset();
  });
})();
