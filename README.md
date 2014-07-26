[![Build Status](https://travis-ci.org/gmalette/ansi_stream.svg?branch=master)](https://travis-ci.org/gmalette/ansi_stream)

# AnsiStream

This gem can be used with Rails applications to colorize ANSI strings.

![Screenshot](https://raw.githubusercontent.com/gmalette/ansi_stream/master/screenshots/screenshot.png)

## Installation

Add this line to your application's Gemfile:

    gem 'ansi_stream'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install ansi_stream

## Usage

```html
<code>
  # content
</code>

<script>
  var stream = new AnsiStream()

  onStreamText: (text) ->
    $('code').append(stream.process(text))
</script>
```

## Contributing

1. Fork it ( https://github.com/[my-github-username]/ansi_stream/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
