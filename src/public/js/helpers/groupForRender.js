'use strict';

define([
        'constants'
], function (CONSTANTS) {
        var groupForRender = function (data) {
            var circleCount;
            var rectangleCount;
            var projects;

            return {
                circleCount: circleCount,
                rectangleCount: rectangleCount,
                groupColors: CONSTANTS.GROUP_COLORS
            }
        };

        return groupForRender;
    }
);
