module.exports = {
  // the helper method 'format_time' will take in a timestamp and return a string with only the time
  format_time: (date) => {
    // 'toLocaleTimeString()' formats the time as H:MM:SS AM/PM
    return Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  },

  post_time: (date) => {
    return Intl.DateTimeFormat('en-GB', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      minute: 'numeric',
      hour: 'numeric',
    }).format(new Date(date));
  },

  //function to filter comments for user only on the feed
  ifEquals: function (a, b, options) {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', a, b);
    if (a === b) {
      console.log('matched ');
      return options.fn(this);
    }

    console.log(options.fn(this));

    return options.inverse(this);
  },

  limit: function (context, block) {
    var ret = '',
      offset = parseInt(block.hash.offset) || 0,
      limit = parseInt(block.hash.limit) || 5,
      i = offset < context.length ? offset : 0,
      j = limit + offset < context.length ? limit + offset : context.length;

    for (i, j; i < j; i++) {
      ret += block(context[i]);
    }

    return ret;
  },

  limitEach: function (ary, max, options) {
    if (!ary || ary.length == 0) return options.inverse(this);

    var result = [];
    for (var i = 0; i < max && i < ary.length; ++i)
      result.push(options.fn(ary[i]));
    return result.join('');
  },

  urlCompiler: function (str, query) {
    return (recompiled =
      str.split(/upload/)[0] + `upload/${query}` + str.split(/upload/)[1]);
  },
};
