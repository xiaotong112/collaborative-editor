FROM node:18-alpine AS builder
WORKDIR /workspace

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/backend ./apps/backend

RUN pnpm install --filter ./apps/backend --no-frozen-lockfile

RUN if grep -q '"build"' apps/backend/package.json 2>/dev/null; then pnpm --filter ./apps/backend run build; fi

FROM node:18-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm && addgroup -S app && adduser -S -G app app

COPY --from=builder /workspace/apps/backend/package.json ./package.json
COPY --from=builder /workspace/node_modules ./node_modules

ARG BUILD_DIR=apps/backend/dist
COPY --from=builder /workspace/${BUILD_DIR} ./dist

ENV NODE_ENV=production
EXPOSE 3001

USER app

CMD ["pnpm", "start"]
