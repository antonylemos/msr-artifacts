#!/bin/bash

set -e

echo "Removendo dist anterior..."
rm -rf dist

echo "Buildando mf-login..."
cd mf-login && npm install && npm run build && cd ..

echo "Buildando mf-dashboard..."
cd mf-dashboard && npm install && npm run build && cd ..

echo "Buildando mf-navbar..."
cd mf-navbar && npm install && npm run build && cd ..

echo "Buildando mf-personagem-detalhe..."
cd mf-personagem-detalhe && npm install && npm run build && cd ..

echo "Buildando root-app..."
cd root-app && npm install && npm run build && cd ..

cp -R dist/root-app/* dist/

echo "Build finalizado!"
