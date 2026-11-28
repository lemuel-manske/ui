FROM mcr.microsoft.com/playwright:v1.62.0-noble

ARG UID=1000

ARG GID=1000

ENV CI=true

ENV LANG=C.UTF-8

ENV LC_ALL=C.UTF-8

ENV TZ=UTC

RUN groupadd --gid ${GID} playwright || true && \
    useradd --uid ${UID} --gid playwright --create-home playwright || true

WORKDIR /workspace

COPY package.json package-lock.json ./

COPY packages ./packages

COPY tsconfig.test.json ./

RUN npm ci

COPY . .

USER playwright
