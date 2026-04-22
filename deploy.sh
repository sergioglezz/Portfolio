#!/bin/bash
cd /home/$USER/Portfolio
git pull origin main
docker compose up -d --build
echo "Deploy done at $(date)" >> /var/log/deploy.log
