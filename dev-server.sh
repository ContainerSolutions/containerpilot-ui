#!/usr/bin/env bash
echo "Building development container..."
ID=`docker build -q -f Dockerfile.dev .`
echo "Done!"

if [[ "x$CONSUL_API_HOST" == "x" ]]; then
  echo "Must set CONSUL_API_HOST. See README.md"
  echo "If you're using the wordpress thing, run: "
  echo export CONSUL_API_HOST=\`docker inspect  -f '{{.NetworkSettings.Networks.bridge.IPAddress}}' wordpress_consul_1\`\; echo \$CONSUL_API_HOST
  exit 1
fi

if [[ $? == 0 ]]; then
  docker run --rm -t -i -v `pwd`:/pilot-ui  -e CONSUL_API_HOST="$CONSUL_API_HOST" -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 $ID
else
  echo "Some error occured!"
fi
