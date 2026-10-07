/* Shared scaling and formatting rules for Tom's Recipes.
   Used by the build script (Node) and by the recipe pages (browser). */
(function (root) {
  var FRACS = [[0, ''], [0.25, '¼'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [0.75, '¾']];

  function fracText(n, allowed) {
    // allowed: list of fractional parts permitted, e.g. [0, .25, .5, .75]
    var whole = Math.floor(n + 1e-9);
    var part = n - whole;
    var best = null;
    FRACS.forEach(function (f) {
      if (allowed.indexOf(f[0]) === -1 && !(allowed.indexOf('thirds') !== -1 && (f[0] === 1 / 3 || f[0] === 2 / 3))) return;
      var d = Math.abs(part - f[0]);
      if (!best || d < best.d) best = { d: d, f: f };
    });
    var d1 = Math.abs(part - 1);
    if (d1 < best.d) { whole += 1; best = { f: [0, ''] }; }
    if (whole === 0 && best.f[1]) return best.f[1];
    return String(whole) + best.f[1];
  }

  function roundMetric(v) {
    if (v <= 0) return 0;
    var step = v < 10 ? 1 : v <= 50 ? 5 : v <= 250 ? 10 : v <= 1000 ? 25 : 50;
    var r = Math.round(v / step) * step;
    return r === 0 ? step : r;
  }

  function metricText(v, unit) {
    // unit: 'g' or 'ml'
    if (v >= 1000) {
      var big = unit === 'g' ? 'kg' : ' litres';
      var n = +(v / 1000).toFixed(2);
      if (unit === 'ml' && n === 1) big = ' litre';
      return String(n) + big;
    }
    return String(v) + unit;
  }

  function roundHalf(v) { var r = Math.round(v * 2) / 2; return r < 0.5 ? 0.5 : r; }
  function roundWhole(v) { var r = Math.round(v); return r < 1 ? 1 : r; }
  function roundUp(v) { var r = Math.ceil(v - 0.05); return r < 1 ? 1 : r; }

  function plural(item, n) {
    return n > 1 && item.plural ? item.plural : item.name;
  }

  function withPrep(text, item) {
    return item.prep ? text + ', ' + item.prep : text;
  }

  // Returns { amount, name, prep, about, exact, shown } for an ingredient at a given factor.
  function scaleItem(item, factor) {
    var s = item.scale;
    if (s === 'fixed' || item.phrase) factor = 1;
    // At the recipe's own servings, show every amount exactly as written.
    if (Math.abs(factor - 1) < 1e-9) s = 'fixed';
    var exact = item.qty != null ? item.qty * factor : null;
    var shown = exact;
    var amount = '';
    var name = item.name;

    if (item.phrase) {
      return { amount: '', name: item.phrase, prep: item.prep || '', about: false, exact: null, shown: null, phrase: true };
    }

    if (item.unit === 'g' || item.unit === 'ml') {
      shown = s === 'fixed' ? exact : roundMetric(exact);
      if (s !== 'fixed' && item.unit === 'ml' && shown > 250 && shown < 1000) shown = Math.round(exact / 25) * 25;
      amount = metricText(shown, item.unit);
    } else if (item.unit === 'tsp' || item.unit === 'tbsp') {
      var tsp = exact * (item.unit === 'tbsp' ? 3 : 1);
      if (s === 'fixed') {
        amount = fracText(exact, [0, 0.25, 0.5, 0.75]) + ' ' + item.unit;
        shown = exact;
      } else if (tsp < 2.875) {
        var t = Math.round(tsp * 4) / 4; if (t < 0.25) t = 0.25;
        amount = fracText(t, [0, 0.25, 0.5, 0.75]) + ' tsp';
        shown = item.unit === 'tbsp' ? t / 3 : t;
      } else {
        var tb = Math.round((tsp / 3) * 2) / 2;
        if (tb > 6 && item.liquid) {
          var ml = roundMetric(tb * 15);
          amount = metricText(ml, 'ml');
          shown = item.unit === 'tbsp' ? ml / 15 : ml / 5;
        } else {
          amount = fracText(tb, [0, 0.5]) + ' tbsp';
          shown = item.unit === 'tbsp' ? tb : tb * 3;
        }
      }
    } else if (item.unit === 'tin') {
      var n = exact;
      var size = item.tinSize + (item.tinUnit || 'g');
      var word = item.container || 'tin';
      if (s === 'fixed' || (Math.abs(n - Math.round(n)) <= 0.1 && Math.round(n) >= 1)) {
        var w = Math.round(n);
        shown = w;
        amount = w + ' x ' + size + ' ' + word + (w > 1 ? 's' : '');
      } else {
        var grams = roundMetric(n * item.tinSize);
        shown = grams / item.tinSize;
        var tinsLabel = fracText(n, [0, 0.25, 0.5, 0.75, 'thirds']);
        var many = n > 1.01;
        return {
          amount: metricText(grams, item.tinUnit || 'g'),
          name: name,
          prep: '',
          tinNote: '(' + (Math.abs(parseFloatFrac(tinsLabel) - n) / n > 0.08 ? 'about ' : '') + tinsLabel + ' x ' + size + ' ' + word + (many ? 's' : '') + (item.prep ? ', ' + item.prep : '') + ')',
          about: false,
          exact: exact,
          shown: shown
        };
      }
    } else {
      // counted items
      if (s === 'fixed') shown = exact;
      else if (s === 'halve') shown = roundHalf(exact);
      else if (s === 'wholeUp') shown = roundUp(exact);
      else shown = roundWhole(exact);
      amount = fracText(shown, [0, 0.5]);
      name = plural(item, shown);
      if (item.size) name = item.size + ' ' + name;
    }

    // "about" marks measured amounts that rounding moved by more than 15%. Counted things are never marked.
    var measured = item.unit === 'g' || item.unit === 'ml' || item.unit === 'tsp' || item.unit === 'tbsp';
    var about = measured && exact && shown ? Math.abs(shown - exact) / exact > 0.15 : false;
    return { amount: amount, name: name, prep: item.prep || '', about: about, exact: exact, shown: shown };
  }

  function parseFloatFrac(t) {
    var map = { '¼': 0.25, '⅓': 1 / 3, '½': 0.5, '⅔': 2 / 3, '¾': 0.75 };
    var m = /^(\d*)([¼⅓½⅔¾]?)$/.exec(t);
    if (!m) return +t;
    return (m[1] ? +m[1] : 0) + (m[2] ? map[m[2]] : 0);
  }

  function lineText(item, factor) {
    var r = scaleItem(item, factor);
    if (r.phrase) return { text: r.name + (r.prep ? ', ' + r.prep : ''), about: false, amount: '', rest: r.name + (r.prep ? ', ' + r.prep : '') };
    var rest = r.name + (r.prep ? ', ' + r.prep : '') + (r.tinNote ? ' ' + r.tinNote : '');
    var amt = (r.about ? 'about ' : '') + r.amount;
    var joiner = /^[\d¼⅓½⅔¾.]+$/.test(r.amount) ? ' ' : (/(g|ml|kg|litres?|tsp|tbsp)$/.test(r.amount) && /^\d/.test(r.amount) && !/ /.test(r.amount) ? ' ' : ' ');
    return { text: amt + joiner + rest, about: r.about, amount: amt, rest: rest };
  }

  // Short text for the ingredient cards on a method step.
  function chipText(item, factor) {
    var r = scaleItem(item, factor);
    if (r.phrase) return item.chip || item.phrase;
    var label = item.chip || r.name;
    if (item.unit === 'tin' && r.tinNote) return (r.about ? 'about ' : '') + r.amount + ' ' + label;
    var amt = (r.about ? 'about ' : '') + r.amount;
    if (item.unit === 'tin' || item.unit === 'g' || item.unit === 'ml' || item.unit === 'tsp' || item.unit === 'tbsp') return amt + ' ' + label;
    // Counted things use the full name, which changes to the plural with the amount.
    // A chip containing {} wraps it, such as 'zest of {}' giving 'zest of 2 limes'.
    var counted = amt + ' ' + r.name;
    return item.chip && item.chip.indexOf('{}') >= 0 ? item.chip.replace('{}', counted) : counted;
  }

  var MULTS = [0.5, 1, 1.5, 2, 3];
  function multText(m) { return m === 0.5 ? 'half' : m === 1 ? 'one' : m === 1.5 ? '1½ times' : m + ' times'; }
  function multLabel(m) { return (m === 0.5 ? '½' : m === 1.5 ? '1½' : String(m)) + '×'; }
  var api = { MULTS: MULTS, multText: multText, multLabel: multLabel, scaleItem: scaleItem, lineText: lineText, chipText: chipText, fracText: fracText, roundMetric: roundMetric, SERVINGS: [1, 2, 3, 4, 6, 8] };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Scale = api;
})(this);
