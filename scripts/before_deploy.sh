#!/usr/bin/env bash
openssl aes-256-cbc -K $encrypted_0bf0cf7d480d_key -iv $encrypted_0bf0cf7d480d_iv -in secrets.tar.enc -out travis-env/secrets.tar -d
chmod +x scripts/deploy.sh
chmod +x scripts/secrets.tar
tar xvf travis-env/secrets.tar
chmod 600 id_rsa
chmod 600 id_rsa.pub
chmod 600 config
