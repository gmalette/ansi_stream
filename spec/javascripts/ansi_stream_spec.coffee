describe "AnsiStream", ->
  stream = null
  beforeEach ->
    stream = new AnsiStream()

  expectClass = (span, color) ->
    expect(span).toMatch(new RegExp("class='[^']*#{color}.*'"))

  expectNoClass = (span) ->
    expect(span).toMatch(/class=''/)

  it 'returns uncolorized spans if there are no escape codes', ->
    expect(stream.process("toto")[0]).toMatch(/class=''/)

  it 'returns colorized spans if there is an foreground color code', ->
    expectClass(stream.process('\u001B[31mtoto')[0], 'ansi-foreground-red')

  it 'returns colorized spans if there is an background color code', ->
    expectClass(stream.process("\u001B[41mtoto")[0], 'ansi-background-red')

  it 'keeps modifying the style', ->
    stream.process("\u001B[41mtoto")[0]
    span = stream.process('\u001B[31mtoto')[0]
    expectClass(span, 'ansi-background-red')
    expectClass(span, 'ansi-foreground-red')

  it 'resets the style when encountering a marker', ->
    spans = stream.process("\u001B[41;31mtoto\u001B[0mtiti")
    expectClass(spans[0], 'ansi-background-red')
    expectNoClass(spans[1])

  it 'makes the text bright', ->
    expectClass(stream.process("\u001B[1mtoto")[0], 'ansi-bright')
