FROM mhart/alpine-node:10 as BUILDER
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=BUILDER /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]