#!/usr/bin/env bash
openssl aes-256-cbc -K $encrypted_0bf0cf7d480d_key -iv $encrypted_0bf0cf7d480d_iv -in travis-env/secrets.tar.enc -out ./secrets.tar -d
chmod +x secrets.tar
tar xvf secrets.tar
ll
chmod 600 id_rsa
chmod 600 id_rsa.pub
chmod 600 config
exit 0
