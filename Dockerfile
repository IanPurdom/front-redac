FROM node:22 as base
WORKDIR /app
COPY ./package.json /package.json
RUN npm install -g @angular/cli
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 4200
CMD ["ng","serve","--host", "0.0.0.0"]