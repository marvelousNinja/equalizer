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
      var span = $('<span class="column"/>').appendTo(this);
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

    runEqualizer(this, timeout);
    return this;
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

  var runEqualizer = function(element, timeout) {
    element.find('.column').each(function (i) {
      var colHeight = Math.round(element.height() * Math.random());
      $(this).height(colHeight);
    });

    element.find('.column').animate(
      {height: element.height()/2},
      timeout,
      'linear',
      function () {
        //runEqualizer(element, timeout);
      }
    );
  }
}( jQuery ));