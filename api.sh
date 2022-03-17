#!/bin/bash
cd ~/moda-fingerprint-nft
git stash && git pull
npm install 
pm2 restart index
