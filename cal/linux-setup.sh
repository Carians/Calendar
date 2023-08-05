#!/bin/bash

# Rozpakowanie repozytorium 
cd
mv domains/calendar.michalpilarski17.smallhost.pl/public_python/Calendar/cal/* domains/calendar.michalpilarski17.smallhost.pl/public_python/
cd /domains/calendar.michalpilarski17.smallhost.pl/public_python
rm -r Calendar/*

# Npm init, react build
cd /frontend/calendar
echo -e "\n\n\n\n\n\n\n\n\n" | npm init
npm install
npm run build

# Pobranie bibliotek dla django
cd
cd /domains/calendar.michalpilarski17.smallhost.pl/public_python/Calendar/cal
pip install -r requirements.txt

# Wykonanie migracji
python manage.py makemigrations
python manage.py migrate
