FROM nvcr.io/nvidia/l4t-base:r32.4.3

RUN apt-get update && \
 apt-get install -y \
    ca-certificates

RUN wget https://deb.nodesource.com/setup_16.x | bash - 
RUN bash setup_16.x 
RUN apt-get install -y nodejs

#Creates directories
RUN mkdir -p /usr/src/app

#Sets an environment variable
ENV PORT 3000

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /usr/src/app

#Copy new files or directories into the filesystem of the container
COPY package.json /usr/src/app
COPY next.config.js /usr/src/app

RUN node -v 
RUN npm -v

#Install npm packages
RUN npm install

##Copy new files or directories into the filesystem of the container
COPY . /usr/src/app

#Build application
RUN npm run build

#Informs container runtime that the container listens on the specified network port at runtime
EXPOSE 3000

#Allows you to configure a container that will run as an executable
ENTRYPOINT ["npm", "start"]
