'use strict';

define([], function () {
    var GROUP_COLORS = {
        prometheus: {
            main: '#A35889'
        },
        nfs: {
            main: '#C1E2E7'
        },
        mysql: {
            main: '#6659DE'
        },
        nginx: {
            main: '#E34C4C'
        },
        memcached: {
            main: '#86AD46'
        },
        consul: {
            main: '#FEA180'
        },
        mongodb: {
            main: '#F15A24'
        }
    };
    var TEST_SERVER_DATA = {
        "prometheus": [
            {
                "project"   : "wordpress",
                "name"      : "prometheus",
                "Command"   : "/bin/containerbuddy /bin/prometheus -config.file=/etc/prometheus/prometheus.yml -storage.local.path=/prometheus -web.console.libraries=/etc/prometheus/console_libraries -web.console.templates=/etc/prometheus/consoles",
                "containers": [
                    {
                        "Id"          : "d5ed69d154b3961a2a26ae4d79c7ef724ba28bd8a9048404aa64c67a14869850",
                        "ConsulId"    : "prometheus-d5ed69d154b3",
                        "HealthChecks": [{
                            "Node"       : "9d772c5747c7",
                            "CheckID"    : "mysql-backup-run",
                            "Name"       : "mysql-backup-run",
                            "Status"     : "passing",
                            "Notes"      : "",
                            "Output"     : "",
                            "ServiceID"  : "",
                            "ServiceName": "",
                            "CreateIndex": 23,
                            "ModifyIndex": 24
                        }, {
                            "Node"       : "9d772c5747c7",
                            "CheckID"    : "prometheus-d5ed69d154b3",
                            "Name"       : "prometheus-d5ed69d154b3",
                            "Status"     : "passing",
                            "Notes"      : "TTL for prometheus set by containerbuddy",
                            "Output"     : "",
                            "ServiceID"  : "prometheus-d5ed69d154b3",
                            "ServiceName": "prometheus",
                            "CreateIndex": 16,
                            "ModifyIndex": 20
                        }, {
                            "Node"       : "9d772c5747c7",
                            "CheckID"    : "serfHealth",
                            "Name"       : "Serf Health Status",
                            "Status"     : "passing",
                            "Notes"      : "",
                            "Output"     : "Agent alive and reachable",
                            "ServiceID"  : "",
                            "ServiceName": "",
                            "CreateIndex": 3,
                            "ModifyIndex": 3
                        }],
                        "IsPrimary"   : false
                    }
                ]
            }
        ],
        "nfs"       : [{
            "project"   : "wordpress",
            "name"      : "nfs",
            "Command"   : "/usr/local/bin/containerpilot node /opt/nfs/node_modules/sdc-nfs/server.js -f /etc/sdc-nfs.json",
            "containers": [{
                "Id"          : "ae78b4a3a2337b268ece8b1d88b7d82fe8b7bd17de89bb0ee96c65064e872168",
                "ConsulId"    : "nfs-ae78b4a3a233",
                "HealthChecks": [{
                    "Node"       : "9d772c5747c7",
                    "CheckID"    : "mysql-backup-run",
                    "Name"       : "mysql-backup-run",
                    "Status"     : "passing",
                    "Notes"      : "",
                    "Output"     : "",
                    "ServiceID"  : "",
                    "ServiceName": "",
                    "CreateIndex": 23,
                    "ModifyIndex": 24
                }, {
                    "Node"       : "9d772c5747c7",
                    "CheckID"    : "nfs-ae78b4a3a233",
                    "Name"       : "nfs-ae78b4a3a233",
                    "Status"     : "passing",
                    "Notes"      : "TTL for nfs set by containerpilot",
                    "Output"     : "",
                    "ServiceID"  : "nfs-ae78b4a3a233",
                    "ServiceName": "nfs",
                    "CreateIndex": 8,
                    "ModifyIndex": 11
                }, {
                    "Node"       : "9d772c5747c7",
                    "CheckID"    : "serfHealth",
                    "Name"       : "Serf Health Status",
                    "Status"     : "passing",
                    "Notes"      : "",
                    "Output"     : "Agent alive and reachable",
                    "ServiceID"  : "",
                    "ServiceName": "",
                    "CreateIndex": 3,
                    "ModifyIndex": 3
                }],
                "IsPrimary"   : false
            }]
        }],
        "mysql"     : [{
            "project"   : "wordpress",
            "name"      : "mysql",
            "Command"   : "containerpilot mysqld --console --log-bin=mysql-bin --log_slave_updates=ON --gtid-mode=ON --enforce-gtid-consistency=ON",
            "containers": [{
                "Id"          : "311e7e91565e2670a64bfe926a8f8d5c7e4b3f5a57f44f2493de73d9c15c151e",
                "ConsulId"    : "mysql-primary-311e7e91565e",
                "HealthChecks": [{
                    "Node"       : "9d772c5747c7",
                    "CheckID"    : "mysql-backup-run",
                    "Name"       : "mysql-backup-run",
                    "Status"     : "passing",
                    "Notes"      : "",
                    "Output"     : "",
                    "ServiceID"  : "",
                    "ServiceName": "",
                    "CreateIndex": 23,
                    "ModifyIndex": 24
                }, {
                    "Node"       : "9d772c5747c7",
                    "CheckID"    : "mysql-primary-311e7e91565e",
                    "Name"       : "mysql-primary-311e7e91565e",
                    "Status"     : "passing",
                    "Notes"      : "TTL for mysql-primary set by containerpilot",
                    "Output"     : "",
                    "ServiceID"  : "mysql-primary-311e7e91565e",
                    "ServiceName": "mysql-primary",
                    "CreateIndex": 33,
                    "ModifyIndex": 34
                }, {
                    "Node"       : "9d772c5747c7",
                    "CheckID"    : "serfHealth",
                    "Name"       : "Serf Health Status",
                    "Status"     : "passing",
                    "Notes"      : "",
                    "Output"     : "Agent alive and reachable",
                    "ServiceID"  : "",
                    "ServiceName": "",
                    "CreateIndex": 3,
                    "ModifyIndex": 3
                }],
                "IsPrimary"   : true
            }]
        }],
        "nginx"     : [{
            "project"   : "wordpress",
            "name"      : "nginx",
            "Command"   : "/usr/local/bin/containerpilot nginx -g 'daemon off;'",
            "containers": [{
                "Id"          : "cc782c8f2fa47b3f8c3d85f69b182151695d707849409c6075dec30dd5965d30",
                "ConsulId"    : "nginx-cc782c8f2fa4",
                "HealthChecks": [{
                    "Node"       : "9d772c5747c7",
                    "CheckID"    : "mysql-backup-run",
                    "Name"       : "mysql-backup-run",
                    "Status"     : "passing",
                    "Notes"      : "",
                    "Output"     : "",
                    "ServiceID"  : "",
                    "ServiceName": "",
                    "CreateIndex": 23,
                    "ModifyIndex": 24
                }, {
                    "Node"       : "9d772c5747c7",
                    "CheckID"    : "nginx-cc782c8f2fa4",
                    "Name"       : "nginx-cc782c8f2fa4",
                    "Status"     : "passing",
                    "Notes"      : "TTL for nginx set by containerpilot",
                    "Output"     : "",
                    "ServiceID"  : "nginx-cc782c8f2fa4",
                    "ServiceName": "nginx",
                    "CreateIndex": 13,
                    "ModifyIndex": 18
                }, {
                    "Node"       : "9d772c5747c7",
                    "CheckID"    : "serfHealth",
                    "Name"       : "Serf Health Status",
                    "Status"     : "passing",
                    "Notes"      : "",
                    "Output"     : "Agent alive and reachable",
                    "ServiceID"  : "",
                    "ServiceName": "",
                    "CreateIndex": 3,
                    "ModifyIndex": 3
                }],
                "IsPrimary"   : false
            }]
        }],
        "memcached" : [
            {
                "project"   : "wordpress",
                "name"      : "memcached",
                "Command"   : "/usr/local/bin/containerpilot memcached -l 0.0.0.0",
                "containers": [{
                    "Id"          : "1fd95c7928f70f1852e51934fd1f235cdeb40c009cbd4952705f9ed9eb453e13",
                    "ConsulId"    : "memcached-1fd95c7928f7",
                    "HealthChecks": [{
                        "Node"       : "9d772c5747c7",
                        "CheckID"    : "memcached-1fd95c7928f7",
                        "Name"       : "memcached-1fd95c7928f7",
                        "Status"     : "passing",
                        "Notes"      : "TTL for memcached set by containerpilot",
                        "Output"     : "",
                        "ServiceID"  : "memcached-1fd95c7928f7",
                        "ServiceName": "memcached",
                        "CreateIndex": 10,
                        "ModifyIndex": 17
                    }, {
                        "Node"       : "9d772c5747c7",
                        "CheckID"    : "mysql-backup-run",
                        "Name"       : "mysql-backup-run",
                        "Status"     : "passing",
                        "Notes"      : "",
                        "Output"     : "",
                        "ServiceID"  : "",
                        "ServiceName": "",
                        "CreateIndex": 23,
                        "ModifyIndex": 24
                    }, {
                        "Node"       : "9d772c5747c7",
                        "CheckID"    : "serfHealth",
                        "Name"       : "Serf Health Status",
                        "Status"     : "passing",
                        "Notes"      : "",
                        "Output"     : "Agent alive and reachable",
                        "ServiceID"  : "",
                        "ServiceName": "",
                        "CreateIndex": 3,
                        "ModifyIndex": 3
                    }],
                    "IsPrimary"   : false
                }]
            }],
        "consul"    : [{
            "project"   : "wordpress",
            "name"      : "consul",
            "Command"   : "/usr/local/bin/containerpilot /bin/consul agent -server -bootstrap -config-dir=/etc/consul -ui-dir /ui",
            "containers": [{
                "Id"          : "9d772c5747c7aa24e9739581dd19c84a98d4508c7f852816b1f0e92f65b0160d",
                "ConsulId"    : "consul-9d772c5747c7",
                "HealthChecks": [{
                    "Node"       : "9d772c5747c7",
                    "CheckID"    : "mysql-backup-run",
                    "Name"       : "mysql-backup-run",
                    "Status"     : "passing",
                    "Notes"      : "",
                    "Output"     : "",
                    "ServiceID"  : "",
                    "ServiceName": "",
                    "CreateIndex": 23,
                    "ModifyIndex": 24
                }, {
                    "Node"       : "9d772c5747c7",
                    "CheckID"    : "serfHealth",
                    "Name"       : "Serf Health Status",
                    "Status"     : "passing",
                    "Notes"      : "",
                    "Output"     : "Agent alive and reachable",
                    "ServiceID"  : "",
                    "ServiceName": "",
                    "CreateIndex": 3,
                    "ModifyIndex": 3
                }],
                "IsPrimary"   : false
            }]
        }]
    };

    return {
        GROUP_COLORS    : GROUP_COLORS,
        TEST_SERVER_DATA: TEST_SERVER_DATA
    };
});