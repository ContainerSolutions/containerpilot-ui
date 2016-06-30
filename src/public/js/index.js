"use strict";

define([
    'jQuery',
    'd3',
    'io',
    'helpers/coordCounter',
    'helpers/animation',
    'helpers/groupsState',
    'constants'
], function ($, d3, io, Counter, Animation, GroupsState, Constants) {
    var initialize = function () {
        var socketURL = window.location.origin;
        var options = {
            transports            : ['websocket'],
            'force new connection': true
        };
        var socketClient = io.connect(socketURL, options);
        var currentGroupsState = {groupCount: 0, groups: []};

        var drawingsActions = {
            renderAll         : function () {
                $('#wrapper').empty();
                drawElements(currentGroupsState.serverData);
            },
            addGroup          : function () {
            },
            addContainer      : function () {
                //TODO add run function with animation for addinging container
            },
            removeContainer   : function () {
                //TODO add run function with animation for removing container
            },
            changesInContainer: function () {
            }
        };

        function getServerData() {
            $.get('groupContainers', function (data, status) {
                GroupsState(data, currentGroupsState, drawingsActions);
            });
        }

        getServerData();

        socketClient.on('logs:push', function (data) {
            alert(data.data);
        });

        setInterval(getServerData, 3000);

        //function showLogs(containerId, area) {
        function showLogs(containerId, area) {
            var since = Date.now() / 1000 - (60 * 60 * 24) * 1000;

            socketClient.emit('logs:get', {
                id   : containerId,
                since: since
            });
        }

        function copyProperties(obj, source, additional) {
            var additionalKeys = Object.keys(additional);

            for (var i = source.length; i--;) {
                var keys = Object.keys(source[i]);

                for (var j = keys.length; j--;) {

                    obj[i][keys[j]] = source[i][keys[j]];
                }

                for (var k = additionalKeys.length; k--;) {

                    obj[i][additionalKeys[k]] = additional[additionalKeys[k]];
                }
            }

            return obj;
        }

        function drawElements(data) {
            var figureFunctions = [
                function (parent, circleCount, XcirclesStaticPoint, YcirclesStaticPoint, diam, groupColor, lineFunction, properties, additional) {
                    var circleGroupObj = Counter.generateOneGroupPoints(circleCount, XcirclesStaticPoint, YcirclesStaticPoint, diam, [2.8 * Math.PI, 1.3 * Math.PI]);
                    var circleInfoObj = copyProperties(properties, circleGroupObj.objVector, additional);
                    var circle = parent.selectAll('circle')
                        .data(circleInfoObj);

                    circle.enter()
                        .append('circle')
                        .attr({
                            cx            : function (d) {
                                return d.x
                            },
                            cy            : function (d) {
                                return d.y
                            },
                            'id'          : function (d) {
                                return d.Id
                            },
                            'class'       : 'circle item',
                            'r'           : radius,
                            'stroke'      : groupColor,
                            'stroke-width': '2px',
                            'fill'        : groupColor
                        })
                        .on('click', function (d, i) {
                            div.transition()
                                .duration(200)
                                .style("opacity", .9);
                            div.style("left", d3.event.pageX + "px")
                                .style("top", d3.event.pageY + "px");

                            div.select('div')
                                .html('hello<br/>' + 'I am a circle ' + i  + '<hr>' +
                                    'id: ' + d.ConsulId + '<hr>' +
                                    'My script is:' + '<br/>' + d.Command + '<hr>' +
                                    'IsPrimary: ' + d.IsPrimary + '<hr>');
                            div.select('button')
                                .attr({
                                    "data-id": d.Id
                                });
                        });

                    var circleLineGraph = parent.append("path")
                        .attr({
                            d             : lineFunction(circleGroupObj.lineVector),
                            'class'       : 'lineGraph-0',
                            'stroke'      : groupColor,
                            'stroke-width': 3
                        })
                        .style("stroke-dasharray", ("15, 20")) //=> FOR DASHED LINE
                        .attr("fill", "none");
                },
                function (parent, triangleCount, XtriangleStaticPoint, YtriangleStaticPoint, diam, groupColor, lineFunction, properties, additional) {
                    var triangleGroupObj = Counter.generateOneGroupPoints(triangleCount, XtriangleStaticPoint, YtriangleStaticPoint, diam, [4 * Math.PI, 2.3 * Math.PI]);
                    var triangleInfoObj = copyProperties(properties, triangleGroupObj.objVector, additional);
                    var dx = Math.sqrt(3) * 1.5 * diam / 4;
                    var dy = 3 * 1.5 * diam / 4;
                    var triangle = parent.selectAll('polygon')
                        .data(triangleInfoObj);

                    triangle.enter().append("polygon")
                        .attr({
                            'points'      : function (d) {
                                return d.x + ',' + d.y + ' ' + (d.x + dx) + ',' + (d.y + dy) + ' ' + (d.x - dx) + ',' + (d.y + dy)
                            },
                            'transform'   : function (d) {
                                return 'rotate(' + Math.random() * (360) + ',' + d.x + ',' + d.y + ')'
                            },
                            'id'          : function (d) {
                                return d.Id
                            },
                            "stroke"      : groupColor,
                            "stroke-width": 2,
                            "fill"        : groupColor
                        })
                        .on('click', function (d) {

                            div.transition()
                                .duration(200)
                                .style("opacity", .9);
                            div.style("left", d3.event.pageX + "px")
                                .style("top", d3.event.pageY + "px");

                            div.select('div')
                                .html('hello<br/>' + 'I am a triangle'  + '<hr>' +
                                    'id: ' + d.ConsulId + '<hr>' +
                                    'My script is:' + '<br/>' + d.Command + '<hr>' +
                                    'IsPrimary: ' + d.IsPrimary + '<hr>');
                            div.select('button')
                                .attr({
                                    "data-id": d.Id
                                });
                        });

                    var triangleLineGraph = parent.append("path")
                        .attr({
                            d             : lineFunction(triangleGroupObj.lineVector),
                            'class'       : 'lineGraph',
                            'stroke'      : groupColor,
                            'stroke-width': 3
                        })
                        .style("stroke-dasharray", ("15, 20")) //=> FOR DASHED LINE
                        .attr("fill", "none");
                }
            ];
            var radius = 3;
            var diam = 2 * radius;
            var groupColors = Constants.GROUP_COLORS;

            // Emulate test data from server if need Test something
            //var data = Constants.TEST_SERVER_DATA;
            var structure = {
                groupCount   : [],
                subGroupCount: {},
                itemsCount   : {}
            };
            var groupKeys = Object.keys(data);
            var area = {
                "name"    : 'svg',
                "children": []
            };
            var groupArea = 0;
            var child = {};
            var subgroupsCount;
            var $subGroups;
            var itemsCount;
            var subgroups;
            var sbLength;
            var parent;
            var _name;
            var $group;
            var name;
            var keys;
            var j;
            var a;
            var k;
            var i;
            var p;
            var b;
            var h;
            var n;

            structure.groupCount = groupKeys;

            for (p = 0; p < groupKeys.length; p++) {
                name = groupKeys[p];
                structure.subGroupCount[name] = data[name].length;
                structure.itemsCount[name] = [];

                for (i = 0; i < data[name].length; i++) {

                    if (data[name][i].containers.length) {
                        structure.itemsCount[name].push(data[name][i].containers.length);
                    }

                }
            }

            keys = Object.keys(structure.itemsCount);

            for (j = keys.length; j--;) {
                subgroupsCount = structure.itemsCount[keys[j]];

                child = {
                    "name"    : keys[j],
                    "children": []
                };

                for (k = subgroupsCount.length; k--;) {
                    a = 20 * (8 + structure.itemsCount[keys[j]][k]) * (8 + structure.itemsCount[keys[j]][k]) * diam * diam / (Math.PI * Math.PI);
                    groupArea += a;
                    child.children.push({
                        "name": keys[j] + '_subgroup' + ' sb_' + k,
                        "size": a
                    });
                }

                area.children.push(child)
            }

            var d = (Math.sqrt(groupArea) * 2).toFixed(0);
            var diameter = d,
                format = d3.format(",d");

            var pack = d3.layout.pack()
                .padding([50])
                .size([diameter - 4, diameter - 4])
                .value(function (d) {
                    return d.size;
                });

            var svg = d3.select("body").append("svg")
                    .attr("width", diameter)
                    .attr("height", diameter),
                g = svg.append("g");

            var node = g.datum(area).selectAll(".node")
                .data(pack.nodes)
                .enter().append("g")
                .attr("class", function (d) {
                    return d.children ? "node" : "leaf node";
                })
                .attr("class", function (d) {
                    return d.name;
                });

            var div = d3.select('#wrapper')
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            var zoom = d3.behavior.zoom()
                .scaleExtent([1, 50])
                .on("zoom", function () {

                    d3.select('#wrapper div').style("opacity", 0);

                    var e = d3.event,
                        tx = Math.min(0, Math.max(e.translate[0], diameter - diameter * e.scale)),
                        ty = Math.min(0, Math.max(e.translate[1], diameter - diameter * e.scale));
                    zoom.translate([tx, ty]);
                    g.attr("transform", [
                        "translate(" + [tx, ty] + ")",
                        "scale(" + e.scale + ")"
                    ].join(" "));
                });

            var lineFunction = d3.svg.line()
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                })
                .interpolate("basis-closed");

            var staticPoints = {};

            node.append("circle")
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                })
                .attr("r", function (d) {
                    return d.r;
                });

            div
                .append("div").attr("class", "infoContent");
            div
                .append("button")
                .attr("class", "showLogs")
                .style("pointer-events", "auto")
                .html('Show Logs')
                .on('click', function () {
                    showLogs($(this).attr("data-id"));
                });

            svg.call(zoom);

            for (b = structure.groupCount.length; b--;) {

                $group = d3.selectAll('g.' + structure.groupCount[b] + ' circle');
                $subGroups = d3.selectAll('g.' + structure.groupCount[b] + '_subgroup circle');

                staticPoints[structure.groupCount[b]] = {
                    x : parseFloat($group.attr('cx')),
                    y : parseFloat($group.attr('cy')),
                    r : parseFloat($group.attr('r')),
                    sb: {}
                };

                h = $subGroups[0].length;

                $subGroups.each(function () {
                    h--;
                    staticPoints[structure.groupCount[b]].sb[h] = {
                        x: parseFloat($(this).attr('cx')),
                        y: parseFloat($(this).attr('cy')),
                        r: parseFloat($(this).attr('r'))
                    };
                })
            }

            console.log(staticPoints);


            d3.selectAll('g.svg').remove();

            for (var t = structure.groupCount.length; t--;) {
                _name = structure.groupCount[t];
                subgroups = structure.subGroupCount[_name];
                sbLength = structure.itemsCount[_name].length;
                d3.selectAll('g.' + _name).remove();

                for (n = sbLength; n--;) {
                    d3.selectAll('g.' + _name + '_subgroup' + '.sb_' + n + ' circle').remove();
                    itemsCount = (structure.itemsCount[_name])[n];
                    parent = g.selectAll('g.' + _name + '_subgroup' + '.sb_' + n);

                    figureFunctions[n](parent, itemsCount, staticPoints[_name].sb[n].x, staticPoints[_name].sb[n].y, diam, groupColors[t], lineFunction,
                        data[_name][n].containers,
                        {
                            Command: data[_name][n].Command
                        });

                    if (itemsCount === 1) {
                        d3.selectAll('g.' + _name + '_subgroup' + '.sb_' + n + ' path')
                            .attr({
                                style: 'display: none'
                            });
                    } else if (sbLength === 1) {
                        d3.selectAll('g.' + _name + '_subgroup' + '.sb_' + n + ' path')
                            .attr({
                                style: "stroke-dasharray: ''"
                            });
                    } else {
                        parent.append('circle')
                            .attr({
                                'cx'          : staticPoints[_name].x - 10,
                                'cy'          : staticPoints[_name].y,
                                'r'           : staticPoints[_name].r,
                                'stroke'      : groupColors[t],
                                'stroke-width': '2px',
                                'fill'        : 'none'
                            });
                        parent.attr({
                            'transform': 'rotate(' + sbLength * 15 + ',' + staticPoints[_name].x + ',' + staticPoints[_name].y + ')'
                        });
                    }
                }
            }
        }
    };

    function onRedrawAdd() {
    }

    // in progress
    function onRedrawRemove(id) {
        var id = id || '026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625';
        var motion = new Animation.Motion();
        var $elementBeforeRemove = $('.circle#' + id);
        var index = 3;
        var $elements = $elementBeforeRemove.nextAll('.circle');
        var $prevEl;
        var $currentEl;

        console.log($elements);

        $elements.each(function () {
            $currentEl = $(this);
            $prevEl = $currentEl.prev('.circle');

            motion.run($currentEl, $currentEl.attr('cx'), $prevEl.attr('cx'), $currentEl.attr('cy'), $prevEl.attr('cy'));
        });
    }

    $('#redrawAdd').click(onRedrawAdd);
    $('#redrawRemove').click(onRedrawRemove);
    $('#buttonUpdate').click(function () {
        alert('click')
    });

    return {
        initialize: initialize
    };
});

