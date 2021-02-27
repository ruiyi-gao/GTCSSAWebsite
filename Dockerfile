FROM node:14

WORKDIR /app

ENV PGDATABASE cssa
ENV PGUSER postgres
ENV PGHOST postgres
ENV REDIS_URL "redis://redis"
ENV CSSA_SERVER_PORT 80

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ADD package.json yarn.lock /app/
RUN yarn install --frozen-lockfile --production
ADD . /app

EXPOSE 80

CMD ["yarn", "--silent", "start:production"]
