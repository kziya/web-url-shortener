FROM node:18-alpine as dependencies


WORKDIR /usr/src/app

COPY yarn.lock package.json ./
RUN apk add g++ make py3-pip

RUN yarn install --prod

# Production image, copy all the files and run next
FROM node:18-alpine as runner

ENV NODE_ENV production
ENV PORT 3000


WORKDIR /usr/src/app

# Copy installed dependencies from dependencies stage
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Copy built application files
COPY . ./

EXPOSE 3000

CMD ["node","main.js"]
