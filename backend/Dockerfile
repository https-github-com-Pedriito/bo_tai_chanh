# Check out https://hub.docker.com/_/node to select a new base image
FROM docker.io/library/node:18-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
WORKDIR /home/node/app

# Install app dependencies
COPY --chown=node package*.json ./

# Clear npm cache
RUN npm cache clean --force

# Install dependencies
RUN npm install

# Bundle app source code
COPY --chown=node . .

# Build the app
RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "node", "." ]