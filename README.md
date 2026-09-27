# pedrocounter

Une application qui simplifie le partage des frais d'une voiture, basé sur le kilométrage de chaque utilisateur.

Les données sont stockées sur un serveur gun.js.

## Installation

    npm install

## Dev

    npm run dev

## Serveur GUN

Pour vous connecter à une base de données, vous avez besoin d'un [serveur gun.js](https://gun.eco/docs/Installation#node).

Mettre l'url dans `.env.local`, exemple:

```
VITE_GUN_PEERS=https://yourgunserver.com/gun
```

## Build

    npm run build
