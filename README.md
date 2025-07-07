# Stage Maroc – Application Web

**Stage Maroc** est une plateforme web dédiée à la mise en relation entre stagiaires et recruteurs, permettant la publication d’offres de stage et la gestion des candidatures.

---

## 1. Acteurs

- **Stagiaire** : crée un compte, consulte les offres, postule, suit ses candidatures, gère son profil.  
- **Recruteur** : crée un compte, publie des offres, consulte et traite les candidatures, peut modifier une offre pour la marquer comme expirée (pas de suppression d’offres).

---

## 2. Fonctionnalités principales

- Inscription / authentification  
- Consultation et recherche d’offres  
- Publication d’offres (recruteur)  
- Modification d’une offre pour la **marquer comme expirée** (le recruteur ne peut pas supprimer les offres)  
- Candidature et suivi (stagiaire)  
- Gestion du profil stagiaire  
- Suppression de compte  

---

## 3. Technologies utilisées

- **Backend** : Laravel 12, JWT Auth, Doctrine DBAL, MySQL  
- **Frontend** : React 19, React Router DOM, Axios, Tailwind CSS, Vite  

---

## 4. Installation complète

### Pré-requis

- PHP >= 8.2  
- Composer  
- Node.js & npm  
- MySQL (ex. WAMP, MAMP...)  

---

### Étape 1 : Cloner le dépôt

```bash
git clone https://github.com/akram-aznag644/StageMaroc.git
cd stage-maroc
Étape 2 : Installation et configuration du backend Laravel
cd backend
composer install
cp .env.example .env
php artisan key:generate
Modifier le fichier .env pour configurer la base de données :

dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nom_de_la_base
DB_USERNAME=utilisateur_mysql
DB_PASSWORD=mot_de_passe_mysql
Exécuter les migrations pour créer les tables nécessaires :


php artisan migrate
(Optionnel) Lancer les tests pour vérifier l’intégrité :


php artisan test
Étape 3 : Installation et configuration du frontend React

cd ../frontend
npm install
Créer un fichier .env.local (ou .env) à la racine du dossier frontend pour configurer l’URL de l’API :
env
VITE_API_URL=http://127.0.0.1:8000/api
Étape 4 : Lancer les serveurs de développement
Démarrer le backend Laravel :

cd ../backend
php artisan serve
Démarrer le frontend React :


cd ../frontend
npm run dev
5. Utilisation
Ouvrir le navigateur à l’adresse affichée par Vite (par défaut http://localhost:5173)

Créer un compte stagiaire ou recruteur

Utiliser l’application : consulter, publier, postuler, suivre candidatures, etc.

6. Remarques
Ce projet est modulaire et peut être étendu (ex : ajout d’un espace administrateur).

Assurez-vous de sécuriser vos données et clés avant tout déploiement en production.

Pour toute question ou besoin d’aide, n’hésitez pas à me contacter !
