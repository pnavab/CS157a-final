FROM node:alpine

WORKDIR /app

# Copy package and package-lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project 
COPY . .

#Expose port
EXPOSE 3000

# Run
CMD ["npm", "run", "dev"]