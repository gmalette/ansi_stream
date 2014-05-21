var AnsiSpan, AnsiStream, AnsiStyle;

AnsiStream = (function() {
  function AnsiStream() {
    this.style = new AnsiStyle();
    this.span = new AnsiSpan();
  }

  AnsiStream.prototype.process = function(text) {
    var part, partText, parts, spans, styles;
    parts = text.split(/\033\[/);
    parts = parts.filter(function(part) {
      return part;
    });
    spans = (function() {
      var _i, _len, _ref, _results;
      _results = [];
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        _ref = this._extractTextAndStyles(part), partText = _ref[0], styles = _ref[1];
        this.style.apply(styles);
        _results.push(this.span.create(partText, this.style));
      }
      return _results;
    }).call(this);
    return spans;
  };

  AnsiStream.prototype._extractTextAndStyles = function(originalText) {
    var matches, numbers, text, _ref;
    matches = originalText.match(/([\d;]*)m([^]*)/m);
    if (!matches) {
      return [originalText, null];
    }
    _ref = matches, matches = _ref[0], numbers = _ref[1], text = _ref[2];
    return [text, numbers.split(";")];
  };

  return AnsiStream;

})();

AnsiStyle = (function() {
  var COLORS;

  COLORS = {
    0: 'black',
    1: 'red',
    2: 'green',
    3: 'yellow',
    4: 'blue',
    5: 'magenta',
    6: 'cyan',
    7: 'white',
    8: null,
    9: 'default'
  };

  function AnsiStyle() {
    this.reset();
  }

  AnsiStyle.prototype.apply = function(newStyles) {
    var style, _i, _len, _results;
    if (!newStyles) {
      return;
    }
    _results = [];
    for (_i = 0, _len = newStyles.length; _i < _len; _i++) {
      style = newStyles[_i];
      style = parseInt(style);
      if (style === 0) {
        _results.push(this.reset());
      } else if (style === 1) {
        _results.push(this.bright = true);
      } else if ((30 <= style && style < 39) && style !== 38) {
        _results.push(this._applyStyle('foreground', style));
      } else if ((40 <= style && style < 49) && style !== 48) {
        _results.push(this._applyStyle('background', style));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  AnsiStyle.prototype.reset = function() {
    return this.background = this.foreground = this.bright = null;
  };

  AnsiStyle.prototype.toClass = function() {
    var classes;
    classes = [];
    if (this.background) {
      classes.push("ansi-background-" + this.background);
    }
    if (this.foreground) {
      classes.push("ansi-foreground-" + this.foreground);
    }
    if (this.bright) {
      classes.push("ansi-bright");
    }
    return classes.join(" ");
  };

  AnsiStyle.prototype._applyStyle = function(layer, number) {
    return this[layer] = COLORS[number % 10];
  };

  return AnsiStyle;

})();

AnsiSpan = (function() {
  var ENTITIES, ESCAPE_PATTERN;

  function AnsiSpan() {}

  ENTITIES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
  };

  ESCAPE_PATTERN = new RegExp("[" + (Object.keys(ENTITIES).join('')) + "]", 'g');

  AnsiSpan.prototype.create = function(text, style) {
    return "<span class='" + (style.toClass()) + "'>" + (this._escapeHTML(text)) + "</span>";
  };

  AnsiSpan.prototype._escapeHTML = function(text) {
    return text.replace(ESCAPE_PATTERN, function(char) {
      return ENTITIES[char];
    });
  };

  return AnsiSpan;

})();
