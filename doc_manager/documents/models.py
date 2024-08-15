from django.db import models
from django.conf import settings


class File(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=255)
    file_url = models.URLField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file_name




