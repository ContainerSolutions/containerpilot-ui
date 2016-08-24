'use strict';

define(['hash'], function (hash) {
        function writeNewState(serverData, groupsState) {
            groupsState.groupCount = Object.keys(serverData).length;
            groupsState.serverData = serverData;
            groupsState.serverDataHash = hash(serverData);
        }

        var CheckGroupState = function (serverData, groupsState, drawingsActions) {
            var containersIdForRemove = [];
            var containersForAdd = [];
            var currentGroup;
            var id;

            function containerExists(dataSource, groupName, id) {
                var serverGroup = dataSource[groupName];

                for (var i = serverGroup.length - 1; i >= 0; i--) {
                    for (var j = serverGroup[0].containers.length - 1; j >= 0; j--) {
                        if (id === serverGroup[0].containers[j].Id) {
                            return true;
                        }
                    }
                }
            }

            if (groupsState.groupCount === 0 && Object.keys(serverData).length) {
                writeNewState(serverData, groupsState);
                //alert('First render');
                return drawingsActions.renderAll();
            }

            if (groupsState.groupCount !== Object.keys(serverData).length) {
                writeNewState(serverData, groupsState);
                alert('Need Render, different Group count');
                return drawingsActions.renderAll();
            }

            // ---- detecting changes in object
            if (groupsState.serverDataHash !== hash(serverData)) {

                //TODO check if any container  removed

                Object.keys(groupsState.serverData).forEach(function (groupName) {
                    currentGroup = groupsState.serverData[groupName];

                    for (var i = currentGroup.length - 1; i >= 0; i--) {
                        for (var j = currentGroup[0].containers.length - 1; j >= 0; j--) {
                            id = currentGroup[0].containers[j].Id;

                            if (!containerExists(serverData,groupName, id)) {
                                containersIdForRemove.push(id);
                            }
                        }
                    }

                });

                if (containersIdForRemove.length){
                    alert('Containers were removed: ' + containersIdForRemove);
                }

                //TODO check if container added

                Object.keys(serverData).forEach(function (groupName) {
                    currentGroup = serverData[groupName];

                    for (var i = currentGroup.length - 1; i >= 0; i--) {
                        for (var j = currentGroup[0].containers.length - 1; j >= 0; j--) {
                            id = currentGroup[0].containers[j].Id;

                            if (!containerExists(groupsState.serverData,groupName, id)) {
                                containersForAdd.push(id);
                            }
                        }
                    }

                });

                if (containersForAdd.length){
                    alert('Containers were added: ' + containersForAdd);
                }

                writeNewState(serverData, groupsState);
                //alert('Need Render, Detect Changes');
                return drawingsActions.renderAll();
            }

        };
        return CheckGroupState;
    }
);
