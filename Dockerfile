FROM node:18

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN npm i -g react-scripts

WORKDIR /app

COPY package*.json .
COPY tsconfig*.json .

RUN pnpm i

COPY . .

EXPOSE 3000
CMD ["react-scripts", "start"]