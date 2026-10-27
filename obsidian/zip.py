# Empaqueta obsidian/Bachi Firu/ en obsidian/Bachi Firu.zip (con la carpeta .obsidian incluida).
# Uso:  python obsidian/zip.py
import os
import zipfile

AQUI = os.path.dirname(os.path.abspath(__file__))
VAULT = os.path.join(AQUI, "Bachi Firu")
ZIP = os.path.join(AQUI, "Bachi Firu.zip")

n = 0
with zipfile.ZipFile(ZIP, "w", zipfile.ZIP_DEFLATED) as z:
    for raiz, _, ficheros in os.walk(VAULT):
        for f in ficheros:
            ruta = os.path.join(raiz, f)
            z.write(ruta, os.path.relpath(ruta, AQUI))
            n += 1
print(f"{ZIP}: {n} ficheros, {os.path.getsize(ZIP) // 1024} KB")
