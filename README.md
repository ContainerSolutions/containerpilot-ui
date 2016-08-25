# container-solutions

## Summary

More summary be available later...

## How to use it?

* First of all run from shell:

```
    npm install
```
* And then install bower:

```
    npm install -g bower
```

* And then install packages for web:

```
    bower install
```


* And then start server with:

```
    npm start
```

by default server will be available at ` http://localhost:3000 ` 

* Run test:

```
    npm test
```

* Write coverage:

```
    npm run coverage
```

## Environment variables

```
    PORT || 3000
    LOG_LEVEL || 'info'
    NODE_ENV || 'test'
    CONSUL_API_HOST || '172.17.0.3'
    CONSUL_API_PORT || '8500'
    DOCKER_REMOTE_API_HOST || '/var/run/docker.sock'
```

## Fiddle with it locally.

1. Clone the wordpress git repo.
  ```
  git clone https://github.com/autopilotpattern/wordpress.git
  ```
2. Run docker-compose.
  ```
  cd wordpress
  docker-compose -f local-compose.yml up
  ```

3. Get the Consul IP address:
   ```
   export CONSUL_API_HOST=`docker inspect  -f '{{.NetworkSettings.Networks.bridge.IPAddress}}' wordpress_consul_1`; echo $CONSUL_API_HOST
   ```
4. Build & run containerpilot-ui container.
  ```
    docker build -t containerpilot-ui . && docker run --rm -t -i -e CONSUL_API_HOST="$CONSUL_API_HOST" -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 containerpilot-ui 
  ```
