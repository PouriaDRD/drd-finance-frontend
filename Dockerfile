# syntax=docker/dockerfile:1.7

FROM node:20-alpine

ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

EXPOSE 3000

CMD [
"sh",
"-c",
"if [ ! -d node_modules/next ]; then npm ci --prefer-offline --no-audit --no-fund; fi && npm run dev -- --hostname 0.0.0.0 --port 3000"
]