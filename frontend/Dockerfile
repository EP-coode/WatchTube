# ============ BUILD ENV =============
FROM node as build_env

# coppy src
WORKDIR /
COPY ./frontend /frontend
COPY ./backend/src /backend/src

WORKDIR /frontend
RUN npm install
RUN npm run build

# =========== SERVE ENV ===============
FROM nginx as serve_env

COPY --from=build_env /frontend/dist /usr/share/nginx/html

COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]