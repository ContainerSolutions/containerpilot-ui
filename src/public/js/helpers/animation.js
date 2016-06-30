'use strict';
define(['jQuery', 'd3'], function ($, d3) {

    /*var ANIMATION = (function () {
        'use strict';*/

        var Motion = function () {
            var CONSTANTS = {
                DURATION: {
                    MOVE: 20,
                    GATHER: 500,
                    AWAY: 300
                }
            };
            //var deltas = [];
/*
            this.move = function (x0, x1, y0, y1) {
                var dx = x1 - x0;
                var dy = y1 - y0;
                var delta;

                delta = {
                    dx: dx,
                    dy: dy
                };

                deltas.push(delta);

                return this;
            };*/

            this.run = function ($el, x0, x1, y0, y1) {
                var timerFunction = null;
                var obj = $el;
                var dx = Math.abs(+ x0 - x1);
                var dy = Math.abs(+ y0 - y1);
                var tan = dx/dy;
                var xStep = 0.5;
                var yStep = 0.5/tan;

                if(parseFloat(x1) < parseFloat(x0)){
                    xStep = - 1*xStep;
                }

                if(parseFloat(y1) < parseFloat(y0)){
                    yStep = - 1*yStep;
                }

                function startAnimation() {
                    if(timerFunction == null) {
                        timerFunction = setInterval(animate, 0.2);
                    }
                }

                function stopAnimation() {
                    if(timerFunction != null){
                        clearInterval(timerFunction);
                        timerFunction = null;
                    }
                }

                function animate() {
                    var x = $el.attr('cx');
                    var y = $el.attr('cy');
                    var newX = xStep + parseFloat(x);
                    var newY = yStep + parseFloat(y);

                    if (xStep > 0 && newX > parseFloat(x1)) {
                        stopAnimation();
                    } else if (yStep > 0 && newY > parseFloat(y1)) {
                        stopAnimation();
                    } else if (xStep < 0 && yStep < 0 && parseFloat(x1) > newX) {
                        stopAnimation();
                    }

                    $el.attr('cx', newX);
                    $el.attr('cy', newY);
                }

                startAnimation();
                
                return this;
            };


        };

        return {
            Motion: Motion
        };
    /*})();*/

    /*return ANIMATION;*/

});
