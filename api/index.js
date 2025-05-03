const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const path = require("path");

// Stockage en mémoire
let users = [];
let stickers = [];

// Chemins des fichiers pour stockage persistent
const DATA_DIR = path.join(__dirname, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const STICKERS_FILE = path.join(DATA_DIR, "stickers.json");

// Générateur d'ID simple
const generateId = () => Math.random().toString(36).substr(2, 9);

// Fonction pour charger les données au démarrage
async function loadData() {
  try {
    // Créer le dossier data s'il n'existe pas
    await fs.mkdir(DATA_DIR, { recursive: true });

    try {
      const usersData = await fs.readFile(USERS_FILE, "utf8");
      users = JSON.parse(usersData);
    } catch (e) {
      // Le fichier n'existe pas encore, on utilise un tableau vide
      users = [];
    }

    try {
      const stickersData = await fs.readFile(STICKERS_FILE, "utf8");
      stickers = JSON.parse(stickersData);
    } catch (e) {
      // Le fichier n'existe pas encore, on utilise un tableau vide
      stickers = [];
    }

    console.log("Données chargées avec succès");
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
  }
}

// Fonction pour sauvegarder les données
async function saveData() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(USERS_FILE, JSON.stringify(users));
    await fs.writeFile(STICKERS_FILE, JSON.stringify(stickers));
    console.log("Données sauvegardées avec succès");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des données:", error);
  }
}

// Charger les données au démarrage
loadData();

// Initialiser l'app Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/stickers", (req, res) => {
  res.json(stickers);
});

app.get("/api/users", (req, res) => {
  const { email } = req.query;
  if (email) {
    const user = users.find((user) => user.email === email);
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } else {
    res.json(users);
  }
});

app.post("/api/stickers", async (req, res) => {
  const { email, sticker } = req.body;

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Créer un nouveau sticker avec ID
  const stickerId = generateId();
  const newSticker = {
    _id: stickerId,
    position: sticker.position,
    rotation: sticker.rotation,
    model: sticker.model,
  };

  // Créer un nouvel utilisateur avec ID
  const userId = generateId();
  const newUser = {
    _id: userId,
    email: email,
    sticker: stickerId,
  };

  // Lier l'utilisateur au sticker
  newSticker.user = userId;

  // Sauvegarder dans nos "collections"
  stickers.push(newSticker);
  users.push(newUser);

  // Sauvegarder les données dans les fichiers
  await saveData();

  res.status(201).json({ sticker: newSticker, user: newUser });
});

// Pour les routes non trouvées
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Écoute sur le port en développement local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Exporter l'application pour Vercel
module.exports = app;
