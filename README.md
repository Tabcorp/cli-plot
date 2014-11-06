# cli-plot

Plot values from `stdin` directly into your terminal.

[![NPM](http://img.shields.io/npm/v/cli-plot.svg?style=flat)](https://npmjs.org/package/cli-plot)
[![License](http://img.shields.io/npm/l/cli-plot.svg?style=flat)](https://github.com/TabDigital/cli-plot)
[![Dependencies](http://img.shields.io/david/TabDigital/cli-plot.svg?style=flat)](https://david-dm.org/TabDigital/cli-plot)

```
npm install -g cli-plot
```

## Usage

Say you have the following shell script that outputs numbers on `stdout`:

```bash
for i in {1..50}; do
  echo $RANDOM;
  sleep 1;
done
```

Or the following `Node` program that outputs a sine wave:

```js
var i = 0;
setInterval(function() {
  var value = Math.sin(i += 0.2);
  process.stdout.write(value + '\n');
}, 100);
```

You can pipe it into `plot` to generate a chart right there in your terminal.
It will push new values from the right every time they arrive on stdin.
Note: input values must be separated by a new line.

```bash
node sine.js | plot
```

![Screenshot](https://raw.github.com/TabDigital/cli-plot/master/screenshot.gif)

## Arguments

- `plot -w 100`: graph width (in terminal rows)
- `plot -h 10`: graph height (in terminal rows)

## Advanced usage

- Printing averages

If the input program outputs numbers very often, the chart will probably move too fast.
You can pipe the output into a tool like [cli-average](https://github.com/TabDigital/cli-average).

```bash
./random.sh | avg -t 1s | plot
```

- Watching the output of another program

One common usage is to run a command at a given rate, and plot its results.

Unfortunately, the `watch` command also outputs debug info and ANSI escape codes,
which doesn't play well with `plot`. You'll need to use different way to watch that command,
for example [cli-interval](https://github.com/TabDigital/cli-interval).

```bash
interval -t 1s "echo $RANDOM" | plot
```

- Getting values from JSON documents

The easiest way is to use tools like [json](http://trentm.com/json/) or [jQ](http://stedolan.github.io/jq/).

```bash
some_program | json "path.to.value" | plot
```
