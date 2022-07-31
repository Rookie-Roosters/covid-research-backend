<p align="center">
![](documents\images\COGLI_Logotype.png)
</p>

Propuesta para el track: Saruman - Research About Covid-19

## Rookie Roosters

> [Manuel González](https://github.com/manuelgm0518)
>
> [Sandra López](https://github.com/ShariZhari)
>
> [Leonel Fernández](https://github.com/LeonelYLuego)

# Objetivo Particular

Estadísticamente saber en qué lugares del mundo se hicieron estudios sobre el virus Covid-19 y tener información sobre ellos.

# Tipo de Solución

Una plataforma de descarga de donde se obtendrá un archivo con los resultados de estudios Covid-19 para la fabricación de vacunas y el cuál será mapeado a una base de datos, por medio de un aplicación web se construirá servicios para obtener estos datos en los cuáles existe la locación en la cual se hizo el estudio y utilizando la API de mapas (libre a la que el participante quiera escoger) se registrará.

# Motivación en el Desarrollo

La plataforma ayudará a ver las ubicaciones y lugares en los que una persona ha podido hacer investigaciones y estudios sobre Covid-19 así como la información de interés para estos, qué información te gustaría saber acerca de estos, será de suma importancia ver que la creatividad y objetividad de la información de la API.
Problemática a Resolver
El acceso y la difusión de información se ha vuelto una parte importante de muchos aspectos de nuestra vida cotidiana, por lo que ha cobrado gran relevancia en los últimos años contar con fuentes de información transparentes, que transmitan datos verídicos. Sin embargo, aún existen fuentes que tergiversan la información y la manipulan a conveniencia propia, por lo que hoy en día es cada vez más necesario una mayor cantidad de sitios en los cuales el público pueda confiar en su contenido.
La pandemia del Covid ha sido un suceso mundial que cambió la forma de vida de muchas personas durante los últimos dos años, pues hasta el momento se han reportado 565 Millones de casos de Covid 19, que han afectado a la población mundial, por lo que se necesita proporcionarles la información más actualizada y relevante al público en general y personal de la salud, ya que por cada 1000 personas existen 1.8 médicos y 4 enfermeros.
También, al vivir en una época donde se genera una gran cantidad de datos diariamente, llega a surgir la duda de cómo aprovechar tales datos para obtener nueva información de interés que beneficie en mayor medida a la sociedad. Pues, para la población en general, un montón de datos obtenidos pueden ser difíciles de interpretar, y por lo tanto, no se les puede dar una utilidad concreta.
Por lo que, de forma rápida, la población puede realizar una investigación de información verídica y así obtener la información sobre las investigaciones realizadas acerca del covid que se pueden encontrar en la OMS. Sin embargo, aproximadamente son 16700 investigaciones que, al ser tantas, pueden ser confusas al principio para el público en general; y se puede perder el interés, haciendo que prefieran otras fuentes más resumidas que puedan contener información menos confiable.
En el caso de los investigadores, analizar los datos puede volverse un poco tedioso y quitarles más tiempo de lo requerido, ya que estas personas deben publicar resultados de forma periódica, con intervalos de tiempo muy cortos. Por último, el personal de salud suele tener una carga de trabajo muy pesada que le impide darle el tiempo necesario para sentarse a investigar resultados.
A partir de esto, se puede concluir que todas estas personas requieren de información verídica que pueda ser interpretada rápida y sencillamente. Por lo que se desarrollará una plataforma que muestre al público información digerida que le resulte de mayor utilidad, con información obtenida de fuentes confiables.

# Diseño de la Protopersona

## Investigadores

Los investigadores son personas que recaban información para realizar un estudio y obtener resultados sobre este, tienen una gran importancia en el mundo ya que ellos proporcionan datos que serán utilizados por público en general o por otros investigadores. Su motivación es informar y actualizar a las demás personas de la manera más verídica.

### Comportamientos

- Recaban información
- Realizan investigaciones
- Analizan los datos más importantes
- Toman decisiones en base a información
- Comparten los resultados de las investigaciones
- Desarrollan las investigaciones en grupos de personas
- Publican sus resultados y conclusiones en medios de divulgación científica

### Demografía

- Viven en todo el mundo
- Manejan como idioma universal el inglés
- Existen de todas las edades, aunque su mayoría son profesionales
- Principalmente del sector de salud

### Necesidades y Objetivos

- Recabar la información más precisa
- Realizar las investigaciones en un tiempo razonable
- Entregar resultados confiables
- Tener una bibliografía de las fuentes consultadas
- Buscar datos en todo el mundo
- Compartir sus resultados

## Personal de Salud

El personal de salud son aquellas personas que se dedican al cuidado directo de la salud de la población.
Sienten una gran pasión por ayudar y serles útil a las personas.
Trabajan arduamente durante varias horas al día, algunas veces sin descanso.


### Comportamientos

- Buscan la información más actualizada para su capacitación
- Aplican los resultados de las búsquedas en los pacientes
- Son responsable del tratamiento que le dan a las personas
- Comunican sus conocimientos con otras personas
- Son personas éticas

### Demografía

- Viven en todo el mundo
- Cuentan con una licenciatura o doctorado
- Trabajan en hospitales o centros de salud
- Cuentan con experiencia sobre cómo tratar a un paciente

### Necesidades y Objetivos

- Obtener la información más actualizada
- Brindar el mejor tratamiento a los pacientes
- Ser claros y honestos sobre los resultados de sus investigaciones
- Contar la información más confiable

## Público en General

Son cualquier persona del mundo que busca recabar información para su uso personal o publicarlo - en algún lugar.
Sus estilos de vida pueden ser muy variados, pero mayoritariamente trabajan para ganarse la vida, y presentan curiosidad por los sucesos que ocurren en su ambiente, por lo que investigan sobre dichos sucesos.

### Comportamientos

- Tienen el interés de estar informados
- Realizan investigaciones para proyectos propios
- Sintetizan la información para darla a conocer a otras personas
- Desean extender su conocimiento sobre el tema
- Buscan información en internet globalmente

### Demografía

- Viven en todo el mundo
- Son personas que en su mayoría son adultos
- La gran parte cuentan con licenciatura en adelante

### Necesidades y Objetivos

- Contar con la información más verídica
- Tener las últimas actualizaciones
- Realizar investigaciones en un periodo corto de tiempo
- Almacenar los datos investigados en un repositorio
- Que la información sea entendible

# Solución

Se desarrollará una plataforma web llamada COGLI Search Engine, por las siglas COrona GLobal Information, que permitirá a investigadores, personal de salud y público en general obtener información sobre las investigaciones covid realizadas alrededor del mundo, basados en datos de la Organización Mundial de la Salud actualizados automáticamente cada día. Dicha información le será presentada al usuario a través de un mapa interactivo que contendrá un listado de investigaciones según el país. El usuario también podrá buscarlas manualmente, con la ayuda de filtros y opciones preestablecidas, así como de descargar los datos.

Además de la búsqueda básica de investigaciones, los usuarios podrán visualizar las estadísticas y gráficas covid más recientes, como el total de casos, vacunaciones, etc. Dichos datos se obtienen del repositorio de datos Covid-19 de Our World in Data, quienes a su vez obtienen la información del repositorio de datos Covid del Centro de Ciencia de Sistemas e Ingeniería (CSSE) de la Universidad Johns Hopkins.

Del mismo modo, la aplicación también mostrará las noticias actuales sobre COVID 19 que pueden ser relevantes para los usuarios, y además se le proporcionará la funcionalidad a los investigadores de marcar las investigaciones que sean de su interés por medio de marcadores, al igual que una API documentada para obtener la información de la aplicación para aquellos desarrolladores que necesiten dichos datos, y un tutorial que explique el funcionamiento básico de la aplicación.

Al ser una aplicación que permite ahorrar tiempo obteniendo los mejores resultados, que facilita su uso proporcionando guías de uso, una buena documentación, una interfaz con una excelente experiencia de usuario, que te proporciona información entendible, actualizada, confiable y precisa, además de herramientas para investigadores, personal de salud y público en general; la investigación de datos se vuelve mucho más sencilla.

# Ideas

Para desarrollar el prototipo del track se tienen las siguientes ideas del lado del servidor:
- La información de las investigaciones será recabada automáticamente de la página oficial de la OMS https://trialsearch.who.int utilizando técnicas de web scraping.
- Se obtendrá la información de casos actuales, muertes, personas hospitalizadas, número de vacunas aplicadas, entre otros del Covid 19 en varios países del mundo https://github.com/owid/covid-19-data/tree/master/public/data
- Se procesarán todos los datos anteriores y se guardarán en una base de datos.
- Se creará una API documentada para que cualquier persona pueda obtener información sobre las investigaciones y los datos del Covid 19.
- La aplicación se subirá a un servidor donde será desplegada para que con una URL cualquier persona del mundo pueda acceder a ella.

Del lado del cliente se creará una página web que contenga:
- Un buscador general para las investigaciones
- Filtros de búsqueda para obtener resultados más precisos
- Un mapa interactivo que al seleccionar un país funcionará como filtro y al posicionar el mouse sobre uno de estos proporcionará la información de casos de Covid 19, muertes, personas hospitalizadas, número de vacunas, número de investigaciones, entre otros
- Búsquedas predefinidas
- Gráficas que muestran la información sintetizada sobre la búsqueda
- Información de cada una de las investigaciones con las siguientes datos:
  - Un mapa de los países que participaron en la investigación
  - Información sobre el Covid 19 de cada país
  - La liga para redirigir a la página de la investigación y de los resultados
  - Un contador de número de personas que han consultado la investigación
- La opción de crear un usuario e iniciar sesión para contar con los marcadores e historial de búsqueda en cualquier momento y lugar
- La opción de poner marcadores a cada una de las investigaciones y así separarlas por grupos y consultarlas después
- Notificaciones que aparecerán si hubo una actualización en la información de las investigaciones que se encuentran en un marcador
- Un historial de búsqueda
- Un historial de todas las modificaciones que han tenido cada una de las investigaciones
- Un botón que te dirigirá a la página para que el usuario sepa dónde subir su investigación y cómo debe realizarlo
- Las últimas noticas que hay sobre el Covid 19
- Un botón de ayuda que mostrará un tutorial interactivo que guiará a la persona en el uso de la aplicación.
- La opción de descargar un XML o CSV para descargar los datos.

# Gráficas

En base en la información obtenida de la página de la OMS https://trialsearch.who.int se agregarán las siguientes gráficas a la página, que su información cambiará dinámicamente en base a la búsqueda del usuario, a los filtros o al país seleccionado y éste podrá elegir si la información será representada en un gráfico de barras, pastel y de líneas:

Gráficas con información de fechas:
- Número de investigaciones por mes de actualización
- Número de investigaciones por año de actualización
- Número de investigaciones por mes de registro
- Número de investigaciones por año de registro
- Número de investigaciones por mes de inscripción
- Número de investigaciones por año de inscripción

Gráficas con información de inclusión:
- Número de investigaciones por edad de inclusión mínima
  - Embarazo
  - Edad menor a 1 año
  - Edad menor a 10 años
  - Edad menor a 20 años
  - Edad menor a 30 años
  - Edad menor a 40 años
  - Edad menor a 50 años
  - No aplica
- Número de investigaciones por edad de inclusión máxima
  - Embarazo
  - Edad menor a 1 año
  - Edad menor a 10 años
  - Edad menor a 20 años
  - Edad menor a 30 años
  - Edad menor a 40 años
  - Edad menor a 50 años
  - No aplica
- Número de investigaciones por género de inclusión
  - Ambos
  - Hombres
  - Mujeres

Gráficas con información del estado de la investigación:
- Número de investigaciones por estado de reclutamiento
  - Reclutamiento
  - No reclutamiento
  - Autorizado
  - No disponible
- Número de investigaciones que cuentan, o no, con otros registros
- Número de investigaciones por fase
  - Fase 1
  - Fase 2
  - Fase 3
  - Fase 4
  - No aplicable
  - Otra

Gráficas con otra información
- Número de investigaciones que cuentan, o no, con resultados
- Número de investigaciones por fuente
- Número de investigaciones por tipo de estudio
- Número de actualizaciones por grupos de tamaño objetivo

Gráficas por país
- Número de investigaciones por país
- Número de muertes
- Número de contagios
- Número de gente vacunada
- Población
- Densidad de población
- Expectativa de vida

# Tecnologías

| Tecnología             | Descripción                                                                                                                                                                       | Implementación                                                                                                                                                          |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Angular               | Es una plataforma de desarrollo creada sobre TypeScript para crear aplicaciones web escalables y basadas en componentes.                                                          | Esta se utilizará para desarrollar toda la lógica y los componentes del frontend de la aplicación, además de que permite crear aplicaciones con server side rendering.  |
| NestJS                | Es un framework creado para crear aplicaciones del servidor eficientes, confiables y escalables.                                                                                  | En el prototipo funcionará para administrar el servidor y todas las peticiones realizadas por la API y el frontend, y nos permitirá realizar una aplicación serverless. |
| Microsoft SQL Server  | Base de datos relacional desarrollada por Microsoft.                                                                                                                              | Esta se utilizará para almacenar todos los datos que serán requeridos por la aplicación de manera coherente y sin redundancia.                                          |
| TypeORM               | Librería creada sobre TypeScript que hace fácil unir aplicaciones realizadas sobre este mismo lenguaje y base de datos relacionales.                                              | La librería nos ayudará a conectar la base de datos con el servidor y a realizar todas las consultas.                                                                   |
| Azure                 | Servicio de computación en la nube operado por Microsoft que ofrece una gran cantidad de servicios en la nube.                                                                    | Este será utilizado para almacenar, administrar y desplegar la aplicación desde la nube para que esté disponible en internet.                                           |
| Google Maps API       | Plataforma que permite a los desarrolladores incluir las funciones de los mapas de Google en sus aplicaciones.                                                                    | Se utilizará para mostrar un mapa en la aplicación y desplegar más información sobre los casos de Covid 19 y las investigaciones por país.                              |
| PrimeNG               | Framework de diseño que le permite al desarrollador crear fácilmente una interfaz de usuario sencilla, estética y dinámica.                                                       | Este se utilizará para darle el diseño a la aplicación y así otorgar a los usuarios una mejor experiencia al utilizar el sitio.                                         |
| Swagger               | Componente que permite al desarrollador documentar de forma sencilla proyectos de NestJS, para que así el código pueda ser fácilmente entendido por desarrolladores en el futuro. | La aplicación hará uso de este para realizar la API y documentar esta.                                                                                                  |

# Wireframes

Investigaciones y estadísticas por país

![](documents\images\Imagen2.png)

Buscador global de investigaciones

![](documents\images\Imagen3.png)

Información completa de cada investigación

![](documents\images\Imagen4.png)

Dashboard con gráficas y estadísticas

![](documents\images\Imagen5.png)

Buscador de noticias relacionadas con el Covid-19

![](documents\images\Imagen6.png)

Marcadores con investigaciones guardadas por el usuario

![](documents\images\Imagen7.png)

## Capturas de Pantalla
Diagrama Entidad Relación de la Base de Datos

![](documents\images\Imagen8.png)

Documentación de la API

![](documents\images\Imagen9.png)

Información acerca de un endpoint en específico

![](documents\images\Imagen10.png)

Pantalla de Inicio

![](documents\images\Imagen11.png)

Pantalla de Marcadores

![](documents\images\Imagen12.png)

Pantalla de Investigación

![](documents\images\Imagen13.png)

# Futuro de la Aplicación

La aplicación será documentada para que en el futuro se pueda escalar con más funcionalidades como las que son: incluir técnicas de machine learning para proporcionar mejores resultados de búsqueda, calcular nuevos datos en base a los ya agregados para así proporcionar más información en las gráficas, incluir una gráfica que permita comparar varios datos a la vez, y proporcionar noticias que sean relevantes a la información del buscador, además de, agregar nuevas funcionalidades a los investigadores, personal de salud y público en general, obtener más información de otros repositorios y agregar más peticiones a la API.

# Fuentes de las estadísticas usadas en el documento

https://www.theglobaleconomy.com/rankings/doctors_per_1000_people/
https://www.who.int/clinical-trials-registry-platform/network/trial-registration
https://datos.bancomundial.org/indicator/SH.MED.NUMW.P3
https://datos.bancomundial.org/indicator/SH.MED.PHYS.ZS
