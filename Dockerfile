# Gunakan Node.js versi LTS sebagai base image
FROM node:lts

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh proyek ke dalam container
COPY . .

EXPOSE 5173

# Jalankan perintah npm run dev saat container dijalankan
CMD ["npm", "run", "dev"]