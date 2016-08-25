"use strict";

define([
    'jQuery',
    'mCustomScrollbar',
    'd3',
    'io',
    'hash',
    'helpers/renderCircles',
    'helpers/parseServerData',
    'helpers/additionalRender',
    'helpers/groupsState',
    'constants'
], function ($, mCustomScrollbar, d3, io, hash, Counter, Parser, AdditionalRender, GroupsState, Constants) {
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
        //getServerData();

        /* socketClient.on('logs:push', function (data) {
         alert(data.data);
         });*/

        setInterval(getServerData, 3000);

        //function showLogs(containerId, area) {
        function showLogs(containerId, area) {
            var since = Date.now() / 1000 - (60 * 60 * 24) * 1000;

            socketClient.emit('logs:get', {
                id   : containerId,
                since: since
            });
        }

        //drawElements();

        function drawElements(data) {
            var serverData = data;
            var additionalRender = new AdditionalRender.AdditionalRender();
            //var serverData = Constants.TEST_SERVER_DATA;
            var width = $('.svg_wrapper').width() - 17;
            var $sideBarItem = $('.container_list li');
            var colorShema = Constants.GROUP_COLORS;
            var keys = Object.keys(serverData);
            var $closeBtn = $('.close');
            var isSidebarOpen = false;
            var mainCirclesDots = [];
            var sidebarDx = 233;
            var isDrawn = true;
            var height = 1800;
            var dx = 0;
            var dy = 0;
            var node;
            var svg;
            var g;

            function renderAll(dataset, controlItemsData, groupsCount) {
                var shadowNode;
                var infoNode;
                var infoPath;
                var force;
                var group;
                var edges;
                var g;

                svg = d3.select('.svg_wrapper')
                    .append('svg')
                    .attr({
                        id: 'mySvg'
                    });

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

                            return 900;
                        } else if (!(d.source.group === d.target.group)) {

                            return 650;
                        }

                        return 100;
                    })
                    .charge(-300)
                    .start();

                group = g.append('g')
                    .attr({
                        'class'     : 'group'
                    });

                edges = group.selectAll("line")
                    .data(dataset.edges)
                    .enter()
                    .append('line')
                    .style('stroke', '#ccc');

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
                    Counter.drawCircles(dataset, height, groupsCount, controlItemsData, colorShema, keys, function(callback){
                        mainCirclesDots = callback.mainCirclesDots;
                        dx = callback.dx;
                        dy = callback.dy;
                        height = callback.height;

                        bindNodeListeners(0);
                        additionalRender.renderInfoText(dx, dy);
                        additionalRender.renderControls(controlItemsData, mainCirclesDots, dx, dy, function(callback){
                            isDrawn = callback;
                        });
                    })
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
                        'class': function(d){
                            return d.belongTo + ' id_label'
                        },
                        'fill': 'none',
                        'opacity'   : 0,
                        'visibility': 'hidden'
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
                            return d.belongTo + ' info_holder info_' + d.type + '_' + i;
                        },
                        'opacity'   : 0,
                        'visibility': 'hidden'
                    });

                    /* shadowNode.attr({
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
                     return d.belongTo + ' shade_' + d.type + '_' + i;
                     },
                     'opacity'   : 0,
                     'visibility': 'hidden'
                     });*/

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
                                return d.belongTo + ' line_' + d.type;
                            }
                        })
                        .style('opacity', 0);

                    node
                        .attr({
                            'xlink:href': function (d) {
                                return '#' + d.type;
                            },
                            'class'     : function (d) {
                                return d.belongTo + ' node group_' + d.megagroup + ' subgroup_' + d.group;
                            },
                            'data-id'   : function (d, i) {
                                return d.type + '_' + i;
                            },
                            'x'         : function (d) {
                                return d.x;
                            },
                            'y'         : function (d) {
                                return d.y;
                            },
                            'opacity'   : 0,
                            'visibility': 'hidden'
                        })

                });
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
                                'left': (xLocation + dx + deltaX + 180) + 'px',
                                'top' : (yLocation + dy + 20) + 'px'
                            });

                        d3.select('.drop_down')
                            .transition()
                            .duration(500)
                            .style({
                                'opacity'   : 1,
                                'visibility': 'visible'
                            });

                        $('.drop_down .title_id span').text(d3.select(this).datum().consulId)
                    })
                    .on('mouseleave', function () {
                        var el = d3.select(this).attr('data-id');
                        d3.select('circle.shade_' + el)
                            .transition()
                            .attr('opacity', 0);
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

            function hideContainers(e){
                var $target = $(e.target);
                var type = $target.attr('data-type');

                $target.addClass('hide');
                $target.parent().find('.more_btn').removeClass('hide');
                hideDropDown();

                d3.selectAll('.' + type + '.nodeInfoText')
                    .style({
                        'display': 'none'
                    });

                d3.selectAll('.controlCircle#' + type)
                    .transition()
                    .attr({
                        'opacity': 1,
                        'visibility': 'display-block'
                    });

                d3.selectAll('.' + type + '.controlLabel')
                    .transition()
                    .attr({
                        'opacity': 1,
                        'visibility': 'display-block'
                    });

                d3.selectAll('g.group .' + type)
                    .transition()
                    .attr({
                        'opacity': 0,
                        'visibility': 'hidden'
                    });
            }

            function showContainers(e){
                var $target = $(e.target);
                var type = $target.attr('data-type');

                $target.addClass('hide');
                $target.parent().find('.less_btn').removeClass('hide');

                if(!isDrawn){
                    return;
                }

                hideDropDown();

                d3.selectAll('.' + type + '.nodeInfoText')
                    .transition()
                    .style({
                        'display': 'block'
                    });

                d3.selectAll('.controlCircle#' + type)
                    .transition()
                    .attr({
                        'opacity': 0,
                        'visibility': 'hidden'
                    });

                d3.selectAll('.' + type + '.controlLabel')
                    .transition()
                    .attr({
                        'opacity': 0,
                        'visibility': 'hidden'
                    });

                d3.selectAll('g.group .' + type)
                    .transition()
                    .attr({
                        'opacity': 1,
                        'visibility': 'display-block'
                    });
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
                width = width - 223;
                svg
                    .attr({
                        height: height,
                        width : width
                    })
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
                width = width + 223;
                svg
                    .attr({
                        height: height,
                        width : width
                    })
            }

            Parser.parseData(serverData, colorShema, function(response){
                var dataset = response.dataset;
                var controlItemsData = response.controlItemsData;
                var groupsCount = response.groupsCount;

                renderAll(dataset, controlItemsData, groupsCount);
                additionalRender.renderSidebar(serverData, colorShema);
            });

            $closeBtn.click(closeBar);
            $closeBtn.click(hideDropDown);
            $('.sidebar').on('mouseover', openBar);
            $sideBarItem.on('mouseenter', showDropDown);
            $sideBarItem.on('mouseleave', hideDropDown);
            $('.more_btn').click(showContainers);
            $('.less_btn').click(hideContainers);
        }
    };

    return {
        initialize: initialize
    };
});