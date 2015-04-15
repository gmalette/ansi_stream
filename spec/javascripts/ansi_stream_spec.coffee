describe "AnsiStream", ->
  stream = null
  beforeEach ->
    stream = new AnsiStream()

  expectClass = (span, color) ->
    expect(span.className.indexOf(color)).toBeGreaterThan(-1)

  it 'returns uncolorized spans if there are no escape codes', ->
    span = stream.process("mkdir").childNodes[0]
    expectClass(span, 'ansi-background-default')
    expectClass(span, 'ansi-foreground-default')
    expect(span.innerHTML).toBe('mkdir')


  it 'is not subject to XSS', ->
    span = stream.process("echo <script>alert('pwned!')").childNodes[0]
    expect(span.innerHTML).toBe("echo &lt;script&gt;alert('pwned!')")

  it 'returns colorized spans if there is an foreground color code', ->
    expectClass(stream.process('\u001B[31mtoto').childNodes[0], 'ansi-foreground-red')

  it 'returns colorized spans if there is an background color code', ->
    expectClass(stream.process("\u001B[41mtoto").childNodes[0], 'ansi-background-red')

  it 'keeps modifying the style', ->
    stream.process("\u001B[41mtoto")
    span = stream.process('\u001B[31mtoto').childNodes[0]
    expectClass(span, 'ansi-background-red')
    expectClass(span, 'ansi-foreground-red')

  it 'resets the style when encountering a marker', ->
    spans = stream.process("\u001B[41;31mtoto\u001B[0mtiti")
    expectClass(spans.childNodes[0], 'ansi-background-red')
    expectClass(spans.childNodes[1], 'ansi-background-default')

  it 'makes the text bright', ->
    expectClass(stream.process("\u001B[1mtoto").childNodes[0], 'ansi-bright')

  it 'handles underline', ->
    spans = stream.process("\u001B[4mtoto\u001B[24mtiti")
    expectClass(spans.childNodes[0], 'ansi-underline')
    expect(spans.childNodes[1].className.indexOf('ansi-underline')).toBe(-1)

  it 'can strip ANSI codes from a string', ->
    expect(AnsiStream.strip('\u001B[31mtoto')).toBe('toto')
