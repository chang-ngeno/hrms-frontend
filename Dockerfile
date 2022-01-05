FROM node:12.4.0-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# RUN npx browserslist@latest --update-db
RUN npm run build

# Changing from nginx to ng serve: Start
# Stage 2 serving with nginx
FROM nginx:1.17.0-alpine

COPY --from=build /app/build /var/www

COPY nginx.conf /etc/nginx/nginx.conf
# Changing: end

# RUN npm install -g serve
# RUN serve -s build

# EXPOSE 3000
EXPOSE 80

ENTRYPOINT [ "nginx","-g","daemon off;" ]
# ENTRYPOINT [ "serve", "-s", "build" ]