function setEqualizer(selector, timeout, colWidth) {
  if (!colWidth) {
    colWidth = 1;
  }
  $(selector).css({
    verticalAlign: 'bottom',
    lineHeight: $(selector).height() + 'px'
  });

  // Кол-во столбиков
  var colQuantity = Math.ceil($(selector).width()/colWidth);
  var cols = new Array(colQuantity);
  for (var i = 0; i < cols.length; i++) {
    var span = $('<span/>').appendTo(selector);
    span.css({
      verticalAlign: 'bottom',
      display: 'inline-block',

      fontSize: 0,
      lineHeight: 0,

      width: colWidth,
      background: 'pink',
      borderTop: '2px solid red'
    });
  }

  run_equalizer(selector, timeout);
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