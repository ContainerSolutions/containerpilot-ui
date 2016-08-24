'use strict';

define([], function () {
        var GROUP_COLORS = ['#F54D33', '#C52CCE', '#FAFF05'];
        var TEST_SERVER_DATA = {
            "memcached": [
                {
                    "project"   : "wordpress",
                    "name"      : "memcached",
                    "Command"   : "/usr/local/bin/containerpilot memcached -l 0.0.0.0",
                    "containers": [
                        {
                            "Id"          : "c07a7c4b10d25a5d603d798cde479b4fb84d6a63cda8ba7dee36fc67e4a3ff10",
                            "ConsulId"    : "memcached-c07a7c4b10d2",
                            "HealthChecks": [{
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "memcached-bcc6308393c5",
                                "Name"       : "memcached-bcc6308393c5",
                                "Status"     : "passing",
                                "Notes"      : "TTL for memcached set by containerpilot",
                                "Output"     : "ok",
                                "ServiceID"  : "memcached-bcc6308393c5",
                                "ServiceName": "memcached"
                            }, {
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "serfHealth",
                                "Name"       : "Serf Health Status",
                                "Status"     : "passing",
                                "Notes"      : "",
                                "Output"     : "Agent alive and reachable",
                                "ServiceID"  : "",
                                "ServiceName": ""
                            }, {
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "mysql-backup-run",
                                "Name"       : "mysql-backup-run",
                                "Status"     : "passing",
                                "Notes"      : "",
                                "Output"     : "",
                                "ServiceID"  : "",
                                "ServiceName": ""
                            }],
                            "IsPrimary"   : false
                        },
                        {
                            "Id"          : "bc2a82e9c2986d3db0a7b2b4c56b8212d1e34776012ed904a8bd02952da54318",
                            "ConsulId"    : "memcached-bc2a82e9c298",
                            "HealthChecks": [{
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "memcached-bcc6308393c5",
                                "Name"       : "memcached-bcc6308393c5",
                                "Status"     : "passing",
                                "Notes"      : "TTL for memcached set by containerpilot",
                                "Output"     : "ok",
                                "ServiceID"  : "memcached-bcc6308393c5",
                                "ServiceName": "memcached"
                            }, {
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "serfHealth",
                                "Name"       : "Serf Health Status",
                                "Status"     : "passing",
                                "Notes"      : "",
                                "Output"     : "Agent alive and reachable",
                                "ServiceID"  : "",
                                "ServiceName": ""
                            }, {
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "mysql-backup-run",
                                "Name"       : "mysql-backup-run",
                                "Status"     : "passing",
                                "Notes"      : "",
                                "Output"     : "",
                                "ServiceID"  : "",
                                "ServiceName": ""
                            }],
                            "IsPrimary"   : false
                        },
                        {
                            "Id"          : "bcc6308393c5d61090c039d49a411c768eaf84c102282969af04a76944592414",
                            "ConsulId"    : "memcached-bcc6308393c5",
                            "HealthChecks": [{
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "memcached-bcc6308393c5",
                                "Name"       : "memcached-bcc6308393c5",
                                "Status"     : "passing",
                                "Notes"      : "TTL for memcached set by containerpilot",
                                "Output"     : "ok",
                                "ServiceID"  : "memcached-bcc6308393c5",
                                "ServiceName": "memcached"
                            }, {
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "serfHealth",
                                "Name"       : "Serf Health Status",
                                "Status"     : "passing",
                                "Notes"      : "",
                                "Output"     : "Agent alive and reachable",
                                "ServiceID"  : "",
                                "ServiceName": ""
                            }, {
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "mysql-backup-run",
                                "Name"       : "mysql-backup-run",
                                "Status"     : "passing",
                                "Notes"      : "",
                                "Output"     : "",
                                "ServiceID"  : "",
                                "ServiceName": ""
                            }],
                            "IsPrimary"   : false
                        }
                    ]
                },
                {
                    "project"   : "wordpress",
                    "name"      : "memcached",
                    "Command"   : "/usr/local/bin/containerpilot memcached -l 0.0.0.0",
                    "containers": [
                        {
                            "Id"          : "c07a7c4b10d25a5d603d798cde479b4fb84d6a63cda8ba7dee36fc67e4a3ff10",
                            "ConsulId"    : "memcached-c07a7c4b10d2",
                            "HealthChecks": [{
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "memcached-bcc6308393c5",
                                "Name"       : "memcached-bcc6308393c5",
                                "Status"     : "passing",
                                "Notes"      : "TTL for memcached set by containerpilot",
                                "Output"     : "ok",
                                "ServiceID"  : "memcached-bcc6308393c5",
                                "ServiceName": "memcached"
                            }, {
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "serfHealth",
                                "Name"       : "Serf Health Status",
                                "Status"     : "passing",
                                "Notes"      : "",
                                "Output"     : "Agent alive and reachable",
                                "ServiceID"  : "",
                                "ServiceName": ""
                            }, {
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "mysql-backup-run",
                                "Name"       : "mysql-backup-run",
                                "Status"     : "passing",
                                "Notes"      : "",
                                "Output"     : "",
                                "ServiceID"  : "",
                                "ServiceName": ""
                            }],
                            "IsPrimary"   : false
                        },
                        {
                            "Id"          : "bc2a82e9c2986d3db0a7b2b4c56b8212d1e34776012ed904a8bd02952da54318",
                            "ConsulId"    : "memcached-bc2a82e9c298",
                            "HealthChecks": [{
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "memcached-bcc6308393c5",
                                "Name"       : "memcached-bcc6308393c5",
                                "Status"     : "passing",
                                "Notes"      : "TTL for memcached set by containerpilot",
                                "Output"     : "ok",
                                "ServiceID"  : "memcached-bcc6308393c5",
                                "ServiceName": "memcached"
                            }, {
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "serfHealth",
                                "Name"       : "Serf Health Status",
                                "Status"     : "passing",
                                "Notes"      : "",
                                "Output"     : "Agent alive and reachable",
                                "ServiceID"  : "",
                                "ServiceName": ""
                            }, {
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "mysql-backup-run",
                                "Name"       : "mysql-backup-run",
                                "Status"     : "passing",
                                "Notes"      : "",
                                "Output"     : "",
                                "ServiceID"  : "",
                                "ServiceName": ""
                            }],
                            "IsPrimary"   : false
                        },
                        {
                            "Id"          : "bcc6308393c5d61090c039d49a411c768eaf84c102282969af04a76944592414",
                            "ConsulId"    : "memcached-bcc6308393c5",
                            "HealthChecks": [{
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "memcached-bcc6308393c5",
                                "Name"       : "memcached-bcc6308393c5",
                                "Status"     : "passing",
                                "Notes"      : "TTL for memcached set by containerpilot",
                                "Output"     : "ok",
                                "ServiceID"  : "memcached-bcc6308393c5",
                                "ServiceName": "memcached"
                            }, {
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "serfHealth",
                                "Name"       : "Serf Health Status",
                                "Status"     : "passing",
                                "Notes"      : "",
                                "Output"     : "Agent alive and reachable",
                                "ServiceID"  : "",
                                "ServiceName": ""
                            }, {
                                "Node"       : "1eb2154b979a",
                                "CheckID"    : "mysql-backup-run",
                                "Name"       : "mysql-backup-run",
                                "Status"     : "passing",
                                "Notes"      : "",
                                "Output"     : "",
                                "ServiceID"  : "",
                                "ServiceName": ""
                            }],
                            "IsPrimary"   : false
                        }
                    ]
                }
            ]
        };

        return {
            GROUP_COLORS    : GROUP_COLORS,
            TEST_SERVER_DATA: TEST_SERVER_DATA
        };
    }
);
