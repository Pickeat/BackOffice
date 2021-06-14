
# stage1 - build react app first
FROM node:16-alpine as build
ARG api_url
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_URL=$api_url
COPY ./package.json /app/
RUN npm install
COPY . /app
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.21.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
