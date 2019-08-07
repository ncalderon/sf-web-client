#!/usr/bin/env bash
../mvnw clean package -B -Pprod -DskipTests=true
exit 0
