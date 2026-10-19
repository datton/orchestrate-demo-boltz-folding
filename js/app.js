// Page behaviour: owned by Full-Stack
(function () {
  // Folding demo: swap a chain of beads between stretched and folded layouts.
  var toggle = document.getElementById('fold-toggle');
  if (toggle) {
    var line = document.getElementById('fold-line');
    var beads = document.getElementById('fold-beads');
    var caption = document.getElementById('fold-caption');
    var n = 14;
    var stretched = [];
    var folded = [];
    for (var i = 0; i < n; i++) {
      stretched.push([20 + i * 21, 70 + (i % 2 ? 12 : -12)]);
      var a = i * 0.8;
      var r = 55 - i * 2.8;
      folded.push([160 + r * Math.cos(a), 70 + r * Math.sin(a) * 0.9]);
    }
    var NS = 'http://www.w3.org/2000/svg';
    var circles = stretched.map(function () {
      var c = document.createElementNS(NS, 'circle');
      c.setAttribute('r', '5');
      beads.appendChild(c);
      return c;
    });
    var draw = function (pts) {
      line.setAttribute('points', pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '));
      pts.forEach(function (p, k) {
        circles[k].setAttribute('cx', p[0].toFixed(1));
        circles[k].setAttribute('cy', p[1].toFixed(1));
      });
    };
    draw(stretched);
    toggle.addEventListener('click', function () {
      var on = toggle.getAttribute('aria-pressed') !== 'true';
      toggle.setAttribute('aria-pressed', String(on));
      toggle.textContent = on ? 'Unfold the chain' : 'Fold the chain';
      caption.textContent = on ? 'The chain is folded into a compact shape.' : 'The chain is stretched out.';
      draw(on ? folded : stretched);
    });
  }

  // Glossary filter.
  var input = document.getElementById('glossary-filter');
  if (input) {
    var terms = document.querySelectorAll('#glossary-list .term');
    var status = document.getElementById('glossary-status');
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      terms.forEach(function (t) {
        var match = t.textContent.toLowerCase().indexOf(q) !== -1;
        t.hidden = !match;
        if (match) shown++;
      });
      status.textContent = q ? shown + ' of ' + terms.length + ' terms shown' : '';
    });
  }
})();
