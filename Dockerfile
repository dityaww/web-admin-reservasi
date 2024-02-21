# Gunakan image Node.js versi terbaru sebagai base image
FROM node:latest

# Atur direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies menggunakan npm
RUN npm install

# Salin semua file aplikasi ke dalam container
COPY . .

# Expose port 5173 untuk akses ke aplikasi React
EXPOSE 5173

# Command untuk menjalankan aplikasi saat container dijalankan
CMD ["npm", "run", "dev"]