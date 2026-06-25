FROM node:22-alpine AS base

WORKDIR /app
COPY package*.json ./

# development stage
FROM base AS development

RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]

# builder stage
FROM base AS builder

RUN npm ci
COPY . .
RUN npm run build

# production stage
FROM nginx:1.27-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
