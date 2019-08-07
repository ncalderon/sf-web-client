#!/usr/bin/env bash
printenv
openssl aes-256-cbc -K $encrypted_a08d1d0bac4b_key -iv $encrypted_a08d1d0bac4b_iv -in s-travis.tar.enc -out .\\s-travis.tar -d
tar xvf s-travis.tar
chmod +x mvnw
chmod +x scripts/install.sh
exit 0
