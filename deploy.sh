#!/usr/bin/env bash
#cat $LOG > ~/.ssh/id_rsa
#echo ~/.ssh/id_rsa
#scp -o "StrictHostKeyChecking no" "BatchMode "  -i ./id_rsa ./REAMED.md root@45.77.160.68:/opt/sf/REAMED.md
#$phrase
scp -o "StrictHostKeyChecking no" -i ./id_rsa ./target/sf-web-client-0.0.1-SNAPSHOT.war root@45.77.160.68:/opt/sf/sf.war
ssh -F config calderon 'systemctl stop sf-web
mv /opt/sf/sf-web.war /opt/sf/backup/sf-web.war
mv /opt/sf/sf.war /opt/sf/sf-web.war
systemctl start sf-web'
#systemctl stop sf-web
#systemctl start sf-web
exit 0

           
