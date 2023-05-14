# Kalendarz 
Projekt ten ma na celu stworzenie strony internetowej, która umożliwia łatwe zarządzanie planami użytkowników poprzez intuicyjny interfejs użytkownika. Strona będzie posiadać wiele funkcjonalności, takich jak:

Dodawanie i zarządzanie wydarzeniami w kalendarzu
Powiadomienia o nadchodzących wydarzeniach
Dzielenie się kalendarzem z innymi użytkownikami
Personalizowanie wyglądu kalendarza.

Technologie używane w projekcie to:

```Python
Django
Django Rest Framework (DRF)
Git
React
```
### Instrukcja instalacji
Aby zainstalować projekt, należy sklonować repozytorium i zainstalować wymagane zależności.


```git clone https://github.com/Carians/Calendar```

```cd repo```

```pip install -r requirements.txt```

Następnie należy uruchomić serwer Django i serwer React.

# Uruchomienie serwera Django
```python manage.py runserver```

# Uruchomienie serwera React
```npm start```

Dokumentacja API
API zostało zaimplementowane przy użyciu Django Rest Framework (DRF). Dokumentacja API jest dostępna pod adresem:


http://localhost:8000/api/

# Uruchomienie lokalnie projektu z użyciem Dockera

Aby uruchomić projekt lokalnie, należy sklonować repozytorium ```git clone``` i zainstalować [docker.](https://www.docker.com)
Przechodzimy do katalogu z projektem i uruchamiamy komendę:

```docker-compose --file docker-compose-demo.yaml up -d```

Po zakończeniu pracy możemy wyłączyć aplikację komendą:

```docker-compose --file docker-compose-demo.yaml down```

# Autorzy
- [@CarianS (Krzysztof Kasperek) ](https://github.com/Carians)
- [@Michal-Pilarski](https://github.com/Michal-Pilarski)
