# PCVC — Entrega de implementación

La propuesta está implementada en una rama local basada en el sitio existente. No está publicada y no se modificó el contenido del CMS en producción.

## Incluido

- Auditoría previa del código, 343 documentos públicos de Sanity y 548 URLs EN/ES.
- Homepage, navegación, footer, About y contacto con enfoque en operación integral corporativa.
- 13 capacidades, 10 tipos de eventos, destinos y página específica para agencias. RFP completo y brief rápido.
- Fotografía original de Alex Castro en portada y About. No se modificaron sus rasgos.
- Teléfono y WhatsApp: **+1 849 452 0971**. Enlaces tel y wa.me, datos de marca y schema utilizan el nuevo número.
- 15 imágenes conceptuales generadas, optimizadas a WebP; identificadas como IA. Ninguna se presenta como evento ejecutado.
- Especificaciones de venues con fuente/fecha y solicitud de verificación cuando faltan datos; esquema editorial de casos reales sin inventar clientes, métricas ni testimonios.
- Canonicals, hreflang, sitemap, redirecciones pertinentes, eventos de conversión sin datos personales y validación de formularios en servidor.

## Uso del código

Descomprimir el ZIP. Node 22 y npm. Instalar con `npm ci`, configurar las variables públicas de Sanity existentes y ejecutar `npm run build` / `npm start`.

La foto está en `public/images/team/alex-castro.jpeg`. Las imágenes conceptuales están en `public/images/corporate/`.

## Configuración necesaria antes de publicar

1. Netlify: comprobar detección de `corporateEventRfp` y `corporateQuickBrief` desde `public/__forms.html`, activar recepción en la bandeja acordada y realizar una prueba autorizada de entrega. El servidor solo confirma éxito después de respuesta válida del hosting; localmente devuelve 503 y conserva los datos.
2. Adjuntos: desactivados de manera predeterminada. El formulario propone coordinar la entrega del archivo. Para activarlos se necesita un receptor privado que controle autenticación, análisis antimalware, acceso y retención. Configurar `PCVC_SECURE_UPLOAD_URL`, `PCVC_SECURE_UPLOAD_TOKEN` y `NEXT_PUBLIC_PCVC_SECURE_UPLOADS_ENABLED=true` antes de compilar. El receptor acepta POST binario application/pdf autenticado y devuelve JSON `{ "id": "referencia_privada" }`. Solo esa referencia llega a Netlify; el archivo no se almacena en el upload público de Forms. El receptor debe purgar archivos huérfanos si falla el envío posterior del brief. PDF de hasta 5 MB; otros formatos deben exportarse a PDF.
3. Analítica: enlazar los eventos `pcvc:conversion`/dataLayer al destino analítico y al consentimiento configurado. No se ha asumido una propiedad GA/GTM ni verificado atribución real.
4. SEO: validar tráfico y backlinks de artículos sociales con Search Console antes de retirarlos o migrarlos. Se conservan sus URLs; dejan de promocionarse en las superficies corporativas.
5. Contenido: confirmar los cinco nombres internos de venues identificados en la auditoría, completar especificaciones verificadas y cargar casos reales autorizados.
6. Dependencias: se actualizaron Next y Swiper y se aplicaron correcciones compatibles de dependencias. Quedan avisos que exigen revisar herramientas de Sanity/Next y una posible migración mayor; consultar el reporte de dependencias incluido. No se declara seguridad de producción completa.

La [documentación de Netlify Forms](https://docs.netlify.com/manage/forms/setup/) indica que los archivos con información personal requieren configuración de seguridad adicional; por ello no se habilita almacenamiento público para documentos RFP.

## Verificación y límites

Compilación de producción, TypeScript y pruebas del brief y contrato de formularios. Revisión visual representativa en escritorio, tablet y móvil: portada, About con fotografía auténtica y navegación. El archivo `pcvc-route-qa.json` registra la comprobación final de rutas, H1, teléfono, redirecciones, sitemap y respuestas del API.

No se enviaron leads de prueba a producción, no se realizó auditoría visual individual de las 548 URLs, ni se midieron Core Web Vitals con tráfico real. La compilación y el tamaño de bundles no equivalen a una medición Lighthouse o de campo.

Resultado final: instalación limpia con npm ci, compilación de producción y pruebas del brief correctas. Verificación automática de 74 páginas EN/ES, 20 redirecciones, 404, sitemap y respuestas 422/403/503 del API. En móvil se comprobó el mensaje de error y la conservación de datos del brief. Enlaces de llamadas y WhatsApp verificados con el nuevo número. Retrato idéntico byte por byte al archivo recibido. Dependencias: 0 avisos críticos; persisten 5 altos y 7 moderados asociados al árbol de herramientas existente, detallados en el JSON.

Actualización de identidad: se conserva el logo original de palmera de PCVC y su paleta original (#d4af37 dorado, #40e0d0 turquesa, #faf9f6 marfil, #1c1c1c carbón), con tipografía Cormorant Garamond de títulos. Se sustituyó la paleta propuesta previamente. Esta revisión visual se verifica en preview local; la compilación de producción documentada arriba corresponde a la revisión anterior.
