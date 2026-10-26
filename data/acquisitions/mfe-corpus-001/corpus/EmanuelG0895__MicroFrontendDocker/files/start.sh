#!/bin/sh

# Wait for all microfrontends to be ready
echo "Waiting for all microfrontends to be ready..."

# Wait for MF-Characters
until curl -f http://mf-characters:3001/health > /dev/null 2>&1; do
    echo "Waiting for MF-Characters..."
    sleep 2
done

# Wait for MF-CharacterDetail
until curl -f http://mf-character-detail:3002/health > /dev/null 2>&1; do
    echo "Waiting for MF-CharacterDetail..."
    sleep 2
done

echo "All microfrontends are ready! Starting MF-Shell..."

# Start the main application
exec pnpm run start:prod 