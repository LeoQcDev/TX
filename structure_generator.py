import os

def generate_structure(start_path, output_file):
    with open(output_file, 'w') as f:
        for root, dirs, files in os.walk(start_path):
            level = root.replace(start_path, '').count(os.sep)
            indent = ' ' * 4 * level
            f.write(f'{indent}{os.path.basename(root)}/\n')
            subindent = ' ' * 4 * (level + 1)
            for directory in dirs:
                f.write(f'{subindent}{directory}/\n')
            for file in files:
                f.write(f'{subindent}{file}\n')

# Define los caminos a tus proyectos
django_project_path = 'C:/Users/leoqu/Desktop/modulo_economia/backend'
next_project_path = 'C:/Users/leoqu/Desktop/modulo_economia/frontend'

# Archivos de salida
django_output_file = 'estructura_django.txt'
next_output_file = 'estructura_next.txt'

# Genera la estructura
generate_structure(django_project_path, django_output_file)
generate_structure(next_project_path, next_output_file)

print("Estructura generada exitosamente.")