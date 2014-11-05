var fixedQueue = require('fixedqueue').FixedQueue;

exports.create = function(count) {

  var queue = fixedQueue(count);
  for (var i = 0; i < count; ++i) queue.push(0);

  return {
    add: function(value) {
      queue.enqueue(value);
    },
    get: function() {
      return queue.map(function(value, index) {
        return [index + 1, value];
      });
    },
    max: function() {
      return queue.reduce(function(acc, val) {
        return (val > acc) ? val : acc;
      }, 0);
    }
  };

};
