describe("AnsiStream", function() {
  var expectClass, stream;
  stream = null;
  beforeEach(function() {
    return stream = new AnsiStream();
  });
  expectClass = function(span, color) {
    return expect(span).toMatch(new RegExp("class='[^']*" + color + ".*'"));
  };
  it('returns uncolorized spans if there are no escape codes', function() {
    return expect(stream.process("toto")[0]).toBe("toto");
  });
  it('returns colorized spans if there is an foreground color code', function() {
    return expectClass(stream.process('\u001B[31mtoto')[0], 'ansi-foreground-red');
  });
  it('returns colorized spans if there is an background color code', function() {
    return expectClass(stream.process("\u001B[41mtoto")[0], 'ansi-background-red');
  });
  it('keeps modifying the style', function() {
    var span;
    stream.process("\u001B[41mtoto")[0];
    span = stream.process('\u001B[31mtoto')[0];
    expectClass(span, 'ansi-background-red');
    return expectClass(span, 'ansi-foreground-red');
  });
  it('resets the style when encountering a marker', function() {
    var spans;
    spans = stream.process("\u001B[41;31mtoto\u001B[0mtiti");
    expectClass(spans[0], 'ansi-background-red');
    return expectClass(spans[1], 'ansi-background-default');
  });
  it('makes the text bright', function() {
    return expectClass(stream.process("\u001B[1mtoto")[0], 'ansi-bright');
  });
  return it('handles underline', function() {
    var spans;
    spans = stream.process("\u001B[4mtoto\u001B[24mtiti");
    expectClass(spans[0], 'ansi-underline');
    return expect(spans[1].indexOf('ansi-underline')).toBe(-1);
  });
});
