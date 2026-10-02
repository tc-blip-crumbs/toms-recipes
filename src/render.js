/* Builds the ingredient list and method as HTML strings.
   The build script uses it to pre-render every page, and the page uses it again when the servings change. */
(function (root) {
  var Scale = (typeof module !== 'undefined' && module.exports) ? require('./scale.js') : root.Scale;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* "size" is a number of servings for most recipes. For batch recipes it is
     { mult: batch multiplier, serve: servings for the "to serve" groups }. */
  function factorFor(recipe, size, group) {
    if (recipe.yield) return 1;
    if (recipe.batch) return group && group.serve ? size.serve / (group.serves || recipe.serves) : size.mult;
    return size / recipe.serves;
  }

  function groupOf(recipe, id) {
    for (var g = 0; g < recipe.groups.length; g++)
      for (var i = 0; i < recipe.groups[g].items.length; i++)
        if (recipe.groups[g].items[i].id === id) return recipe.groups[g];
    return null;
  }

  function serveControl(n) {
    return '<div class="serve-ctl" role="group" aria-label="Servings for this part"><span>For</span>' +
      '<div class="stepper small"><button type="button" data-serve="down" aria-label="Fewer servings">−</button><output>' + n + '</output><button type="button" data-serve="up" aria-label="More servings">+</button></div>' +
      '<span>' + (n === 1 ? 'serving' : 'servings') + '</span></div>';
  }

  function findItem(recipe, id) {
    for (var g = 0; g < recipe.groups.length; g++)
      for (var i = 0; i < recipe.groups[g].items.length; i++)
        if (recipe.groups[g].items[i].id === id) return recipe.groups[g].items[i];
    return null;
  }

  function ingredientsHTML(recipe, size) {
    var out = '';
    recipe.groups.forEach(function (g, gi) {
      var f = factorFor(recipe, size, g);
      out += '<div class="ing-group' + (recipe.batch && g.serve ? ' serve-group' : '') + '">';
      if (g.name) out += '<h3>' + esc(g.name) + '</h3>';
      if (recipe.batch && g.serve) out += serveControl(size.serve);
      if (g.fixedNote && !recipe.yield) out += '<p class="group-note">' + esc(g.fixedNote) + '</p>';
      out += '<ul class="ing-list">';
      g.items.forEach(function (item) {
        var l = Scale.lineText(item, f);
        var id = 'ing-' + item.id;
        var body = l.amount
          ? '<span class="amt' + (l.about ? ' is-about' : '') + '">' + esc(l.amount) + '</span> ' + esc(l.rest)
          : esc(l.rest);
        out += '<li><input type="checkbox" id="' + id + '" class="tick"><label for="' + id + '"><span class="box" aria-hidden="true"></span><span class="ing-text">' + body + '</span></label></li>';
      });
      out += '</ul></div>';
    });
    return out;
  }

  var TIME_RE = /(\d+(?:½)?)((?: to \d+(?:½)?)?) (minutes?|hours?)(?! before)/g;

  function num(s) { return parseFloat(s.replace('½', '.5')) || 0; }

  function stepTextHTML(text) {
    var safe = esc(text);
    return safe.replace(TIME_RE, function (m, a, range, unit) {
      var mins = num(a) * (/hour/.test(unit) ? 60 : 1);
      return '<button type="button" class="timer-link" data-minutes="' + mins + '" aria-label="' + m + '. Start a ' + mins + '-minute timer">' + m + '</button>';
    });
  }

  function chipsHTML(recipe, step, size) {
    var uses = step.uses || [];
    if (!uses.length) return '';
    var out = '<ul class="chips" aria-label="Ingredients for this step">';
    uses.forEach(function (u) {
      var id = typeof u === 'string' ? u : u.id;
      var part = typeof u === 'string' ? 1 : u.part;
      var item = findItem(recipe, id);
      if (!item) return;
      var f = factorFor(recipe, size, groupOf(recipe, id));
      out += '<li class="chip">' + esc(Scale.chipText(item, f * part)) + '</li>';
    });
    return out + '</ul>';
  }

  function methodHTML(recipe, size) {
    var out = '<ol class="steps">';
    recipe.steps.forEach(function (s, n) {
      out += '<li class="step" id="step-' + (n + 1) + '"><span class="step-num" aria-hidden="true">' + (n + 1) + '</span><div class="step-body"><p>' + stepTextHTML(s.text) + '</p>' + chipsHTML(recipe, s, size) + '</div></li>';
    });
    return out + '</ol>';
  }

  function panNote(recipe, servings) {
    if (recipe.batch) return servings.mult >= 2 ? 'At ' + Scale.multLabel(servings.mult) + ' the batch, use your biggest pan or split it between two, and allow extra time for browning and reducing.' : '';
    if (recipe.yield || servings < recipe.serves * 2) return '';
    return 'This recipe is written for ' + recipe.serves + '. At ' + servings + ' servings, use a bigger pan, cook in more batches, and allow extra time for browning and reducing.';
  }

  var api = { esc: esc, ingredientsHTML: ingredientsHTML, methodHTML: methodHTML, chipsHTML: chipsHTML, stepTextHTML: stepTextHTML, panNote: panNote, factorFor: factorFor };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Render = api;
})(this);
