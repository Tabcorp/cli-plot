# cli-trend

Display a chart that dynamically trends values from stdout.

```
npm install -g cli-trend
```

## Usage

Say you have the following shell script that outputs numbers on `stdout`

```bash
for i in {1..50}; do
  echo $RANDOM;
  sleep 1;
done
```

You can pipe it into `cli-trend` to generate a chart right there in your console. It will push new values from the right every time they arrive on stdin.

```bash
./random.sh | cli-trend
```

![Screenshot](https://raw.github.com/TabDigital/cli-trend/master/screenshot.gif)

## Arguments

- `cli-trend -n 10`: number of values printed on screen
- `cli-trend -w 120`: graph width (number of terminal columns)

## Advanced usage

- Watching the output of another program

Unfortunately, the `watch` command writes ANSI escape codes regardless of whether or not the output is a TTY. This doesn't play well with printing charts. You'll need to use different way to watch `stdout`, for example [cli-repeat](https://github.com/TabDigital/cli-repeat).

```bash
cli-repeat -n 1 "echo $RANDOM" | stdin-chart
```

- Getting a specific value from a JSON document

The easiest way is to use tools like [json](http://trentm.com/json/) or [jQ](http://stedolan.github.io/jq/).

```bash
some_program | json "path.to.value" | stdin-chart
```
