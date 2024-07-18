from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from rest_framework.authtoken.models import Token

class Command(BaseCommand):
    help = 'Remove tokens that have not been used in the last 30 days'

    def handle(self, *args, **options):
        count = Token.objects.filter(created__lt=timezone.now() - timedelta(days=30)).count()
        Token.objects.filter(created__lt=timezone.now() - timedelta(days=30)).delete()
        self.stdout.write(self.style.SUCCESS(f'{count} tokens deleted'))
