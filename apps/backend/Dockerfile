FROM node:24-alpine

WORKDIR /app

# Enable corepack to use pnpm
RUN corepack enable

# Keep Prisma on the native binary engine
ENV PRISMA_CLIENT_ENGINE_TYPE=library
# Provide a default DB URL for prisma generate during build (compose overrides at runtime)
ARG DATABASE_URL=postgres://postgres:postgres@postgres:5432/ai_chatbot
ENV DATABASE_URL=${DATABASE_URL}

# Copy only manifests for install layer
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY apps/backend/package.json apps/backend/tsconfig.json apps/backend/prisma ./apps/backend/
COPY packages/shared/package.json packages/shared/tsconfig.json ./packages/shared/

# Install only the workspaces we need (backend + shared)
RUN pnpm install --frozen-lockfile

# Copy source code for backend and shared (avoid pulling frontend into the image)
COPY apps/backend/src ./apps/backend/src
COPY apps/backend/prisma ./apps/backend/prisma
COPY packages/shared/src ./packages/shared/src

# Generate Prisma client inside the image
RUN pnpm --filter ai-chatbot-backend exec prisma generate

EXPOSE 3001

CMD ["pnpm", "--filter", "ai-chatbot-backend", "dev"]
