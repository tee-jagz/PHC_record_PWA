FROM node:16-alpine AS build

ENV NODE_ENV development
ARG port
# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install
# Copy app files
COPY . .

RUN export PORT=${port} && yarn build

# production environment
FROM nginx:latest as production
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]