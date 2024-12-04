FROM node:21

WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm install

# Generate Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Install ts-node globally to ensure it's available
RUN npm install -g ts-node typescript

# Use ts-node to run the application directly
CMD ["npx", "ts-node", "src/index.ts"]