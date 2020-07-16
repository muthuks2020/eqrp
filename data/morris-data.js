$(function () {

    Morris.Area({
        element: 'morris-area-chart',
        data:  [
            { y: '2019 Q4', a: 234, b: 498, c: 450, d: 3701},
            { y: '2020 Q1', a: 177, b: 678, c: 745, d: 3821},
            { y: '2020 Q2', a: 145, b: 521, c: 987, d: 4008},
            { y: '2019 Q1', a: 101, b: 632, c: 394, d: 3811},
            { y: '2019 Q2', a: 156, b: 401, c: 376, d: 3245},
            { y: '2019 Q3', a: 178, b: 702, c: 563, d: 3666}
          ],
          
            xkey: 'y',
            ykeys: ['a', 'b','c','d'],
            labels: ['Poison', 'BLQ','DLQ','Transactions'],
            fillOpacity: 0.6,
            hideHover: 'auto',
            behaveLikeLine: true,
            resize: true,
            pointFillColors:['#ffffff'],
            pointStrokeColors: ['black'],
            fillOpacity:0.05,
            lineColors:['rgb(255, 0, 0)','rgb(77, 24, 24)','rgb(109, 107, 107)','rgb(15, 163, 15)']
    });

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "BLQ",
            value: 8
        }, {
            label: "DLQ",
            value: 4
        }, {
            label: "Poison",
            value: 2
        }, {
            label: "Transactions",
            value: 40
        }],
        resize: true,
        colors:['rgb(255, 0, 0)','rgb(77, 24, 24)','rgb(109, 107, 107)','rgb(15, 163, 15)']
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: '2006',
            a: 100,
            b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: true
    });

});
