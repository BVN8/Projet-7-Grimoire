/* eslint-disable linebreak-style */
/* eslint-disable arrow-parens */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bookRoutes = require('./routes/Book');
const userRoutes = require('./routes/User');
// eslint-disable-next-line no-unused-vars
const auth = require('./middleware/auth');

const app = express();

// Middleware de CORS
app.use(cors());

// Middleware pour le parsing JSON
app.use(express.json());

// Configuration CORS (si vous avez des besoins spécifiques)
// Assurez-vous de vérifier si cette configuration est nécessaire avec `cors` package
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});

// Connexion à MongoDB
console.log('MONGO_URI:', process.env.MONGO_URI); // Affiche l'URI pour vérifier qu'il est bien chargé
console.log('PORT:', process.env.PORT); // Affiche le port pour vérifier qu'il est bien chargé

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.error('Connexion à MongoDB échouée !', err)); // Affiche l'erreur détaillée

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware de gestion des erreurs
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose s\'est mal passé !');
});

module.exports = app;
