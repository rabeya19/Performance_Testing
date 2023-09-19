/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 78.71666666666667, "KoPercent": 21.283333333333335};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.14190277777777777, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [3.333333333333333E-4, 500, 1500, "Delete Booking"], "isController": false}, {"data": [0.006583333333333333, 500, 1500, "Create Booking"], "isController": false}, {"data": [3.333333333333333E-4, 500, 1500, "Get Updated Booking"], "isController": false}, {"data": [3.333333333333333E-4, 500, 1500, "Update"], "isController": false}, {"data": [0.05575, 500, 1500, "Get Booking"], "isController": false}, {"data": [0.7880833333333334, 500, 1500, "Create Token"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 36000, 7662, 21.283333333333335, 13530.380583333283, 0, 159360, 19237.5, 30785.800000000017, 31238.0, 31883.960000000006, 194.86529936181614, 95.23870766585202, 57.762242260193894], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Delete Booking", 6000, 2752, 45.86666666666667, 22683.563000000002, 312, 37772, 29397.5, 31306.0, 31540.0, 32233.0, 35.71067213436736, 16.118532648482, 8.402208509778772], "isController": false}, {"data": ["Create Booking", 6000, 0, 0.0, 13005.31833333335, 1229, 159360, 13106.5, 18204.200000000004, 19545.8, 21479.94, 32.96703296703297, 14.163348858173077, 14.519660027472527], "isController": false}, {"data": ["Get Updated Booking", 6000, 1467, 24.45, 11083.789499999993, 0, 21622, 13437.5, 19819.9, 19931.95, 20128.98, 35.45177377041431, 28.759351328555223, 5.726828988398407], "isController": false}, {"data": ["Update", 6000, 3443, 57.38333333333333, 24356.393500000075, 363, 31793, 30299.0, 30343.0, 30438.95, 31101.989999999998, 35.05471456698664, 20.129154257541146, 15.881856802586453], "isController": false}, {"data": ["Get Booking", 6000, 0, 0.0, 9362.852999999996, 318, 22154, 8570.5, 19166.7, 19895.0, 20143.0, 34.883315310287095, 14.001018156765618, 7.3218341483674605], "isController": false}, {"data": ["Create Token", 6000, 0, 0.0, 690.366166666667, 291, 7282, 361.0, 1193.9000000000005, 1415.8499999999995, 6063.0, 34.88514067432977, 9.23229797142907, 9.709243254085923], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["503/Service Unavailable", 6195, 80.85356303837118, 17.208333333333332], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 1467, 19.14643696162882, 4.075], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 36000, 7662, "503/Service Unavailable", 6195, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 1467, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Delete Booking", 6000, 2752, "503/Service Unavailable", 2752, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Get Updated Booking", 6000, 1467, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 1467, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Update", 6000, 3443, "503/Service Unavailable", 3443, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
