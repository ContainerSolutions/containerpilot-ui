'use strict';
define(['jQuery', 'd3'], function ($, d3) {
        var COUNTER = (function () {
            'use strict';

            function generateOneGroupPoints(itemsCount, staticX, staticY, itemMaxSize, firstDots) {
                var dts = firstDots;
                var pointsVector = [{
                    x: staticX,
                    y: staticY
                }];
                var lineVector = [];
                var groupObj;
                var t = 0;
                var addT;
                var xLine;
                var yLine;
                var aLine;
                var dt;
                var k;
                var m;
                var a;
                var x;
                var y;

                for (m = 0; m < itemsCount - 1; m++) {
                    a = itemMaxSize / 3;

                    if (dts[m]) {
                        dt = dts[m];
                    } else {
                        dt = Math.random() * (Math.PI / 2 - Math.PI / 6) + Math.PI / 6;
                    }

                    t += dt;
                    x = a * t * Math.cos(t);
                    y = a * t * Math.sin(t);

                    pointsVector.push({
                        x    : x + staticX,
                        y    : y + staticY
                    });

                }

                addT = t;

                for (k = 0; k < 2 * Math.PI;) {

                    aLine = itemMaxSize / 2;
                    k += Math.PI / 6;
                    addT += k / 2;

                    if ((addT - t) > (2 * Math.PI)) {
                        break;
                    }

                    //console.log(k * 360 / (2 * Math.PI));
                    //console.log((addT - t) * 360 / (2 * Math.PI));
                    xLine = aLine * addT * Math.cos(addT);
                    yLine = aLine * addT * Math.sin(addT);

                    lineVector.push({
                        x: xLine + staticX,
                        y: yLine + staticY
                    });
                }

                groupObj = {
                    objVector : pointsVector,
                    lineVector: lineVector
                };

                //countArea(lineVector);

                return groupObj;
            }

            function drawGrid(svg, w, h, xStep, yStep) {

                var xGrid = d3.range(w / xStep + 1).map(function (i) {
                    return {
                        'x1': i * xStep,
                        'y1': 0,
                        'x2': i * xStep,
                        'y2': h
                    };
                });

                var yGrid = d3.range(h / yStep + 1).map(function (i) {
                    return {
                        'x1': 0,
                        'y1': i * yStep,
                        'x2': w,
                        'y2': i * yStep
                    };
                });

                var grids = svg.append('g')
                    .attr('id', 'x-grid')
                    .selectAll('line')
                    .data(xGrid)
                    .enter()
                    .append('line')
                    .attr({
                        'x1': function (d, i) {
                            return d.x1;
                        },
                        'y1': function (d) {
                            return d.y1;
                        },
                        'x2': function (d, i) {
                            return d.x2;
                        },
                        'y2': function (d) {
                            return d.y2;
                        }
                    })
                    .style({'stroke': '#000', 'stroke-width': '1px'});

                var gridsY = svg.append('g')
                    .attr('id', 'y-grid')
                    .selectAll('line')
                    .data(yGrid)
                    .enter()
                    .append('line')
                    .attr({
                        'x1': function (d, i) {
                            return d.x1;
                        },
                        'y1': function (d, i) {
                            return d.y1;
                        },
                        'x2': function (d, i) {
                            return d.x2;
                        },
                        'y2': function (d, i) {
                            return d.y2;
                        }
                    })
                    .style({'stroke': '#000', 'stroke-width': '1px'});
            }

            //considers the area of a polygon by coordinates
            function countArea(data) {
                var area = 0;
                var i;

                for (i = 0; i < data.length - 1; i++) {
                    area += Math.abs((data[i].x * data[i + 1].y - data[i + 1].x * data[i].y) / 2);
                }

                //console.log('line '+ area);
                //console.log(Math.sqrt(area));
            }
            
            function countRectAreaCoords (groups, h, w, x0, y0){
                var imagineRects = [];
                x0 = x0 || 0;
                y0 = y0 || 0;
                
                for (var e = groups; e--;) {

                    if (!groups % 2 || !(groups === 1)) {
                        groups += 1;
                    }

                    var a = h * w;
                    var oneRectS = a / groups;
                    var l = Math.sqrt(oneRectS);
                    var count = Math.ceil(w / l);
                    var dx = 0;

                    for (var f = count; f--;) {
                        var dy = 0;

                        for (var d = count; d--;) {

                            imagineRects.push({
                                x1: x0 + dx,
                                y1: y0 + dy,
                                x2: x0 + dx + l,
                                y2: y0 + dy,
                                x3: x0 + dx + l,
                                y3: y0 + dy + l,
                                x4: x0 + dx,
                                y4: y0 + dy + l,
                                middleX: x0 + dx + l/2,
                                middleY: y0 + dy + l/2,
                                w: x0 + dx + l,
                                h: y0 + dy + l
                            });

                            dy += l;
                        }

                        dx += l;
                    }
                }
                
                //console.log(imagineRects);
                return imagineRects;
            }

            function countSubGroupRectAreaCoords (quantity, maxSize){
                var area = (4 + quantity) * (4 + quantity) * maxSize * maxSize / Math.PI;

                var area1 = 4 * (4 + quantity) * (4 + quantity) * maxSize * maxSize / (Math.PI * Math.PI);

                console.log(area, area1);
                //return {area: area, area1: ;
            }

            return {
                countSubGroupRectAreaCoords: countSubGroupRectAreaCoords,
                countRectAreaCoords: countRectAreaCoords,
                generateOneGroupPoints: generateOneGroupPoints,
                drawGrid              : drawGrid,
                countSquare           : countArea
            };
        })();

        return COUNTER;
    }
);
