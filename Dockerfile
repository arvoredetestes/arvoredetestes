FROM node:16 as runner

RUN yarn global add pm2@5.1.2
RUN pm2 install typescript

WORKDIR /usr/src/app

FROM runner
COPY . .

WORKDIR /usr/src/app/packages/api
CMD ["pm2-runtime", "ecosystem.config.js", "--raw"]

EXPOSE $PORT
