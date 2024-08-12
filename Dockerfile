# Usar uma imagem Node.js oficial como base
FROM node:14

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta que o aplicativo irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "src/server.js"]
