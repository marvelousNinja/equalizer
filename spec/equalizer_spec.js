describe('Equalizer plugin', function() {
  describe('.equalize', function() {
    var element;
    var width;
    var timeout;
    var columnWidth;
    var equalizeCall;

    beforeEach(function() {
      element = $("<div></div>")
      width = 100;
      element.width(width);
      timeout = 1000;
      columnWidth = 2;
      equalizeCall = function() {
        return element.equalize(timeout, columnWidth);
      }
    });

    it('should be defined', function() {
      expect(element.equalize).toBeDefined();
    });

    describe('concerning argument handling', function() {
      it('should fail without arguments', function() {
        expect(function() { element.equalize() }).toThrow();
      });

      it('should fail with negative numbers', function() {
        expect(function() { element.equalize(-1000, -100) }).toThrow();
      });

      it('should fail with strings', function() {
        expect(function() { element.equalize('1', '2') }).toThrow()
      });

      it('should not fail with two positive integer arguments', function() {
        expect(function() { element.equalize(timeout, columnWidth) }).not.toThrow();
      });
    });

    describe('concerning return value', function() {
      it('should return target element', function() {
        expect(equalizeCall()).toBe(element);
      });
    });

    describe('concerning contents of target element', function() {
      var columns;
      var columnsSelector;

      beforeEach(function() {
        columnSelector = '.column';
        columns = equalizeCall().find(columnSelector);
      });

      it('should fill element with columns', function() {
        expect(columns.length).toBeGreaterThan(0);
      });

      it('should fill element with the correct number of columns', function() {
        var columnsCount = Math.ceil(width / columnWidth);
        expect(columns.length).toBe(columnsCount);
      });

      it('should set width of every column correctly', function() {
        var widthsOfColumns = columns.map(function(i, elem) { return $(elem).width() });
        expect($.unique(widthsOfColumns).toArray()).toEqual([columnWidth]);
      });
    });
  });
});