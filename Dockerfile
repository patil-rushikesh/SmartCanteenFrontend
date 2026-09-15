FROM node:26-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:stable-alpine AS runtime
RUN apk add --no-cache jq
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY scripts/40-runtime-env.sh /docker-entrypoint.d/40-runtime-env.sh
RUN chmod +x /docker-entrypoint.d/40-runtime-env.sh
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
