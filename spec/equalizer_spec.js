describe('Equalizer plugin', function() {
  describe('.equalize', function() {
    var element;
    var sampleTimeout = 1000;
    var sampleColumnWidth = 2;

    beforeEach(function() {
      element = $("<div></div>")
    });

    it('should be defined', function() {
      expect(element.equalize).toBeDefined();
    });

    describe('based on an argument handling', function() {
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
        expect(function() { element.equalize(sampleTimeout, sampleColumnWidth) }).not.toThrow();
      });
    });
  });
});