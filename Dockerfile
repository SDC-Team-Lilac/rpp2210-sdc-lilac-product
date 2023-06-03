# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY . .

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN rm -fr node_modules \
    && npm install \
    && rm -fr .env \
    && rm -fr coverage \
    && rm -fr k6

EXPOSE 8080

ENV NEW_RELIC_NO_CONFIG_FILE=true

ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true \
NEW_RELIC_LOG=stdout
# etc.

# Start the app using serve command
CMD [ "node", "server/index.js" ]