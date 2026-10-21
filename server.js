const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());
app.use(express.static('.')); // Sert tous les fichiers du dossier actuel (HTML, CSS, JS)

// Connexion à la base de données SQLite (crée le fichier hopital.db automatiquement)
const db = new sqlite3.Database('./hopital.db', (err) => {
    if (err) console.error("Erreur de connexion", err.message);
    else console.log("Connecté à la base SQLite (hopital.db) avec succès ! 🚀");
});

// Création automatique de la table patients avec tes colonnes exactes
db.run(`CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    prenom TEXT,
    age INTEGER,
    addresse TEXT,
    phone TEXT
)`);

// 1. READ : Afficher tous les patients
app.get('/api/patients', (req, res) => {
    db.all("SELECT * FROM patients", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 2. CREATE : Ajouter un patient
app.post('/api/patients', (req, res) => {
    const { nom, prenom, age, addresse, phone } = req.body;
    const query = `INSERT INTO patients (nom, prenom, age, addresse, phone) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [nom, prenom, age, addresse, phone], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message: "Patient ajouté avec succès !" });
    });
});

// 3. DELETE : Supprimer un patient
app.delete('/api/patients/:id', (req, res) => {
    db.run(`DELETE FROM patients WHERE id = ?`, req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Patient supprimé !" });
    });
});

// --- REQUÊTES SPÉCIALES DEMANDÉES PAR TON SUJET ---

// A. Filtrage avec 3 conditions (Ex: âge > 25 ET adresse spécifique ET téléphone)
app.get('/api/patients/filtre', (req, res) => {
    const query = `SELECT * FROM patients WHERE age > 25 AND addresse = 'Antananarivo' AND phone LIKE '034%';`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// B. Statistiques (Moyenne d'âge, Âge min, Total de patients)
app.get('/api/patients/stats', (req, res) => {
    const query = `SELECT AVG(age) AS moyenne_age, MIN(age) AS age_min, COUNT(*) AS total_patients FROM patients;`;
    db.get(query, [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// Lancer le serveur sur le port 3000
app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});