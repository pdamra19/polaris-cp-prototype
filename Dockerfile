# Using public node image from AWS to avoid docker hub limits on free accts
FROM --platform=linux/amd64 public.ecr.aws/bitnami/node:16 as development

### Build for development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

# Install development packages so we can build and test
COPY package.json package-lock.json tsconfig.build.json tsconfig.json ./
RUN npm ci

# Copy the files from the local environment, node_modules excluded in .dockerignore
COPY . .

# Transpile TS to JS
RUN npm run build

# -----------------------------------------------------------------------

### Build for test
FROM development as test

## Build for test
ARG NODE_ENV=test
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

# Copy the installed and built files from the development stage
COPY --from=development /usr/src/app ./

# Tests must pass for the docker build to complete successfully
RUN npm run test -- --passWithNoTests

# -----------------------------------------------------------------------

### Build for production
FROM development as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the transpiled build files from the development stage
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/src/main"]

