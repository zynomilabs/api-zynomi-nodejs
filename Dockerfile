
# Node LTS - v12.13.0
FROM node:erbium-slim
ENV NODE_ENV development
# Expose port 1337
EXPOSE 1337
# Create directory if not exists
RUN mkdir -p /usr/src/app
# Directory in the image filesystem  
WORKDIR /usr/src/app
# Copy package.json
COPY /package*.json ./
# Install the packages and Sails.js
RUN npm install && npm install sails -g && npm install pm2@latest -g

# Copy source code
COPY . .
#CMD pm2 start app.json
CMD sails lift