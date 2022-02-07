FROM node:alpine

#Creates directories
RUN mkdir -p /usr/src/app

#Sets an environment variable
ENV PORT 3000

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /usr/src/app

#Copy new files or directories into the filesystem of the container
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
COPY next.config.js /usr/src/app

#Install npm packages
RUN npm install

##Copy new files or directories into the filesystem of the container
COPY . /usr/src/app

#Build application
RUN npm run build

#Informs container runtime that the container listens on the specified network port at runtime
EXPOSE 3000

#Allows you to configure a container that will run as an executable
ENTRYPOINT ["npm", "run"]
