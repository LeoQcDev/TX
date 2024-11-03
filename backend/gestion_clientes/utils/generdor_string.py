"""
Genera una cadena aleatoria de la longitud especificada.
Por defecto, la longitud es 60 caracteres.
"""

import random, string


def generar_cadena_aleatoria(longitud=60):
    caracteres = string.ascii_letters + string.digits
    return "".join(random.choice(caracteres) for _ in range(longitud))
