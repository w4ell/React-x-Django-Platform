from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, full_name, birth_date, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, birth_date=birth_date)
        user.set_password(password)
        user.save() #dans la bd

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    full_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    birth_date = models.DateField(null=True)
    
    objects = UserAccountManager() #une instance qui signifie que les méthodes définies dans UserAccountManager seront disponibles pour les instances de ce modèle.

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'is_admin', 'birth_date']

    def get_full_name(self): 
        return self.full_name
    
    def get_short_name(self):
        return self.full_name
    
    def __str__(self):
        return self.email