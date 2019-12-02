FROM node:12.2.0-alpine

WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
#COPY . .
EXPOSE 8080

CMD ["npm", "run", "serve"]