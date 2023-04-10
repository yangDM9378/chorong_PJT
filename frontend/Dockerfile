FROM node:alpine as build-stage
WORKDIR /var/jenkins_home/workspace/chorongddara/frontend
COPY ./package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /var/jenkins_home/workspace/chorongddara/frontend/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/chorongddara/frontend/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g","daemon off;"]
