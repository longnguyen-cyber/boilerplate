# # --- Stage: Builder ---
# FROM node:18.20-alpine3.21 AS builder

# # Set working directory
# WORKDIR /usr/src/app


# RUN apk update && apk --update-cache add --no-progress --virtual .gyp \
#   g++ \
#   gcc \
#   make \
#   python3 \
#   git

# # Copy package.json and package-lock.json
# COPY package*.json ./



# # Install dependencies and build the project, redirecting all output
# RUN npm install --omit=dev


# # Copy source code
# COPY . .

# # --- Stage: Runner ---
# FROM node:18.20-alpine3.21 AS runner

# # Set working directory
# WORKDIR /usr/src/app

# RUN ls -al /usr/src/app/

# # Copy built artifacts from builder stage
# COPY --from=builder /usr/src/app/package*.json ./
# COPY --from=builder /usr/src/app/.env ./

# RUN npm run build

# # Expose the port your NestJS app runs on
# EXPOSE 5000

# # Command to run your NestJS app
# CMD ["node", "dist/main"]

# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

# Install the application dependencies
RUN npm install

RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Build the NestJS applicationlỗi
RUN npm run build

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["node", "dist/main"]