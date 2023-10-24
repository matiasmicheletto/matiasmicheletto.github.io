var timeline = {
    "container": "timeline",
    "groups": [
        {"id": 1, "content": "Empresas"},
        {"id": 2, "content": "Docencia"},
        {"id": 3, "content": "Pasantías"},
        {"id": 4, "content": "Capacitación"},
        {"id": 5, "content": "Revistas"},
        {"id": 6, "content": "Congresos"},
        {"id": 7, "content": "Becas"}
    ],
    "data": [
        {"group": 1, "content": "INTA: Registrador", "start": "2015-11-01", "end": "2016-11-01" },
        {"group": 1, "content": "Controlador observatorio", "start": "2016-03-01", "end": "2016-06-01" },
        {"group": 1, "content": "Controlador Observatorio", "start": "2016-03-01", "end": "2016-06-01", "type": "background", "className": "purple" },
        {"group": 1, "content": "INTA-Criollo", "start": "2016-10-01", "end": "2016-12-01", "type": "background", "className": "blue" },
        {"group": 1, "content": "Coop. Apicola Pampero", "start": "2017-02-01", "end": "2017-06-01", "type": "background", "className": "green" },
        {"group": 1, "content": "Neufitech", "start": "2017-10-01", "end": "2019-06-01", "type": "background", "className": "pink" },
        {"group": 1, "content": "CAPP", "start": "2019-06-01", "end": "2020-03-01", "type": "background", "className": "yellow" },
        {"group": 1, "content": "INTA-Campero", "start": "2020-06-01", "end": "2020-08-01", "type": "background", "className": "blue" },

        {"group": 2, "content": "Ayudante Graduado", "start": "2016-08-15", "end": "2018-03-01", "type": "background" },
        {"group": 2, "content": "Asistente (JTP)", "start": "2018-03-01", "end": "2021-03-01", "type": "background", "className": "blue" },

        {"group": 3, "content": "Pasantía interna DIEC", "start": "2014-01-01", "end": "2014-12-01", "type": "background", "className": "red" },
        
        {"group": 4, "content": "Materias Ing. Electrónica - Plan 2006", "start": "2007-03-01", "end": "2016-03-15", "type":"background"},
        {"group": 4, "content": "Curso armado y<br>config. de PCs", "start": "2010-09-01", "end": "2010-12-01" },
        {"group": 4, "content": "IoT y Control", "start": "2016-04-01", "end": "2016-04-15" },
        {"group": 4, "content": "Sistemas distribuidos de Tpo. real", "start": "2016-06-01", "end": "2016-08-01" },
        {"group": 4, "content": "Modelos de simulación en prod. agrop.", "start": "2017-04-01", "end": "2017-06-30" },
        {"group": 4, "content": "Tópicos en Big Data", "start": "2017-09-01", "end": "2017-10-01" },
        {"group": 4, "content": "Minería de Datos y Aprend. Autom.", "start": "2019-08-01", "end": "2019-12-01" },
        {"group": 4, "content": "Sistemas Colaborativos de Tpo. Real", "start": "2020-03-01", "end": "2020-06-01" },
        {"group": 4, "content": "Análisis Visual de Grandes Datos", "start": "2020-08-01", "end": "2020-10-01" },
        {"group": 4, "content": "Defensa tesis doctoral", "start": "2020-12-15" },

        {"group": 5, "content": "Sensors (MDPI)", "start": "2017" },
        {"group": 5, "content": "Sensors (MDPI)", "start": "2018" },
        {"group": 5, "content": "JUCS", "start": "2019" },
        {"group": 5, "content": "RITA (IEEE)", "start": "2019" },
        {"group": 5, "content": "Electronics (MDPI)", "start": "2020" },
        {"group": 5, "content": "PUC (Springer)", "start": "2020" },

        {"group": 6, "content": "Presentación trabajo<br>EST-41JAIIO", "start": "2012-03-15" },
        {"group": 6, "content": "SASE 2014", "start": "2014-08-14" },
        {"group": 6, "content": "EST-41JAIIO", "start": "2012-09-01" },
        {"group": 6, "content": "V-SBESC", "start": "2015-11-03" },
        {"group": 6, "content": "8°CAI-45JAIIO", "start": "2016-09-01" },
        {"group": 6, "content": "10°UCAMI", "start": "2016" },
        {"group": 6, "content": "V Congr. Cambio Climático", "start": "2016" },
        {"group": 6, "content": "9°CAI-46JAIIO", "start": "2017-09-01" },
        {"group": 6, "content": "XXVJJI", "start": "2017" },
        {"group": 6, "content": "10°CAI-47JAIIO", "start": "2018-09-01" },
        {"group": 6, "content": "13°UCAMI", "start": "2019" },
        {"group": 6, "content": "1°TAIC-48JAIIO", "start": "2019-09-01" },
        {"group": 6, "content": "SAEI-49JAIIO", "start": "2020-09-01" },

        {"group": 7, "content": "Beca de<br>estímulo al estudio", "start": "2013-03-01", "end": "2013-12-01", "type": "background", "className": "green" },
        {"group": 7, "content": "Beca de<br>estímulo al estudio", "start": "2014-03-01", "end": "2014-12-01", "type": "background", "className": "green" },
        {"group": 7, "content": "Beca de introd.<br>investig. alumnos", "start": "2014-03-01", "end": "2014-12-01" },
        {"group": 7, "content": "Beca de invest.<br>PGI-MAyDS", "start": "2015", "end": "2016" },
        {"group": 7, "content": "Postulación<br>Beca CONICET", "start": "2015-06-15" },

    ].map((el,index) => ({...el, id:index}))
};