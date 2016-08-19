"use strict";

define([
    'jQuery',
    'd3',
    'io',
    'helpers/coordCounter',
    'helpers/animation',
    'helpers/groupsState',
    'constants'
], function ($, d3, io,  Counter, Animation, GroupsState, Constants) {
    var initialize = function () {
        var socketURL = window.location.origin;
        var options = {
            transports            : ['websocket'],
            'force new connection': true
        };
        //var socketClient = io.connect(socketURL, options);
        var currentGroupsState = {groupCount: 0, groups: []};

        var drawingsActions = {
            renderAll         : function () {

                $('#wrapper').empty();
                drawElements(currentGroupsState.serverData);
            },
            addGroup          : function () {
            },
            addContainer      : function () {
            },
            removeContainer   : function () {
            },
            changesInContainer: function () {
            }
        };

        function getServerData() {
            $.get('groupContainers', function (data, status) {
                GroupsState(data, currentGroupsState, drawingsActions);

                /* for (var i = 0; i < data.length; i++) {
                 arrWithId.push([]);
                 for (var j = 0; j < data[i].containers.length; j++) {
                 //console.log(j ,'=>', data[i].containers[j].Id);
                 arrWithId[i].push(data[i].containers[j].Id);
                 }
                 }*/
            });
        }



        //$('.sidebar').mCustomScrollbar();
        getServerData();

        /* socketClient.on('logs:push', function (data) {
         alert(data.data);
         });*/

        //setInterval(getServerData, 3000);

        //function showLogs(containerId, area) {
        function showLogs(containerId, area) {
            var since = Date.now() / 1000 - (60 * 60 * 24) * 1000;

            socketClient.emit('logs:get', {
                id   : containerId,
                since: since
            });
        }

        function drawElements(data) {
            var serverData = data;
            var height = 1800;
            var sidebarDx = 233;
            var isDrawn = true;
            var isSidebarOpen = false;
            var mainCirclesDots = [];
            var dx = 0;
            var dy = 0;
            var svg;
            var width = $('.svg_wrapper').width() - 17;
            var controlItemsData = [];
            var dataset = {
                nodes: [],
                edges: []
            };
            var $sideBarItem = $('.container_list li');
            var keys = Object.keys(serverData);
            var servDataLength = keys.length;
            var $closeBtn = $('.close');
            var groupsCount = [];
            var counter = 0;
            var subGroupCounter = 0;
            var controlObj;
            var nodeEl;
            var node;
            var m;
            var g;
            var i;
            var r;
            var j;
            var checkpoints = [];

            function connectCheckPoints(checkpoints) {

                for(i = checkpoints.length; i--;){

                    for(j = checkpoints.length; j--;){

                        if(!(dataset.nodes[checkpoints[i]].name === dataset.nodes[checkpoints[j]].name)){

                            var edgeObj = {
                                source: dataset.nodes[checkpoints[i]].name,
                                target: dataset.nodes[checkpoints[j]].name,
                                type: 0
                            };

                            if(dataset.nodes[checkpoints[i]].megagroup === dataset.nodes[checkpoints[j]].megagroup){
                                edgeObj.type = 1;
                            }

                            dataset.edges.push(edgeObj)
                        }
                    }
                }
            }

            function connectSubgroupPoints (checkpoints){

                for(var i = checkpoints.length; i--;){

                    for(j = checkpoints.length; j--;) {

                        if (!(dataset.nodes[checkpoints[i]].name === dataset.nodes[checkpoints[j]].name)) {

                            var edgeObj = {
                                source: dataset.nodes[checkpoints[i]].name,
                                target: dataset.nodes[checkpoints[j]].name,
                                type  : 0
                            };
                        }

                        if(edgeObj){
                            dataset.edges.push(edgeObj);
                        }
                    }
                }
            }

            function bindNodeListeners(deltaX){

                node.on('mouseenter', function () {
                    var el = d3.select(this).attr('data-id');
                    var xLocation = d3.select(this).node().getBBox().x;
                    var yLocation = d3.select(this).node().getBBox().y;
                    var dropDownWidth = parseInt($('.drop_down').width()) / 1.2;

                    d3.select('circle.shade_' + el)
                        .transition()
                        .attr('opacity', 1);

                    d3.select('.drop_down')
                        .style({
                            'left': (xLocation + dx + deltaX + dropDownWidth) + 'px',
                            'top' : (yLocation + dy + 20) + 'px'
                        });

                    d3.select('.drop_down')
                        .transition()
                        .duration(500)
                        .style({
                            'opacity'   : 1,
                            'visibility': 'visible'
                        });

                    $('.drop_down .title span').text(d3.select(this).datum().consulId)
                })
                    .on('mouseleave', function () {
                        var el = d3.select(this).attr('data-id');
                        d3.select('circle.shade_' + el)
                            .transition()
                            .attr('opacity', 0);
                    });
            }

            for (i = servDataLength; i--;) {

                groupsCount.push(serverData[keys[i]].length);

                controlObj = {
                    name: serverData[keys[i]][0].name,
                    type: 'el_2',
                    info: '#6558DC'
                };

                for(j = serverData[keys[i]].length; j--;){

                    for(m = serverData[keys[i]][j].containers.length; m--;){

                        nodeEl = {
                            sbCountId: subGroupCounter,
                            isCheckPoint: false,
                            name        : counter,
                            consulId    : serverData[keys[i]][j].containers[m].ConsulId,
                            type        : "el_2",
                            group       : j,
                            megagroup   : i,
                            shadow      : '#F15A24',
                            info        : '#6558DC',
                            text        : serverData[keys[i]][j].name + " replica"
                        };

                        if(m === 0){
                            nodeEl.isCheckPoint = true;
                        }

                        dataset.nodes.push(nodeEl);
                        counter++;
                    }

                    subGroupCounter++;
                }

                controlItemsData.push(controlObj);
            }

            for(i = dataset.nodes.length; i--;){

                if(dataset.nodes[i].isCheckPoint){

                    checkpoints.push(i);
                }
            }

            connectCheckPoints(checkpoints);
            checkpoints = [];

            for(i = subGroupCounter; i--;){

                checkpoints.push([]);
            }

            for(j = dataset.nodes.length; j--;){

                var sbIndex = dataset.nodes[j].sbCountId;

                (checkpoints[sbIndex]).push(j)
            }

            for(i = checkpoints.length; i--;){

                connectSubgroupPoints(checkpoints[i])
            }

            function renderAll() {
                var shadowNode;
                var infoNode;
                var infoPath;
                var force;
                var group;
                var edges;
                var g;

                function drawCircles() {
                    var subDots = [];
                    var dotsForRadius;
                    var oneCircleDots;
                    var $selection;
                    var $select;
                    var xMin;
                    var yMin;
                    var xMax;
                    var yMax;
                    var j;
                    var x;
                    var y;
                    var i;
                    var t;

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

                    mainCirclesDots = [];
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
                                    type   : 'circle_' + i
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
                                return d.y * 1.05;
                            },
                            'r'           : function (d) {
                                return countRadius(d)
                            },
                            'stroke'      : '#666666',
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
                                    .attr({'opacity': 1})
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
                            r: Math.sqrt((+x[1] - x[0]) * (+x[1] - x[0]) + (+y[1] - y[0]) * (+y[1] - y[0])) * 1.12
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
                            'stroke'      : '#666666',
                            'stroke-width': 2,
                            'fill'        : 'none',
                            'opacity'     : 0
                        })
                        .transition()
                        .attr('opacity', 1);

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
                            fill   : 'none'
                        });

                    d3.select('g.group')
                        .selectAll('.text')
                        .data(mainCirclesDots)
                        .enter()
                        .append('text')
                        .append('textPath')
                        .attr({
                            'xlink:href': function (d, i) {
                                return '#circle_text_path_' + i;
                            },
                            'class'     : 'mainCircleLabel'
                        })
                        .style('text-anchor', 'left')
                        .attr('startOffset', '15%')
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
                            'class'     : 'idLabel'
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

                    bindNodeListeners(0);
                    renderInfoText(dx, dy);
                    renderControls(mainCirclesDots, dx, dy);
                }

                svg = d3.select('.svg_wrapper')
                    .append('svg')
                    .attr({
                        id: 'mySvg'
                    })
                    .on('click', showContainers);

                g = svg
                    .attr({
                        height: height,
                        width : width
                    })
                    .append('svg')
                    .attr('class', 'main');

                force = d3.layout.force()
                    .nodes(dataset.nodes)
                    .friction(0.9)
                    .links(dataset.edges)
                    .size([width, height])
                    .linkDistance(function (d) {

                        if (!(d.source.megagroup === d.target.megagroup)) {

                            return 700;
                        } else if (!(d.source.group === d.target.group)) {

                            return 500;
                        }

                        return 100;
                    })
                    .charge(-300)
                    .start();

                group = g.append('g')
                    .attr({
                        'class'     : 'group',
                        'opacity'   : 0,
                        'visibility': 'hidden'
                    });

                edges = group.selectAll("line")
                    .data(dataset.edges)
                    .enter()
                    .append('line')
                    .style("stroke", "#ccc");

                infoPath = group
                    .selectAll('.id_path')
                    .data(dataset.nodes)
                    .enter()
                    .append('path');

                infoNode = group
                    .selectAll('.info_node')
                    .data(dataset.nodes)
                    .enter()
                    .append('circle');

                shadowNode = group
                    .selectAll('.shadow_node')
                    .data(dataset.nodes)
                    .enter()
                    .append('circle');

                node = group
                    .selectAll('.node')
                    .data(dataset.nodes)
                    .enter()
                    .append('use');

                force.on('end', function () {
                    drawCircles()
                });

                force.on('tick', function (opt) {
                    isDrawn = false;

                    if (opt.alpha < 0.02) {
                        force.stop();
                    }

                    infoPath.attr({
                        'd'    : function (d) {
                            return 'M ' + (parseInt(d.x) - 15) + ',' + (parseInt(d.y) + 57) + ' A 32,32 0 0,1 ' + (parseInt(d.x) - 15) + ',' + (parseInt(d.y) - 7);
                        },
                        'id'   : function (d) {
                            return 'id_path_' + d.name;
                        },
                        'class': 'id_label',
                        fill   : 'none'
                    });

                    infoNode.attr({
                        'cx'     : function (d) {
                            return parseInt(d.x) - 15;
                        },
                        'cy'     : function (d) {
                            return parseInt(d.y) + 25;
                        },
                        'r'      : 30,
                        'fill'   : function (d) {
                            return d.info;
                        },
                        'class'  : function (d, i) {
                            return 'info_holder info_' + d.type + '_' + i;
                        },
                        'opacity': 1
                    });

                    shadowNode.attr({
                        'cx'     : function (d) {
                            return d.x;
                        },
                        'cy'     : function (d) {
                            return d.y;
                        },
                        'r'      : 24,
                        'fill'   : function (d) {
                            return d.shadow;
                        },
                        'class'  : function (d, i) {
                            return 'shade_' + d.type + '_' + i;
                        },
                        'opacity': 0
                    });

                    edges
                        .attr({
                            'x1'   : function (d) {
                                return d.source.x;
                            },
                            'y1'   : function (d) {
                                return d.source.y;
                            },
                            'x2'   : function (d) {
                                return d.target.x;
                            },
                            'y2'   : function (d) {
                                return d.target.y;
                            },
                            'class': function (d) {
                                return 'line_' + d.type;
                            }
                        })
                        .style('opacity', 0.5);

                    node
                        .attr({
                            'xlink:href': function (d) {
                                return '#' + d.type;
                            },
                            'class'     : function (d) {
                                return 'node group_' + d.megagroup + ' subgroup_' + d.group;
                            },
                            'data-id'   : function (d, i) {
                                return d.type + '_' + i;
                            },
                            'x'         : function (d) {
                                return d.x;
                            },
                            'y'         : function (d) {
                                return d.y;
                            }
                        })

                });
            }

            function renderInfoText(dx, dy){
                var $infoCircles = $('.info_holder');
                var infoArray = [];

                $infoCircles.each(function () {
                    var circle = d3.select(this);

                    infoArray.push({
                        left: parseFloat(circle.node().getBBox().x) + parseFloat(dx) + 119,
                        top: parseFloat(circle.node().getBBox().y) + parseFloat(dy) + 42,
                        text: circle.datum().text
                    })
                });

                d3.select('.svg_wrapper')
                    .selectAll('.divText')
                    .data(infoArray)
                    .enter()
                    .append('div')
                    .attr({
                        'class': 'nodeInfoText'
                    })
                    .style({
                        'top': function(d){
                            return (d.top) + 'px';
                        },
                        'left': function(d){
                            return (d.left) + 'px';
                        },
                        'display': 'none'
                    })
                    .html(function(d){
                        return d.text;
                    });
            }

            function showDropDown(e){
                var $target = $(e.target).closest('li');
                var xLocation = $target.offset().left + $target.width();
                var yLocation = $target.offset().top + $target.height()/2;

                e.stopPropagation();
                e.preventDefault();

                d3.select('.drop_down')
                    .style({
                        'left'      : (xLocation + 20) + 'px',
                        'top'       : (yLocation) + 'px'
                    });

                d3.select('.drop_down')
                    .transition()
                    .style({
                        'opacity'   : 1,
                        'visibility': 'visible'
                    });
            }

            function hideDropDown(e){

                if(e){
                    e.stopPropagation();
                    e.preventDefault();
                }

                d3.select('.drop_down')
                    .transition()
                    .style({
                        'opacity'   : 0,
                        'visibility': 'hidden'
                    });
            }

            function hideContainers(){

                hideDropDown();

                d3.select('.svg_wrapper')
                    .selectAll('div')
                    .style({
                        'display': 'none'
                    });

                d3.selectAll('.controlCircle')
                    .transition()
                    .attr({
                        'opacity': 1,
                        'visibility': 'display-block'
                    });

                d3.selectAll('.controlLabel')
                    .transition()
                    .attr({
                        'opacity': 1,
                        'visibility': 'display-block'
                    });

                d3.select('g.group')
                    .transition()
                    .attr({
                        'opacity': 0,
                        'visibility': 'hidden'
                    });

                svg
                    .on('click', showContainers)
            }

            function showContainers(){

                if(!isDrawn){
                    return;
                }

                hideDropDown();

                d3.select('.svg_wrapper')
                    .selectAll('div')
                    .transition()
                    .style({
                        'display': 'block'
                    });

                d3.selectAll('.controlCircle')
                    .transition()
                    .attr({
                        'opacity': 0,
                        'visibility': 'hidden'
                    });

                d3.selectAll('.controlLabel')
                    .transition()
                    .attr({
                        'opacity': 0,
                        'visibility': 'hidden'
                    });

                d3.select('g.group')
                    .transition()
                    .attr({
                        'opacity': 1,
                        'visibility': 'display-block'
                    });

                svg
                    .on('click', hideContainers)

            }

            function renderControls(dots, dx, dy){
                var controlGroup;

                controlGroup = d3.select('svg.main')
                    .append('g')
                    .attr({
                        'id': 'controls'
                    });

                controlGroup.selectAll('.controlCircle')
                    .data(controlItemsData)
                    .enter()
                    .append('circle')
                    .attr({
                        'class': 'controlCircle',
                        'id': function(d){
                            return d.name;
                        },
                        'cx': function(d, i){
                            return dots[i].x;
                        },
                        'cy': function(d, i){
                            return dots[i].y;
                        },
                        'r': 100,
                        'fill': function(d){
                            return d.info;
                        },
                        'transform': function(d,i){

                            return 'translate(' + (dx + dots[i].r*0.6 - 70 + 50) + ',' + (dy - dots[i].r*0.8 + 70 + 20) + ')';
                        }
                    });

                controlGroup.selectAll('path')
                    .data(controlItemsData)
                    .enter()
                    .append('path')
                    .attr({
                        'd': function(d, i){
                            return 'M ' + (parseInt(dots[i].x) - 110) + ',' + dots[i].y + ' A 105,105 0 0,1 ' + (parseInt(dots[i].x) + 110) + ',' + dots[i].y;
                        },
                        'transform': function(d,i){

                            return 'translate(' + (dx + dots[i].r*0.6 - 70 + 50) + ',' + (dy - dots[i].r*0.8 + 70 + 20) + ')';
                        },
                        'id': function(d, i){
                            return 'text_path_' + i;
                        },
                        fill: 'none'
                    });

                controlGroup
                    .selectAll('.text')
                    .data(controlItemsData)
                    .enter()
                    .append('text')
                    .append('textPath')
                    .attr({
                        'xlink:href': function (d, i) {
                            return '#text_path_' + i;
                        },
                        'class': 'controlLabel',
                        'transform': function(d,i){

                            return 'translate(' + (dx + dots[i].r*0.6 - 70 + 50) + ',' + (dy - dots[i].r*0.8 + 70 + 20) + ')';
                        }
                    })
                    .style('text-anchor', 'left')
                    .attr('startOffset', '15%')
                    .text(function (d) {
                        return d.name;
                    });

                controlGroup.selectAll('.controlNode')
                    .data(controlItemsData)
                    .enter()
                    .append('use')
                    .attr({
                        'class': 'controlNode',
                        'xlink:href': function (d) {
                            return '#' + d.type;
                        },
                        'x'         : function (d, i){
                            return dots[i].x;
                        },
                        'y'         : function (d, i){
                            return dots[i].y;
                        },
                        'transform': function(d,i){
                            return 'translate(' + (dx + dots[i].r*0.6 + 50) + ',' + (dy - dots[i].r*0.8 + 20) + ')';
                        }
                    });

                isDrawn = true;
                $('.loader').hide();
            }

            function openBar(e){

                if(!isDrawn || isSidebarOpen){
                    return;
                }

                bindNodeListeners(sidebarDx);
                $('.drop_down').animate({left: '+=' + sidebarDx}, 0);
                $('.nodeInfoText').each(function(){

                    $(this).animate({left: '+=' + sidebarDx}, 0)
                });

                hideDropDown(e);
                $('.sidebar').addClass('active');
                $('.svg_wrapper').addClass('side_active');
                isSidebarOpen = true;
                width = width - 400;
            }

            function closeBar(){

                if(!isDrawn || !isSidebarOpen){
                    return;
                }

                bindNodeListeners(0);
                $('.drop_down').animate({left: '-=' + sidebarDx}, 0);
                $('.nodeInfoText').each(function(){

                    $(this).animate({left: '-=' + sidebarDx}, 0)
                });

                $('.sidebar').removeClass('active');
                $('.svg_wrapper').removeClass('side_active');
                isSidebarOpen = false;
                width = width + 400;
            }

            renderAll();

            $closeBtn.click(closeBar);
            $closeBtn.click(hideDropDown);
            $('.sidebar').on('mouseover', openBar);
            $sideBarItem.on('mouseenter', showDropDown);
            $sideBarItem.on('mouseleave', hideDropDown);
        }
        
        //drawElements();
    };

    return {
        initialize: initialize
    };
});