FROM node:16 As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --legacy-peer-deps

COPY --chown=node:node . .

USER node

FROM node:16 As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build
#You can run unit tests here, if you don't whant to push broken prod image. but better to do it in CircleCI/Github actions etc.
RUN npm run test

ENV NODE_ENV production

RUN npm ci --omit=dev --legacy-peer-deps && npm cache clean --force

USER node

FROM node:16 As production

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/src/main.js" ]