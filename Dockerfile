# Stage 1: Build stage
FROM node:22 AS build

WORKDIR /app

# Define the build argument
ARG VITE_APP_ID

# Set it as an environment variable for Vite to see
ENV VITE_APP_ID=$VITE_APP_ID

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve stage
FROM nginx:stable-alpine

# Copy the build output from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Add a custom nginx config if you use React Router later
# RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]