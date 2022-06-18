# ============ BUILD ENV ==============
FROM node as compilation_env

# install packages
COPY package*.json .
RUN npm install

# build app
COPY . .
RUN npm run build

# ============ RUN ENV ==============
FROM node as run_env

WORKDIR /usr/src/app

COPY --from=compilation_env /node_modules ./node_modules
COPY --from=compilation_env /build ./build

CMD ["node", "./build"]