# Build stage
FROM node:14 as build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Production stage
FROM node:14 as production
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production
COPY --from=build ./app/dist ./dist
CMD ["yarn", "start:prod"]