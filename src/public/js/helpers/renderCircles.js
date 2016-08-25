'use strict';
define(['jQuery', 'd3'], function ($, d3) {
        var COUNTER = (function () {
            'use strict';

            function countRadius(d) {
                var centerDotsDistance = [];
                var maxDist;
                var dist0;
                var dist1;
                var dist2;
                var dist3;
                var i;

                function sortDist(a, b) {
                    if (a > b) {
                        return 1;
                    }
                    if (a < b) {
                        return -1;
                    }
                }

                for (i = d.allDots.length; i--;) {

                    dist0 = Math.sqrt(Math.pow(d.allDots[i].x - d.x, 2) + Math.pow(d.allDots[i].y - d.y, 2));
                    dist1 = Math.sqrt(Math.pow(d.allDots[i].x + 25 - d.x, 2) + Math.pow(d.allDots[i].y - d.y, 2));
                    dist2 = Math.sqrt(Math.pow(d.allDots[i].x - d.x, 2) + Math.pow(d.allDots[i].y + 25 - d.y, 2));
                    dist3 = Math.sqrt(Math.pow(d.allDots[i].x + 25 - d.x, 2) + Math.pow(d.allDots[i].y + 25 - d.y, 2));
                    centerDotsDistance.push(parseInt(dist0));
                    centerDotsDistance.push(parseInt(dist1));
                    centerDotsDistance.push(parseInt(dist2));
                    centerDotsDistance.push(parseInt(dist3));
                }

                maxDist = centerDotsDistance.sort(sortDist)[centerDotsDistance.length - 1];

                return maxDist;
            }
            
            function drawCircles(dataset, height, groupsCount, controlItemsData, colorShema, keys, callback) {
                var mainCirclesDots = [];
                var subDots = [];
                var dotsForRadius;
                var oneCircleDots;
                var $selection;
                var $select;
                var xMin;
                var yMin;
                var xMax;
                var yMax;
                var dx;
                var dy;
                var j;
                var x;
                var y;
                var i;
                var t;

                groupsCount.reverse();

                for (i = groupsCount.length; i--;) {

                    for (j = groupsCount[i]; j--;) {
                        dotsForRadius = [];
                        oneCircleDots = {x: [], y: []};

                        $select = $('.group_' + i + '.subgroup_' + j);

                        $select.each(function () {
                            x = +$(this).attr('x') + 23;
                            y = +$(this).attr('y') + 23;

                            dotsForRadius.push({
                                x: x,
                                y: y
                            });
                            oneCircleDots.x.push(x);
                            oneCircleDots.y.push(y);
                            oneCircleDots.x.push(x);
                            oneCircleDots.y.push(y);
                        });

                        oneCircleDots.x.sort();
                        oneCircleDots.y.sort();

                        xMin = oneCircleDots.x.sort()[0] - 83;
                        yMin = oneCircleDots.y.sort()[0] - 83;
                        xMax = oneCircleDots.x.sort()[oneCircleDots.y.length - 1];
                        yMax = oneCircleDots.y.sort()[oneCircleDots.y.length - 1];

                        if(yMax){
                            subDots.push({
                                allDots: dotsForRadius,
                                x      : xMin + (xMax - xMin) / 2,
                                y      : yMin + (yMax - yMin) / 2,
                                type   : 'circle_' + i + ' ' + keys[i],
                                color: colorShema[keys[i]].main
                            });
                        }
                    }
                }

                d3.select('g.group').selectAll('.subCircle')
                    .data(subDots)
                    .enter()
                    .append('circle')
                    .attr({
                        'class'       : function (d) {
                            return d.type;
                        },
                        'cx'          : function (d) {
                            return d.x;
                        },
                        'cy'          : function (d) {
                            return d.y;
                        },
                        'r'           : function (d) {
                            var radius = countRadius(d);

                            if(radius < 100){
                                radius = 100;
                            }

                            return radius;
                        },
                        'stroke'      : function(d){
                            return d.color;
                        },
                        'stroke-width': 2,
                        'fill'        : 'none',
                        'opacity'     : 0
                    });

                for (i = groupsCount.length; i--;) {

                    $selection = $('.circle_' + i);

                    if ($selection.length > 1) {

                        $selection.each(function () {

                            d3.select(this)
                                .transition()
                                .delay(1000)
                                .attr({'opacity': 0})
                                .style({'stroke-dasharray': ('15, 20')});
                        })
                    } else {
                        mainCirclesDots.push({
                            x: parseFloat($selection.attr('cx')),
                            y: parseFloat($selection.attr('cy')),
                            r: parseFloat($selection.attr('r'))
                        });

                        d3.select($selection).remove();
                    }
                }

                $('.line_1').each(function () {

                    x = [$(this).attr('x1'), $(this).attr('x2')].sort();
                    y = [$(this).attr('y1'), $(this).attr('y2')].sort();

                    mainCirclesDots.push({
                        x: +x[0] + (+x[1] - x[0]) / 2,
                        y: +y[0] + (+y[1] - y[0]) / 2,
                        r: Math.sqrt((+x[1] - x[0]) * (+x[1] - x[0]) + (+y[1] - y[0]) * (+y[1] - y[0])) * 1.1
                    })
                });

                for (t = mainCirclesDots.length; t--;) {

                    if(controlItemsData[t]){
                        mainCirclesDots[t].name = controlItemsData[t].name;
                    } else {
                        mainCirclesDots[t].name = '';
                    }
                }

                d3.select('g.group')
                    .selectAll('.mainCircle')
                    .data(mainCirclesDots)
                    .enter()
                    .append('circle')
                    .attr({
                        'cx'          : function (d) {
                            return d.x;
                        },
                        'cy'          : function (d) {
                            return d.y;
                        },
                        'r'           : function (d) {
                            return d.r;
                        },
                        'stroke'      : function(d){
                            if(d.name){
                                return colorShema[d.name].main;
                            }
                        },
                        'class': function(d){
                            return d.name;
                        },
                        'stroke-width': 3,
                        'fill'        : 'none',
                        'opacity'     : 0
                    })
                    .transition()
                    .attr({
                        'opacity'   : 0,
                        'visibility': 'hidden'
                    });

                d3.select('g.group').selectAll('path.label')
                    .data(mainCirclesDots)
                    .enter()
                    .append('path')
                    .attr({
                        'd'    : function (d, i) {
                            return 'M ' + (parseFloat(d.x) - parseFloat(d.r) - 10) + ',' + d.y + ' A ' + parseFloat(d.r) + ',' + parseFloat(d.r) + ' 0 0,1 ' + (parseFloat(d.x) + parseFloat(d.r) + 10) + ',' + d.y;
                        },
                        'id'   : function (d, i) {
                            return 'circle_text_path_' + i;
                        },
                        'class': 'label',
                        'fill'   : 'none',
                        'opacity'   : 0,
                        'visibility': 'hidden'
                    });

                d3.select('g.group')
                    .selectAll('text')
                    .data(mainCirclesDots)
                    .enter()
                    .append('text')
                    .append('textPath')
                    .attr({
                        'xlink:href': function (d, i) {
                            return '#circle_text_path_' + i;
                        },
                        'class'     : function (d) {
                            return d.name + ' mainCircleLabel';
                        },
                        'opacity'    : 0,
                        'visibility' : 'hidden'
                    })
                    .style('text-anchor', 'left')
                    .attr({
                        'startOffset': '15%'
                    })
                    .text(function (d) {
                        return d.name;
                    });

                var overX = d3.select('g.group').node().getBBox().x;
                var overY = d3.select('svg#mySvg').node().getBBox().y;
                var heightDelta = d3.select('g.group').node().getBBox().height - d3.select('svg#mySvg').node().attributes.height.value;

                d3.select('g.group').selectAll('.textId')
                    .data(dataset.nodes)
                    .enter()
                    .append('text')
                    .append('textPath')
                    .attr({
                        'xlink:href': function (d) {
                            return '#id_path_' + d.name;
                        },
                        'class'     : function (d) {
                            return d.belongTo + ' idLabel'
                        },
                        'opacity'    : 0,
                        'visibility' : 'hidden'
                    })
                    .style('text-anchor', 'middle')
                    .attr('startOffset', '75%')
                    .text(function (d) {
                        return d.consulId;
                    })
                    .style({
                        'font-size': 9
                    });

                if (heightDelta > 0) {
                    height += (heightDelta) * 1.2;
                }

                dx = -overX;
                dy = -overY;

                d3.select('g.group')
                    .transition()
                    .attr({
                        transform: 'translate(' + (dx + 50) + ',' + (dy + 20) + ')'
                    });

                return callback({
                    mainCirclesDots: mainCirclesDots,
                    height: height,
                    dx: dx,
                    dy: dy
                });
            }

            return {
                drawCircles: drawCircles
            };
        })();

        return COUNTER;
    }
);
