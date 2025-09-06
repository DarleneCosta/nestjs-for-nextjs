# 🚀 API NestJS - Sistema Completo de Autenticação e Gerenciamento

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
</p>

## 📋 Descrição

Esta é uma API REST completa construída com **NestJS** e **TypeScript**, oferecendo um sistema robusto de autenticação JWT, gerenciamento de usuários, posts e upload de arquivos. A aplicação foi desenvolvida seguindo as melhores práticas de segurança e arquitetura.

## ✨ Funcionalidades Principais

### 🔐 **Sistema de Autenticação**

- Login com JWT (JSON Web Tokens)
- Proteção de rotas com Guards
- Validação de tokens automática
- Estratégia Passport JWT integrada

### 👥 **Gerenciamento de Usuários**

- Criação de usuários
- Perfil do usuário autenticado
- Atualização de dados pessoais
- Alteração de senha
- Exclusão de conta
- Hash de senhas com bcrypt

### 📝 **Sistema de Posts**

- CRUD completo para posts
- Associação com usuários
- Validação de dados com DTOs

### 📁 **Upload de Arquivos**

- Upload seguro de imagens
- Validação de tipos de arquivo
- Armazenamento organizado por data
- Proteção com autenticação JWT

### 🛡️ **Recursos de Segurança**

- Rate limiting (limitação de requisições)
- CORS configurável com whitelist
- Helmet para headers de segurança
- Validação global de dados
- Filtro global de exceções
- Proteção contra ataques comuns

## 🏗️ Arquitetura

```
src/
├── auths/           # Módulo de autenticação
├── users/           # Módulo de usuários
├── posts/           # Módulo de posts
├── uploads/         # Módulo de upload
├── common/          # Utilitários compartilhados
│   ├── filters/     # Filtros globais
│   ├── guards/      # Guards de autenticação
│   ├── pipes/       # Pipes de validação
│   └── utils/       # Funções utilitárias
└── config/          # Configurações
```

## 🚀 Tecnologias Utilizadas

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **TypeORM** - ORM para banco de dados
- **SQLite/PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Passport** - Estratégias de autenticação
- **bcryptjs** - Hash de senhas
- **Multer** - Upload de arquivos
- **Helmet** - Segurança HTTP
- **Class Validator** - Validação de dados

## 📦 Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd nestjs-for-nextjs
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Aplicação
APP_PORT=3000

# Banco de dados
DB_TYPE=better-sqlite3
DB_DATABASE=./db.sqlite
DB_SYNCHRONIZE=1
DB_AUTO_LOAD_ENTITIES=1

# JWT
JWT_SECRET=sua-chave-secreta-aqui

# CORS
CORS_WHITELIST=http://localhost:3000 http://localhost:3001
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

```bash
npm run start:dev
```

### Produção

```bash
npm run build
npm run start:prod
```

### Debug

```bash
npm run start:debug
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Cobertura de testes
npm run test:cov

# Testes em modo watch
npm run test:watch
```

## 📚 Documentação da API

### 🔐 Autenticação

#### Login

```http
POST /auths/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

### 👥 Usuários

#### Criar usuário

```http
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123"
}
```

#### Obter perfil do usuário

```http
GET /users/me
Authorization: Bearer <seu-jwt-token>
```

#### Atualizar perfil

```http
PATCH /users/me
Authorization: Bearer <seu-jwt-token>
Content-Type: application/json

{
  "name": "João Santos"
}
```

#### Alterar senha

```http
PATCH /users/me/password
Authorization: Bearer <seu-jwt-token>
Content-Type: application/json

{
  "currentPassword": "senha123",
  "newPassword": "novaSenha456"
}
```

### 📁 Upload de Arquivos

#### Upload de imagem

```http
POST /upload
Authorization: Bearer <seu-jwt-token>
Content-Type: multipart/form-data

file: [arquivo de imagem]
```

## 🔧 Configurações Avançadas

### Banco de Dados PostgreSQL

Para usar PostgreSQL em produção, configure as variáveis:

```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
```

### Rate Limiting

O sistema possui rate limiting configurado:

- **10 requisições** por **10 segundos**
- **Bloqueio de 5 segundos** após exceder o limite

### CORS

Configure domínios permitidos na variável `CORS_WHITELIST`:

```env
CORS_WHITELIST=https://meusite.com https://app.meusite.com
```

## 🛠️ Scripts Disponíveis

```bash
npm run build          # Compilar o projeto
npm run start          # Iniciar em produção
npm run start:dev      # Iniciar em desenvolvimento
npm run start:debug    # Iniciar em modo debug
npm run lint           # Executar linter
npm run format         # Formatar código
npm run test           # Executar testes
npm run test:e2e       # Executar testes E2E
npm run test:cov       # Executar testes com cobertura
```

## 📁 Estrutura de Arquivos

```
uploads/
└── 2025-08-15/        # Organizado por data
    ├── arquivo1.jpg
    └── arquivo2.png

data/
└── sqlite/            # Dados do SQLite
```

## 🔒 Segurança

- ✅ Autenticação JWT
- ✅ Hash de senhas com bcrypt
- ✅ Rate limiting
- ✅ CORS configurável
- ✅ Headers de segurança (Helmet)
- ✅ Validação de dados
- ✅ Filtro global de exceções
- ✅ Proteção contra SQL injection (TypeORM)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- 📧 Email: seu-email@exemplo.com
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/nestjs-for-nextjs/issues)
- 📖 Documentação: [NestJS Docs](https://docs.nestjs.com)

---

<p align="center">
  Feito com ❤️ usando <a href="https://nestjs.com">NestJS</a>
</p>
