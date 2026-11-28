FROM mcr.microsoft.com/playwright:v1.62.0-noble

ENV CI=true

ENV LANG=C.UTF-8

ENV LC_ALL=C.UTF-8

ENV TZ=UTC

WORKDIR /workspace

COPY package.json package-lock.json ./

COPY packages ./packages

COPY tsconfig.test.json ./

RUN npm ci

COPY . .

USER 1000:1000
