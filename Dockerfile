# Використовуємо офіційний образ Node.js версії 14
FROM node:14

# Встановлюємо робочу директорію в /usr/src/app
WORKDIR /usr/src/app

# Копіюємо package.json та package-lock.json в робочу директорію
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо усі файли з поточної директорії в робочу директорію
COPY . .

# Виконуємо команду для запуску додатка
CMD ["npm", "run", "start"]