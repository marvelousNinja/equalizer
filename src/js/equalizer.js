(function($) {
  $.fn.equalize = function(duration, columnWidth) {
    var args = setDefaultArguments(duration, columnWidth);
    validateArguments(args);

    prepareContainer(this, args);
    runEqualizer(this, args);

    return this;
  }

  var setDefaultArguments = function(duration, columnWidth) {
    return $.extend({
      duration: 1000,
      columnWidth: 1,
      columnClass: 'equalize-column',
      containerClass: 'equalize-container'
    }, {
      duration: duration,
      columnWidth: columnWidth
    });
  }

  var validateArguments = function(args) {
    if(!isPositiveInteger(args.duration) || !isPositiveInteger(args.columnWidth)) {
      throw new Error('Argument error: Equalize expects two positive integers');
    }
  }

  var isPositiveInteger = function(num) {
    return $.isNumeric(num) && (Math.floor(num) === num) && num > 0
  }

  var prepareContainer = function(container, args) {
    clearContents(container);
    appendColumns(container, args);
    container.css({ lineHeight: container.height() + 'px' });
    container.addClass(args.containerClass);
  }

  var clearContents = function(container) {
    container.empty();
  }

  var appendColumns = function(container, args) {
    var columnsQuantity = Math.ceil(container.width() / args.columnWidth);
    var sampleColumn = $('<span/>').addClass(args.columnClass).css({ width: args.columnWidth})[0].outerHTML;
    container.append(repeatString(sampleColumn, columnsQuantity));
    container.columns = container.find('.' + args.columnClass);
  }

  var repeatString = function(string, times) {
    var result = '';
    for (;;) {
      if (times & 1) result += string;
      times >>= 1;
      if (times) string += string;
      else break;
    }
    return result;
  }

  var runEqualizer = function(container, args) {
    var top = container.height();
    var middle = top / 2;

    var animateDown = function() {
      container.columns.map(function(column) {
        return animateTo(this, middle, args);
      });
      animateUp();
    }

    var animateUp = function() {
      $.when.apply($, container.columns.map(function() {
        return animateTo(this, top * Math.random(), args);
      })).done(animateDown);
    }

    animateUp();
  }

  var animateTo = function(target, height, args) {
    return $(target).velocity({ height: height }, {
      duration: args.duration,
      easing: 'linear'
    });
  }
}( jQuery ));