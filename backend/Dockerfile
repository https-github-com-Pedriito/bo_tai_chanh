# Utiliser une image de base node
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Exposer le port de l'API
EXPOSE 3000

# Commande pour démarrer l'API
CMD ["npm", "start"]