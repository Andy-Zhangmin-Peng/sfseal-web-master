FROM node:13 as builder
WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build
RUN apt-get update
RUN apt-get install net-tools
FROM nginx:1.17

# COPY certificate/unicloud.cer /home/centos/unicloud.cer
# COPY certificate/unicloud.key /home/centos/unicloud.key
COPY --from=builder /usr/src/app/dist/qucamp-admin-ui /usr/share/nginx/html
COPY ./nginx-angular.conf /etc/nginx/conf.d/default.conf

COPY start.sh /home/centos/start.sh

RUN chmod +x /home/centos/start.sh
CMD [ "/home/centos/start.sh" ]