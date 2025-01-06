#!/bin/bash

# Function to check if network exists and create if it doesn't
check_network() {
  if ! docker network ls | grep -q "name-network"; then
    echo "Creating name-network..."
    docker network create name-network
  else
    echo "name-network already exists"
  fi
}

check_network

# Bring up the entire stack using docker compose
echo "Starting or updating the entire stack with docker compose..."
docker compose up -d