## Comandos git

Aquí tienes un resumen de los comandos más comunes y útiles en Git, organizados por categorías:

### Comandos básicos de configuración

- **`git config --global user.name "Tu Nombre"`**: Configura tu nombre de usuario globalmente.
- **`git config --global user.email "tuemail@example.com"`**: Configura tu correo electrónico globalmente.
- **`git config --list`**: Muestra la configuración actual de Git.

### Comandos de inicio y configuración de repositorio

- **`git init`**: Inicializa un nuevo repositorio Git en el directorio actual.
- **`git clone <url>`**: Clona un repositorio remoto en tu máquina local.
- **`git remote add origin <url>`**: Vincula un repositorio local a un remoto.

### Comandos para trabajar con el índice y commits

- **`git status`**: Muestra el estado actual del repositorio, incluyendo archivos modificados y sin seguimiento.
- **`git add <archivo>`**: Agrega un archivo al índice para ser incluido en el próximo commit.
- **`git add .`**: Agrega todos los cambios al índice.
- **`git commit -m "Mensaje del commit"`**: Realiza un commit con un mensaje de descripción.
- **`git commit -am "Mensaje del commit"`**: Agrega y hace commit de todos los cambios seguidos en un solo paso.

### Comandos para visualizar el historial y cambios

- **`git log`**: Muestra el historial de commits en el repositorio.
- **`git log --oneline`**: Muestra el historial de commits en una línea por commit.
- **`git diff`**: Muestra los cambios no añadidos al índice.
- **`git diff --staged`**: Muestra los cambios añadidos al índice pero no confirmados.

### Comandos de ramas

- **`git branch`**: Lista las ramas existentes en el repositorio.
- **`git branch <nombre-rama>`**: Crea una nueva rama.
- **`git checkout <nombre-rama>`**: Cambia a la rama especificada.
- **`git checkout -b <nombre-rama>`**: Crea y cambia a una nueva rama.
- **`git merge <nombre-rama>`**: Fusiona la rama especificada con la rama actual.
- **`git branch -d <nombre-rama>`**: Elimina la rama especificada.

### Comandos para trabajar con el repositorio remoto

- **`git push origin <nombre-rama>`**: Empuja la rama especificada al repositorio remoto.
- **`git pull`**: Trae cambios desde el repositorio remoto y los combina con la rama actual.
- **`git fetch`**: Trae cambios desde el repositorio remoto sin combinarlos.

### Comandos para deshacer cambios

- **`git restore <archivo>`**: Deshace cambios no añadidos en el archivo.
- **`git restore --staged <archivo>`**: Elimina un archivo del índice, pero mantiene los cambios en el área de trabajo.
- **`git reset <archivo>`**: Quita un archivo del índice.
- **`git reset --hard <commit>`**: Restablece el estado del repositorio al commit especificado y elimina todos los cambios en el área de trabajo.

### Otros comandos útiles

- **`git stash`**: Guarda temporalmente los cambios no confirmados.
- **`git stash apply`**: Restaura los cambios guardados con `git stash`.
- **`git rm <archivo>`**: Elimina un archivo del repositorio y del sistema de archivos.

Estos comandos cubren la mayoría de las operaciones esenciales en Git, desde la inicialización de repositorios hasta el trabajo con ramas y la gestión de repositorios remotos.

Para borrar git
rm -rf .git
