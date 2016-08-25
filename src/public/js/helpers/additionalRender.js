'use strict';
define(['jQuery', 'd3'], function ($, d3) {

        var AdditionalRender = function () {
            
            this.renderSidebar = function (serverData, colorShema) {
                var parsedData = [];
                var keys = Object.keys(serverData);
                var i;

                for (i = keys.length; i--;) {
                    parsedData.push({
                        name : keys[i],
                        color: colorShema[keys[i]],
                        type : 'database',
                        info : 'all kinds of other info about tehe service'
                    })
                }

                var sidebar = d3.select('.sidebar ');

                for (var j = 0; j < parsedData.length; j++){

                    sidebar.append('div')
                        .attr({class: 'single_item'})
                        .append('a')
                        .attr({href: '#'})
                        .html(parsedData[j].name)
                        .append('span')
                        .attr({class: 'status'})
                        .style('background-color', colorShema[parsedData[j].name].main);

                    var infoblock = sidebar.append('div')
                        .attr({class: 'info_block'});

                    infoblock.append('span')
                        .text('type: ' + parsedData[j].type);

                    infoblock.append('p')
                        .attr({class: 'less'})
                        .text(parsedData[j].info);

                    infoblock.append('span')
                        .attr({
                            class: 'less_btn hide',
                            'data-type': parsedData[j].name
                        })
                        .text('less...');

                    infoblock.append('span')
                        .attr({
                            class: 'more_btn',
                            'data-type': parsedData[j].name
                        })
                        .text('more...');
                }
                
                return this;
            };

            this.renderControls = function (controlItemsData, dots, dx, dy, callback){
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
                        'class': function(d){
                            return d.name +' controlLabel'
                        },
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

                //isDrawn = true;
                $('.loader').hide();

                return callback(true);
            };

            this.renderInfoText = function (dx, dy){
                var $infoCircles = $('.info_holder');
                var infoArray = [];

                $infoCircles.each(function () {
                    var circle = d3.select(this);

                    infoArray.push({
                        left: parseFloat(circle.node().getBBox().x) + parseFloat(dx) + 119,
                        top: parseFloat(circle.node().getBBox().y) + parseFloat(dy) + 42,
                        text: circle.datum().text,
                        name: circle.datum().belongTo
                    })
                });

                d3.select('.svg_wrapper')
                    .selectAll('.divText')
                    .data(infoArray)
                    .enter()
                    .append('div')
                    .attr({
                        'class': function(d){
                            return d.name + ' nodeInfoText';
                        }
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
                
                return this;
            }
        };

        return {
            AdditionalRender: AdditionalRender
        };
});
