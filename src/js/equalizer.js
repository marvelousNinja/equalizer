(function($) {
  $.fn.equalize = function(timeout, columnWidth) {
    validateArguments(timeout, columnWidth);

    this.css({
      verticalAlign: 'bottom',
      lineHeight: this.height() + 'px'
    });

    // Кол-во столбиков
    var colQuantity = Math.ceil(this.width()/columnWidth);
    var cols = new Array(colQuantity);
    for (var i = 0; i < cols.length; i++) {
      var span = $('<span/>').appendTo(this);
      span.css({
        verticalAlign: 'bottom',
        display: 'inline-block',

        fontSize: 0,
        lineHeight: 0,

        width: columnWidth,
        background: 'pink',
        borderTop: '2px solid red'
      });
    }

    run_equalizer(this.selector, timeout);
  }

  var validateArguments = function(timeout, columnWidth) {
    $.each(arguments, function() {
      if(!isPositiveInteger(this.valueOf())) {
        throw new Error('Argument error: Equalize expects two positive integers');
      }
    });
  }

  var isPositiveInteger = function(num) {
    return $.isNumeric(num) && (Math.floor(num) === num) && num > 0
  }

  function run_equalizer (selector, timeout) {
    $(selector + ' span').each(function (i) {
      var colHeight = Math.round($(selector).height() * Math.random());
      $(this).height(colHeight);
    });

    $(selector + ' span').animate(
      {height: $(selector).height()/2},
      timeout,
      'linear',
      function () {
        //run_equalizer(selector, timeout);
      }
    );
  }
}( jQuery ));