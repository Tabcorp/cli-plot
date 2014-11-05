var i = 0;
setInterval(function() {
  var value = Math.abs(Math.sin(i += 0.2));
  process.stdout.write(value + '\n');
}, 100);
