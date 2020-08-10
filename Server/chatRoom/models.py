from django.db import models


class Info(models.Model):
    user_id = models.CharField(max_length=31)
    content = models.CharField(max_length=255)
    create_time = models.DateTimeField()
