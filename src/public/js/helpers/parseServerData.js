'use strict';
define([], function () {
    var PARSER = (function () {
        'use strict';

        function connectCheckPoints(checkpoints, dataset) {
            var j;
            var i;

            for (i = checkpoints.length; i--;) {

                for (j = checkpoints.length; j--;) {

                    if (!(dataset.nodes[checkpoints[i]].name === dataset.nodes[checkpoints[j]].name)) {

                        var edgeObj = {
                            source: dataset.nodes[checkpoints[i]].name,
                            target: dataset.nodes[checkpoints[j]].name,
                            type  : 0
                        };

                        if (dataset.nodes[checkpoints[i]].megagroup === dataset.nodes[checkpoints[j]].megagroup) {
                            edgeObj.type = 1;
                        }

                        dataset.edges.push(edgeObj)
                    }
                }
            }
        }

        function connectSubgroupPoints(checkpoints, dataset) {
            var j;
            var i;

            for (i = checkpoints.length; i--;) {

                for (j = checkpoints.length; j--;) {

                    if (!(dataset.nodes[checkpoints[i]].name === dataset.nodes[checkpoints[j]].name)) {

                        var edgeObj = {
                            source: dataset.nodes[checkpoints[i]].name,
                            target: dataset.nodes[checkpoints[j]].name,
                            type  : 0
                        };
                    }

                    if (edgeObj) {
                        dataset.edges.push(edgeObj);
                    }
                }
            }
        }

        function parseData(serverData, colorShema, callback) {
            var dataset = {
                nodes: [],
                edges: []
            };
            var keys = Object.keys(serverData);
            var servDataLength = keys.length;
            var checkpoints = [];
            var groupsCount = [];
            var counter = 0;
            var controlItemsData = [];
            var subGroupCounter = 0;
            var controlObj;
            var nodeEl;
            var m;
            var i;
            var j;

            for (i = servDataLength; i--;) {

                groupsCount.push(serverData[keys[i]].length);

                controlObj = {
                    name: serverData[keys[i]][0].name,
                    type: 'el_2',
                    info: colorShema[serverData[keys[i]][0].name].main
                };

                for (j = serverData[keys[i]].length; j--;) {

                    for (m = serverData[keys[i]][j].containers.length; m--;) {

                        nodeEl = {
                            sbCountId   : subGroupCounter,
                            isCheckPoint: false,
                            name        : counter,
                            consulId    : serverData[keys[i]][j].containers[m].ConsulId,
                            type        : "el_2",
                            group       : j,
                            megagroup   : i,
                            shadow      : '#F15A24',
                            info        : colorShema[serverData[keys[i]][0].name].main,
                            text        : serverData[keys[i]][j].name + ' replica',
                            belongTo    : serverData[keys[i]][j].name
                        };

                        if (m === 0) {
                            nodeEl.isCheckPoint = true;
                        }

                        dataset.nodes.push(nodeEl);
                        counter++;
                    }

                    subGroupCounter++;
                }

                controlItemsData.push(controlObj);
            }

            for (i = dataset.nodes.length; i--;) {

                if (dataset.nodes[i].isCheckPoint) {

                    checkpoints.push(i);
                }
            }

            connectCheckPoints(checkpoints, dataset);
            checkpoints = [];

            for (i = subGroupCounter; i--;) {

                checkpoints.push([]);
            }

            for (j = dataset.nodes.length; j--;) {

                var sbIndex = dataset.nodes[j].sbCountId;

                (checkpoints[sbIndex]).push(j)
            }

            for (i = checkpoints.length; i--;) {

                connectSubgroupPoints(checkpoints[i], dataset)
            }

            return callback({
                dataset         : dataset,
                groupsCount     : groupsCount,
                controlItemsData: controlItemsData
            });

        }

        return {
            parseData: parseData
        };
    })();

    return PARSER;
});