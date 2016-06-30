'use strict';

define([], function () {
        var GROUP_COLORS = ['#F54D33', '#106f52', '#55A8FC'];
        var TEST_SERVER_DATA = {
            mysql: [
                {
                    project   : "mysql",
                    name      : "mysql",
                    Command   : "containerpilot mysqld --console --log-bin=mysql-bin --log_slave_updates=ON --gtid-mode=ON --enforce-gtid-consistency=ON",
                    containers: [
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "3e9730335bd6c60d829461542ecfd4631164e66fb7778a1a8e326e1ed20d6e68",
                            ConsulId    : "mysql-primary-3e9730335bd6",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }/*,
                                 {
                                 Node       : "634a6b8c5f35",
                                 CheckID    : "mysql-backup-run",
                                 Name       : "mysql-backup-run",
                                 Status     : "passing",
                                 Notes      : "",
                                 Output     : "",
                                 ServiceID  : "",
                                 ServiceName: ""
                                 }*/
                            ],
                            IsPrimary   : true
                        }
                    ]
                }
            ],
            mysdccdsql: [
                {
                    project   : "mysql",
                    name      : "mysql",
                    Command   : "containerpilot mysqld --console --log-bin=mysql-bin --log_slave_updates=ON --gtid-mode=ON --enforce-gtid-consistency=ON",
                    containers: [
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        }
                    ]
                },
                {
                    project   : "mysql",
                    name      : "mysql",
                    Command   : "containerpilot mysqld --console --log-bin=mysql-bin --log_slave_updates=ON --gtid-mode=ON --enforce-gtid-consistency=ON",
                    containers: [
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        },
                        {
                            Id          : "3e9730335bd6c60d829461542ecfd4631164e66fb7778a1a8e326e1ed20d6e68",
                            ConsulId    : "mysql-primary-3e9730335bd6",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }/*,
                                 {
                                 Node       : "634a6b8c5f35",
                                 CheckID    : "mysql-backup-run",
                                 Name       : "mysql-backup-run",
                                 Status     : "passing",
                                 Notes      : "",
                                 Output     : "",
                                 ServiceID  : "",
                                 ServiceName: ""
                                 }*/
                            ],
                            IsPrimary   : true
                        },
                        {
                            Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e625",
                            ConsulId    : "mysql-026133d39143",
                            HealthChecks: [
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-026133d39143",
                                    Name       : "mysql-026133d39143",
                                    Status     : "passing",
                                    Notes      : "TTL for mysql set by containerpilot",
                                    Output     : "ok",
                                    ServiceID  : "mysql-026133d39143",
                                    ServiceName: "mysql"
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "serfHealth",
                                    Name       : "Serf Health Status",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "Agent alive and reachable",
                                    ServiceID  : "",
                                    ServiceName: ""
                                },
                                {
                                    Node       : "634a6b8c5f35",
                                    CheckID    : "mysql-backup-run",
                                    Name       : "mysql-backup-run",
                                    Status     : "passing",
                                    Notes      : "",
                                    Output     : "",
                                    ServiceID  : "",
                                    ServiceName: ""
                                }
                            ],
                            IsPrimary   : false
                        }
                    ]
                }
            ],
            mongodb: [ {
                project   : "mongodb",
                name      : "mongodb",
                Command   : "containerpilot mongodb --console --log-bin=mongodb-bin --log_slave_updates=ON --gtid-mode=ON --enforce-gtid-consistency=ON",
                containers: [
                    {
                        Id          : "026133d391436e14cbad44077895a27377c676bafcdf4421bc736d80f115e611",
                        ConsulId    : "mongodb-026133d39143",
                        HealthChecks: [
                            {
                                Node       : "634a6b8c5f35",
                                CheckID    : "mongodb-026133d39143",
                                Name       : "mongodb-026133d39143",
                                Status     : "passing",
                                Notes      : "TTL for mongodb set by containerpilot",
                                Output     : "ok",
                                ServiceID  : "mongodb-026133d39143",
                                ServiceName: "mongodb"
                            },
                            {
                                Node       : "634a6b8c5f35",
                                CheckID    : "serfHealth",
                                Name       : "Serf Health Status",
                                Status     : "passing",
                                Notes      : "",
                                Output     : "Agent alive and reachable",
                                ServiceID  : "",
                                ServiceName: ""
                            },
                            {
                                Node       : "634a6b8c5f35",
                                CheckID    : "mongodb-backup-run",
                                Name       : "mongodb-backup-run",
                                Status     : "passing",
                                Notes      : "",
                                Output     : "",
                                ServiceID  : "",
                                ServiceName: ""
                            }
                        ],
                        IsPrimary   : false
                    }, {
                        Id          : "3e9730335bd6c60d829461542ecfd4631164e66fb7778a1a8e326e1ed20d6e11",
                        ConsulId    : "mongodb-primary-3e9730335bd6",
                        HealthChecks: [
                            {
                                Node       : "634a6b8c5f35",
                                CheckID    : "mongodb-backup-run",
                                Name       : "mongodb-backup-run",
                                Status     : "passing",
                                Notes      : "",
                                Output     : "",
                                ServiceID  : "",
                                ServiceName: ""
                            }
                        ],
                        IsPrimary   : true
                    }
                ]
            }
            ]
        };

        return {
            GROUP_COLORS: GROUP_COLORS,
            TEST_SERVER_DATA: TEST_SERVER_DATA
        };
    }
);
