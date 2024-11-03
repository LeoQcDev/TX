Install graphviz from https://gitlab.com/api/v4/projects/4207231/packages/generic/graphviz-releases/12.1.2/windows_10_cmake_Release_graphviz-install-12.1.2-win64.exe

Add Graphviz to Windows Enviroment Variables

    Into Git Bash:
    1 - pip install django-extensions
    2 - pip install 
    1 - nano ~/.bashrc
    2 - export PATH=$PATH:/c/Program\ Files/Graphviz/bin
    3 - source ~/.bashrc
    4 - dot -V

Generate the diagram
Execute:
python manage.py graph_models gestion_clientes -o gestion_clientes_visualized.png into the bash
