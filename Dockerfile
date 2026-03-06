FROM node:22-alpine AS base
WORKDIR /usr/src/app
RUN chown node:node /usr/src/app
USER node

FROM base AS prod-deps
COPY --chown=node:node package*.json .
RUN npm ci --omit-dev --verbose

FROM base AS dev-deps
COPY --chown=node:node package*.json .
RUN npm ci --verbose

FROM base AS prod-builder
COPY --chown=node:node --from=dev-deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node package.json .
COPY --chown=node:node src ./src
RUN npm run build

FROM base AS prod-runner
COPY --chown=node:node --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=prod-builder /usr/src/app/build ./build
COPY --chown=node:node package.json .
CMD [ "npm", "run", "start" ]

FROM base AS dev-runner
COPY --chown=node:node --from=dev-deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
CMD [ "npm", "run", "dev" ]