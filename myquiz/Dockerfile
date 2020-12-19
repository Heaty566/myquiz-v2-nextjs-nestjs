FROM node:12-slim AS builder

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn run build


FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["yarn", "run", "start:prod"]
