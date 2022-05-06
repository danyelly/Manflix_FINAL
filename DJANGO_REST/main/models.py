from django.db import models

from django.contrib.auth.models import User
from django.utils import timezone

# impede a criação de usuários com emails repetidos
User._meta.get_field('email')._unique = True
#impede com que o email seja null ou vazio durante cadastro
User._meta.get_field('email').blank = False
User._meta.get_field('email').null = False

# Favoritos._meta.get_field('idFilmeFK')._unique = True
def upload_image_user(instance, filename):
    return f"{filename}"

def upload_moviePoster(instance, filename):
    return f"movies/{filename}"

def upload_movieFav(instance, filename):
    return f"fav/{filename}"

class Assinatura(models.Model):
    nome = models.CharField(max_length=55)
    valor = models.CharField(max_length=15)
    def __str__(self):
        return self.nome

# {instance.id}-{timezone.now()}-
class Usuarios(models.Model):
    nome = models.CharField(max_length=55)
    cpf = models.CharField(max_length=15, null=False, blank=False)
    nascimento = models.CharField(max_length=15)
    email = models.CharField(max_length=80)
    fone = models.CharField(max_length=15, null=True, blank=True)
    foto = models.ImageField(upload_to=upload_image_user, blank=True, null=True)
    idUserFK = models.ForeignKey(User, related_name="usuario", on_delete=models.CASCADE)
    idAssinaturaFK = models.ForeignKey(Assinatura, related_name="assinatura", on_delete=models.CASCADE)
    def __str__(self):
        return self.nome    

class Categoria(models.Model):
    nome = models.CharField(max_length=55)
    def __str__(self):
        return self.nome 

class Filmes(models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.CharField(max_length=300)
    foto = models.ImageField(upload_to=upload_moviePoster, blank=True, null=True)
    idCategoriaFK = models.ForeignKey(Categoria, related_name="categoria", on_delete=models.CASCADE)
    def __str__(self):
        return self.nome

class Favoritos(models.Model):
    idFilmeFK = models.ForeignKey(Filmes, related_name="filmes", on_delete=models.CASCADE)
    idUsuarioFK = models.ForeignKey(Usuarios, related_name="usuarios", on_delete=models.CASCADE)
