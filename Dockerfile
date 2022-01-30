# FROM node:lts as dependencies
# WORKDIR /PIPERT-COCKPIT
# COPY package.json ./
# RUN npm install --frozen-lockfile

# FROM node:lts as builder
# WORKDIR /PIPERT-COCKPIT
# COPY . .
# COPY --from=dependencies /my-project/node_modules ./node_modules
# RUN npm build

# FROM node:lts as runner
# WORKDIR /PIPERT-COCKPIT
# ENV NODE_ENV production

# # If you are using a custom next.config.js file, uncomment this line.
# # COPY --from=builder /my-project/next.config.js ./
# COPY --from=builder /PIPERT-COCKPIT/public ./public
# COPY --from=builder /PIPERT-COCKPIT/.next ./.next
# COPY --from=builder /PIPERT-COCKPIT/node_modules ./node_modules
# COPY --from=builder /PIPERT-COCKPIT/package.json ./package.json

# EXPOSE 3000
# CMD ["npm", "start"]
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

#Execute commands in a new layer on top of the current image and commit the results
RUN npm install

##Copy new files or directories into the filesystem of the container
COPY . /usr/src/app

#Execute commands in a new layer on top of the current image and commit the results
RUN npm run build

#Informs container runtime that the container listens on the specified network ports at runtime
EXPOSE 3000

#Allows you to configure a container that will run as an executable
ENTRYPOINT ["npm", "run"]
