#!/bin/bash

# Npm init, react build
cd /domains/calendar.michalpilarski17.smallhost.pl/public_python/Calendar/cal/frontend/calendar
npm init
npm run build

# Pobranie bibliotek dla django
cd
cd /domains/calendar.michalpilarski17.smallhost.pl/public_python/Calendar/cal
pip install -r requirements.txt

# Wykonanie migracji
python manage.py makemigrations
python manage.py migrate
