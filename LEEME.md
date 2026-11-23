# Pastillero — cómo publicarla e instalarla

App web instalable (PWA) para recordar medicamentos, registrar la hora de cada toma, llevar el stock y avisar cuando quede para 5 días (configurable por medicamento). Gratis, sin cuentas ni servidores: los datos de cada persona quedan **solo en su teléfono**.

## 1. Publicar (una sola vez, ~5 minutos)
1. En GitHub (organización **SHGestion**) crea un repositorio público llamado `pastillero`.
2. "Add file → Upload files" y sube TODOS los archivos de esta carpeta (index.html, sw.js, manifest.webmanifest y los 4 íconos .png).
3. Settings → Pages → Source: *Deploy from a branch* → rama `main`, carpeta `/ (root)` → Save.
4. En 1–2 minutos queda en: **https://shgestion.github.io/pastillero/**

Ese link es el que compartes con tu esposa y tu familia. Cada uno instala la app y tiene sus propios datos.

## 2. Instalar en el teléfono
- **iPhone:** abrir el link en **Safari** → botón Compartir → "Agregar a inicio". Abrir desde el ícono → Ajustes → "Activar avisos". (En iPhone los avisos solo funcionan con la app instalada, iOS 16.4 o superior.)
- **Android:** abrir en **Chrome** → menú ⋮ → "Instalar app" → abrir → "Activar avisos".

## 3. Primer uso
1. Pestaña **Medicamentos → Agregar**: nombre, concentración, cantidad por toma, stock actual, frecuencia y horarios.
2. **Ajustes → Agregar al calendario** (recomendado, ver abajo).
3. Cada vez que tomes un medicamento, toca **Tomar** en la pestaña Hoy (o "Ya la tomé" en el aviso). Queda registrada la hora real y se descuenta del stock.
4. Al comprar, **Reponer stock** (+30, +60, etc.) o corrige el número exacto.

## Frecuencias soportadas
Todos los días (uno o varios horarios) · Cada X horas (2 a 72) · Días de la semana · Cada X días · con fecha de inicio y término opcional (tratamientos cortos, ej. antibióticos). Los medicamentos se pueden pausar sin perder el historial.

## Importante sobre los avisos
Una app web no puede hacer sonar una alarma si el teléfono la cerró hace rato (limitación de iPhone y Android, no de la app). Por eso:
- Con la app abierta o recién usada: avisa a la hora de la toma y de nuevo a los 15 min si no la registras; avisa también del stock bajo una vez al día.
- **Alarma garantizada:** "Agregar al calendario" crea eventos repetitivos con alarma en el calendario del teléfono, más un aviso de compra el día en que quedará stock para 5 días. Si cambias horarios o repones stock, borra el calendario "Pastillero" anterior y vuelve a exportar.
  - iPhone: si no se abre solo, el archivo queda en Archivos › Descargas; tócalo → "Agregar todo".

## Citas y exámenes (nuevo)
- Pestaña **Citas → 📷 Leer orden o captura**: foto de la orden médica (impresa o manuscrita), comprobante de reserva o captura de pantalla. La IA extrae tipo, motivo, fecha, hora, profesional, lugar, teléfono, exámenes y preparación; tú revisas y guardas. Si hay varias horas en un comprobante, crea una cita por cada una.
- Órdenes sin fecha quedan en **Por agendar** hasta que pidas la hora.
- Avisos antes de cada cita (1 semana, 2 días, 1 día, 3 h, 2 h, 1 h o 30 min), preparación destacada (ayuno, etc.), mapa y llamada con un toque.
- Al marcarla realizada puedes anotar el resultado y adjuntar fotos de resultados. "Agendar próximo control" copia los datos.
- La lectura usa el mismo Cloudflare Worker de la app de gestión de SH (Claude API, cuenta de Anthropic). Costo aproximado: pocos pesos por foto. Se puede cambiar en Ajustes › Lectura de órdenes médicas.

## Otros
- **Varias personas en un teléfono** (ej. llevar los remedios de un familiar): toca el nombre arriba a la derecha.
- **Historial**: cumplimiento de 7 días, tomas a la hora, dosis sin registrar, filtro por medicamento y exportación CSV (Excel).
- **Respaldo**: Ajustes → Exportar copia (envíatela por correo). Para cambiar de teléfono: Importar copia.
- **Actualizar la app**: reemplaza index.html en GitHub y, si cambias archivos, sube el número en `const CACHE = 'pastillero-v1'` de sw.js (v2, v3…). Los datos de los usuarios no se pierden.
