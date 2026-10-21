// Au chargement de la page, charger tous les patients depuis la base SQL
window.onload = function() {
    chargerPatients();
};

function chargerPatients() {
    fetch('/api/patients')
        .then(res => res.json())
        .then(data => afficherTableau(data))
        .catch(err => console.error("Erreur:", err));
}

function afficherTableau(data) {
    let tbody = document.querySelector("#patient_liste tbody");
    tbody.innerHTML = "";
    data.forEach(p => {
        let row = tbody.insertRow();
        row.innerHTML = `
            <td>${p.nom}</td>
            <td>${p.prenom}</td>
            <td>${p.age}</td>
            <td>${p.addresse}</td>
            <td>${p.phone}</td>
            <td>
                <a onclick="supprimerPatient(${p.id})" style="color:red;">Delete</a>
            </td>
        `;
    });
}

// Soumission du formulaire (Ajout d'un patient)
function onFormsubmit() {
    let formData = {
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        age: document.getElementById("age").value,
        addresse: document.getElementById("addresse").value,
        phone: document.getElementById("phone").value
    };

    fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(response => {
        resetForm();
        chargerPatients(); // Recharger la liste depuis la base SQL
    })
    .catch(err => console.error("Erreur:", err));
}

function resetForm() {
    document.getElementById("patientForm").reset();
}

// Supprimer un patient de la base SQL
function supprimerPatient(id) {
    if (confirm("Voulez-vous vraiment supprimer ce patient ?")) {
        fetch(`/api/patients/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => chargerPatients());
    }
}

// Fonctions pour les boutons de requêtes spéciales
function chargerFiltre3Conditions() {
    fetch('/api/patients/filtre')
        .then(res => res.json())
        .then(data => afficherTableau(data));
}

function chargerStats() {
    fetch('/api/patients/stats')
        .then(res => res.json())
        .then(stat => {
            alert(`Statistiques de l'hôpital :\n- Âge moyen : ${Math.round(stat.moyenne_age || 0)} ans\n- Âge minimum : ${stat.age_min || 0} ans\n- Total patients : ${stat.total_patients}`);
        });
}