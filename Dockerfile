FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# COPY . .

# برای production بهتره build بشه
# RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]