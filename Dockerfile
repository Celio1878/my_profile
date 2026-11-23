FROM oven/bun:1 AS dependencies-env
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS build-env
WORKDIR /app
COPY --from=dependencies-env /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1-slim
WORKDIR /app
ENV NODE_ENV=production
COPY package.json bun.lock ./
COPY --from=dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build
COPY --from=build-env /app/public ./public
EXPOSE 3000
CMD ["bun", "run", "start"]
