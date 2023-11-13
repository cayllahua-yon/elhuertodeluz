/* Water pH  */
Highcharts.chart('container-value-water-ph', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 14,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10, /**reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 1, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' pH'
        },
        plotBands: [
         {
            from: 0,
            to: 5,
            color: '#DF5353' // red
        },
        {
            from: 5,
            to: 5.5,
            color: '#DDDF0D' // yellow
        },
        {
            from: 5.5,
            to: 6.5,
            color: '#55BF3B' // green
        }, {
            from: 6.5,
            to: 7.5,
            color: '#DDDF0D' // yellow
        }, {
            from: 7.5,
            to: 14,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Water pH',
        data: [6],
        tooltip: {
            valueSuffix: ' pH'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,
            newVal = valueWaterPh;
            if (newVal < 1 || newVal > 14) {
              
                newVal = phvalue    
                //hacer una consulta ala base de datos para optener valor ultimo registrado y mostrarlo.
            }
            point.update(newVal);
        }, 3000);
    }
});



/* Water EC  */
Highcharts.chart('container-value-water-ec', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 10,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10, /**reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 1, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' mS/cm'
        },
        plotBands: [
         {
            from: 0,
            to: 1,
            color: '#DF5353' // red
        },
        {
            from: 1,
            to: 1.5,
            color: '#DDDF0D' // yellow
        },
        {
            from: 1.5,
            to: 2.5,
            color: '#55BF3B' // green
        }, {
            from: 2.5,
            to: 3,
            color: '#DDDF0D' // yellow
        }, {
            from: 3,
            to: 10,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Water EC',
        data: [2],
        tooltip: {
            valueSuffix: ' mS'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,               
            newVal = valueWaterEc;
            if (newVal <= 0 || newVal > 10) {                
                newVal =  ecvalue               
                //hacer una consulta ala base de datos para optener valor ultimo registrado y mostrarlo.
            }

            point.update(newVal);

        }, 3000);
    }
});

/* Water Temp  */
Highcharts.chart('container-value-water-temp', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 40,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10, /**reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' °C'
        },
        plotBands: [
         {
            from: 0,
            to: 15,
            color: '#DF5353' // red
        },
        {
            from: 15,
            to: 20,
            color: '#DDDF0D' // yellow
        },
        {
            from: 20,
            to: 28,
            color: '#55BF3B' // green
        }, {
            from: 28,
            to: 32,
            color: '#DDDF0D' // yellow
        }, {
            from: 32,
            to: 40,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Water Temp',
        data: [25],
        tooltip: {
            valueSuffix: ' °C'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,
            newVal = valueWaterTemp;
            if (newVal <= 0 || newVal > 40) {
                // newVal = point.y - inc;
                newVal = wtvalue
                //hacer una consulta ala base de datos para optener valor ultimo registrado y mostrarlo.
            }
            point.update(newVal);

        }, 3000);
    }
});

/* Water Flow  valores ya que enviara el total de liquido al llenar*/
Highcharts.chart('container-value-water-flow', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 16,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10, /**reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' L/min'
        },
        plotBands: [
         {
            from: 0,
            to: 4,
            color: '#DF5353' // red
        },
        {
            from: 4,
            to: 6,
            color: '#DDDF0D' // yellow
        },
        {
            from: 6,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 12,
            color: '#DDDF0D' // yellow
        }, {
            from: 12,
            to: 16,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Water flow',
        data: [7.5],
        tooltip: {
            valueSuffix: ' L/min'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,
            newVal = valueWaterFlow;
            if (newVal <= 0 || newVal > 10) {                
                newVal = wfvalue             
                //hacer una consulta ala base de datos para optener valor ultimo registrado y mostrarlo.
            }

            point.update(newVal);

        }, 3000);
    }
});

/* Air Temp  */
Highcharts.chart('container-value-air-temp', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 40,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10, /**reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' °C'
        },
        plotBands: [
         {
            from: 0,
            to: 15,
            color: '#DF5353' // red
        },
        {
            from: 15,
            to: 20,
            color: '#DDDF0D' // yellow
        },
        {
            from: 20,
            to: 32,
            color: '#55BF3B' // green
        }, {
            from: 32,
            to: 35,
            color: '#DDDF0D' // yellow
        }, {
            from: 35,
            to: 40,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Air Temp',
        data: [25],
        tooltip: {
            valueSuffix: ' °C'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,                
            newVal = valueAirTemp;

            if (newVal <= 0 || newVal > 40) {                
                newVal = atvalue               
                //hacer una consulta ala base de datos para optener valor ultimo registrado y mostrarlo.
            }

            point.update(newVal);

        }, 3000);
    }
});

/* Air Humidity  */
Highcharts.chart('container-value-air-humidity', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10, /**reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' %'
        },
        plotBands: [
         {
            from: 0,
            to: 30,
            color: '#DF5353' // red
        },
        {
            from: 30,
            to: 50,
            color: '#DDDF0D' // yellow
        },
        {
            from: 50,
            to: 80,
            color: '#55BF3B' // green
        }, {
            from: 80,
            to: 90,
            color: '#DDDF0D' // yellow
        }, {
            from: 90,
            to: 100,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Air Humidity',
        data: [60],
        tooltip: {
            valueSuffix: ' %'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,              
            newVal = valueAirHumidity;

            if (newVal <= 0 || newVal > 100) {
                
                newVal = ahvalue                
                //hacer una consulta ala base de datos para optener valor ultimo registrado y mostrarlo.
            }

            point.update(newVal);

        }, 3000);
    }
});

 /* Sharp Rotoplas -- -  DATO INGRESA PERMANTE*/
Highcharts.chart('container-value-water-level-rotoplas', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10, /**reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' L'
        },
        plotBands: [
         {
            from: 0,
            to: 250,
            color: '#DF5353' // red
        },
        {
            from: 25,
            to: 80,
            color: '#DDDF0D' // yellow
        },
        {
            from: 80,
            to: 95,
            color: '#55BF3B' // green
        }, {
            from: 95,
            to: 99,
            color: '#DDDF0D' // yellow
        }, {
            from: 99,
            to: 100,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Water Level Rotoplas',
        data: [90],
        tooltip: {
            valueSuffix: ' L'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,             
            newVal = valueWaterLevelRotoplas;

            if (newVal <= 0 || newVal > 100) {                
                newVal = 0;
            }

            point.update(newVal);

        }, 3000);
    }
});

 /* Boya -> ES 0 - 1*/
 Highcharts.chart('container-value-buoy', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 0, /** 10 reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 0, //2
        tickPosition: 'inside',
        tickLength: 0,//10
        tickColor: '#666',
        labels: {
            step: 2, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' ' // lleno o vacio
        },
        plotBands: [
         {
            from: 0,
            to: 50,
            color: '#DF5353' // red
        }
        ,
        {
            from: 50,
            to: 100,
            color: '#55BF3B' // yellow
        },
        ]
    },

    series: [{
        name: 'Buoy',
        data: [50],
        tooltip: {
            valueSuffix: ' estado'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,
              
            newVal = valueBuoy*100  // recibiendo valor de cloudMqtt 0-1
            if (newVal < 0 || newVal > 100 || newVal == 50) { /// definir bien la logica
                
                newVal = bvalue*100  
                //hacer una consulta ala base de datos para optener valor ultimo registrado y mostrarlo.
            }

            point.update(newVal);

        }, 3000);
    }
});

 /* HumiditySeedling    */
 Highcharts.chart('container-value-seedling-humidity', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10, /**reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' %'
        },
        plotBands: [
         {
            from: 0,
            to: 30,
            color: '#DF5353' // red
        },
        {
            from: 30,
            to: 50,
            color: '#DDDF0D' // yellow
        },
        {
            from: 50,
            to: 85,
            color: '#55BF3B' // green
        }, {
            from: 85,
            to: 95,
            color: '#DDDF0D' // yellow
        }, {
            from: 95,
            to: 100,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Seedling Humidity',
        data: [80],
        tooltip: {
            valueSuffix: ' %'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,               
            newVal = valueSeedlingHumidity;

            if (newVal <= 0 || newVal > 100) {
                
                newVal = slhvalue
                //hacer una consulta ala base de datos para optener valor ultimo registrado y mostrarlo.
            }

            point.update(newVal);

        }, 3000);
    }
});


//------------------CAlibracion--------------------------

Highcharts.chart('container-value-calibration-water-ph', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 14,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10, /**reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 1, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' pH2'
        },
        plotBands: [
         {
            from: 0,
            to: 5,
            color: '#DF5353' // red
        },
        {
            from: 5,
            to: 5.5,
            color: '#DDDF0D' // yellow
        },
        {
            from: 5.5,
            to: 6.5,
            color: '#55BF3B' // green
        }, {
            from: 6.5,
            to: 7.5,
            color: '#DDDF0D' // yellow
        }, {
            from: 7.5,
            to: 14,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Water pH Consulta',
        data: [6],
        tooltip: {
            valueSuffix: ' pH2'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,
            newVal = valueWaterPhCalibration;

            if (newVal < 1 || newVal > 14) {               
                newVal = 0                            
                //hacer una consulta ala base de datos para optener valor ultimo registrado y mostrarlo.
            }

            point.update(newVal);

        }, 3000);
    }
});

/* Water EC  */
Highcharts.chart('container-value-calibration-water-ec', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 10,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10, /**reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 1, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' mS/cm'
        },
        plotBands: [
         {
            from: 0,
            to: 1,
            color: '#DF5353' // red
        },
        {
            from: 1,
            to: 1.5,
            color: '#DDDF0D' // yellow
        },
        {
            from: 1.5,
            to: 2.5,
            color: '#55BF3B' // green
        }, {
            from: 2.5,
            to: 3,
            color: '#DDDF0D' // yellow
        }, {
            from: 3,
            to: 10,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Water EC',
        data: [2],
        tooltip: {
            valueSuffix: ' mS'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,
            newVal = valueWaterEcCalibration;

            if (newVal <= 0 || newVal > 10) {               
               newVal = 0               
                //hacer una consulta ala base de datos para optener valor ultimo registrado y mostrarlo.
            }

            point.update(newVal);

        }, 3000);
    }
});

/* Water Temp  */
Highcharts.chart('container-value-calibration-water-temp', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 40,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10, /**reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' °C'
        },
        plotBands: [
         {
            from: 0,
            to: 15,
            color: '#DF5353' // red
        },
        {
            from: 15,
            to: 20,
            color: '#DDDF0D' // yellow
        },
        {
            from: 20,
            to: 28,
            color: '#55BF3B' // green
        }, {
            from: 28,
            to: 32,
            color: '#DDDF0D' // yellow
        }, {
            from: 32,
            to: 40,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Water Temp',
        data: [25],
        tooltip: {
            valueSuffix: ' °C'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,
                newVal = valueWaterTempCalibration;

            if (newVal <= 0 || newVal > 40) {               
                newVal = 0
               
                //hacer una consulta ala base de datos para optener valor ultimo registrado y mostrarlo.
            }

            point.update(newVal);

        }, 3000);
    }
});
/* total agua - añadido */
Highcharts.chart('container-value-total-water', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -150, /** -150 */
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%' /** 109% */
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%' /**107% */
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%', /**105% */
            innerRadius: '103%'  /**103% */
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 1000,    /*Unidades segun variable*/

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10, /**reglas internas***/ 
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2, /** Pasos entre las reglas */
            rotation: 'auto'
        },
        title: {
            text: ' L'
        },
        plotBands: [
         
        {
            from: 0,
            to: 1000,
            color: '#55BF3B' // green
        }]
    },

    series: [{
        name: 'total water consumption',
        data: [0],
        tooltip: {
            valueSuffix: ' L'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,               
            newVal = 0 ;
            if (newVal <= 0) {
                
                 newVal = tcwvalue   ;             
            }
            point.update(newVal);

        }, 3000);
    }
});
