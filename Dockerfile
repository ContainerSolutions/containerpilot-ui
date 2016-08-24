FROM node:slim
COPY package.json /pilot-ui/
WORKDIR /pilot-ui
RUN npm install

COPY ./.bowerrc /pilot-ui/
COPY ./.eslintrc /pilot-ui/
COPY ./bower.json /pilot-ui/
RUN npm install -g bower
RUN apt-get update && apt-get install -yq git
RUN bower install --allow-root
COPY ./src /pilot-ui/src
ENV NODE_ENV=production
CMD npm start
EXPOSE 3000
