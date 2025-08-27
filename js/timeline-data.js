var timeline = {
    "container": "timeline",
    "autoResize": true,
    "groups": [
        {"id": 1, "content": "Experiencia"},
        {"id": 2, "content": "Docencia"},
        {"id": 3, "content": "Capacitación"},
        {"id": 4, "content": "Becas"}
    ],
    "data": [
        {"group": 1, "content": "DIEC", "start": "2014-01-01", "end": "2014-12-01", "type": "background", "className": "red" },
        {"group": 1, "content": "Sendevo", "start": "2020-03-20", "end": "2025-08-31" },
        {"group": 1, "content": "Coop. Apicola Pampero", "start": "2017-02-01", "end": "2017-06-01" },
        {"group": 1, "content": "Neufitech", "start": "2017-10-01", "end": "2019-06-01" },
        {"group": 1, "content": "CAPP", "start": "2019-06-01", "end": "2020-03-01" },
        {"group": 1, "content": "CONICET", "start": "2016-04-01", "end": "2025-08-31" },

        {"group": 2, "content": "Ayudante Graduado", "start": "2016-08-15", "end": "2018-03-01", "type": "background" },
        {"group": 2, "content": "Asistente (JTP)", "start": "2018-03-01", "end": "2021-03-01", "type": "background", "className": "blue" },
        {"group": 2, "content": "Udemy", "start": "2022-03-01", "end": "2022-04-01", "type": "background", "className": "blue" },
        {"group": 2, "content": "Udemy", "start": "2022-06-01", "end": "2022-07-01", "type": "background", "className": "blue" },
        
        {"group": 3, "content": "Materias Ing. Electrónica - Plan 2006", "start": "2007-03-01", "end": "2016-03-15", "type":"background"},
        {"group": 3, "content": "Curso armado y<br>config. de PCs", "start": "2010-09-01", "end": "2010-12-01" },
        {"group": 3, "content": "IoT y Control", "start": "2016-04-01", "end": "2016-04-15" },
        {"group": 3, "content": "Sistemas distribuidos de Tpo. real", "start": "2016-06-01", "end": "2016-08-01" },
        {"group": 3, "content": "Modelos de simulación en prod. agrop.", "start": "2017-04-01", "end": "2017-06-30" },
        {"group": 3, "content": "Tópicos en Big Data", "start": "2017-09-01", "end": "2017-10-01" },
        {"group": 3, "content": "Minería de Datos y Aprend. Autom.", "start": "2019-08-01", "end": "2019-12-01" },
        {"group": 3, "content": "Sistemas Colaborativos de Tpo. Real", "start": "2020-03-01", "end": "2020-06-01" },
        {"group": 3, "content": "Análisis Visual de Grandes Datos", "start": "2020-08-01", "end": "2020-10-01" },
        {"group": 3, "content": "Técnicas Avanzadas de Computación Evolutiva", "start": "2021-04-07", "end": "2021-08-06" },
        {"group": 3, "content": "Tesis doctoral", "start": "2016-04-01", "end": "2020-12-15" },
        {"group": 3, "content": "Ley Micaela", "start": "2023-10-02", "end": "2023-10-20" },     
        
        {"group": 4, "content": "Beca de<br>estímulo al estudio", "start": "2013-03-01", "end": "2013-12-01"},
        {"group": 4, "content": "Beca de<br>estímulo al estudio", "start": "2014-03-01", "end": "2014-12-01"},
        {"group": 4, "content": "Beca de introd.<br>investig. alumnos", "start": "2014-03-01", "end": "2014-12-01" },
        {"group": 4, "content": "Beca de invest.<br>PGI-MAyDS", "start": "2015", "end": "2016" },
        {"group": 4, "content": "Beca doctoral CONICET", "start": "2016-04-01", "end": "2021-03-31" },
        {"group": 4, "content": "Beca posdoctoral CONICET", "start": "2021-04-01", "end": "2025-08-31" }
    ].map((el,index) => ({...el, id:index}))
};