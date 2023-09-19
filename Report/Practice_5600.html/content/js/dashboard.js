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

    var data = {"OkPercent": 90.42261904761905, "KoPercent": 9.577380952380953};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.19488095238095238, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Delete Booking"], "isController": false}, {"data": [0.012678571428571428, 500, 1500, "Create Booking"], "isController": false}, {"data": [0.004464285714285714, 500, 1500, "Get Updated Booking"], "isController": false}, {"data": [0.018125, 500, 1500, "Update"], "isController": false}, {"data": [0.1874107142857143, 500, 1500, "Get Booking"], "isController": false}, {"data": [0.9466071428571429, 500, 1500, "Create Token"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 33600, 3218, 9.577380952380953, 13360.63601190486, 0, 34897, 16069.0, 30309.0, 30339.0, 30479.0, 324.23669278573357, 136.2086339629492, 97.22894029605898], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Delete Booking", 5600, 102, 1.8214285714285714, 20398.627857142837, 1539, 30733, 20391.0, 26146.9, 28752.9, 30327.0, 71.51248914542575, 17.90793994148107, 16.818504335444654], "isController": false}, {"data": ["Create Booking", 5600, 0, 0.0, 13175.05589285715, 1251, 34897, 14371.0, 18724.300000000003, 23131.449999999997, 24492.0, 120.72868384175919, 51.855226635765874, 53.1724964967123], "isController": false}, {"data": ["Get Updated Booking", 5600, 817, 14.589285714285714, 11670.093750000002, 0, 32839, 13946.5, 14805.0, 15373.95, 15888.919999999998, 75.88590012873502, 49.17162568178738, 13.852246934074124], "isController": false}, {"data": ["Update", 5600, 2299, 41.05357142857143, 27455.26642857138, 357, 31418, 30221.0, 30357.0, 30441.0, 31008.98, 79.58388994684933, 41.91059680367649, 36.04801590967229], "isController": false}, {"data": ["Get Booking", 5600, 0, 0.0, 7095.652321428569, 297, 16809, 6668.5, 15203.0, 16102.95, 16491.989999999998, 124.33392539964476, 49.90355794849023, 26.0842792517762], "isController": false}, {"data": ["Create Token", 5600, 0, 0.0, 369.1198214285714, 291, 2107, 327.0, 552.0, 591.9499999999998, 1141.0, 124.98884028211766, 33.0781012855995, 34.78693308633157], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["503/Service Unavailable", 2399, 74.54940957116222, 7.1398809523809526], "isController": false}, {"data": ["405/Method Not Allowed", 2, 0.062150403977625855, 0.005952380952380952], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 816, 25.35736482287135, 2.4285714285714284], "isController": false}, {"data": ["404/Not Found", 1, 0.031075201988812928, 0.002976190476190476], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 33600, 3218, "503/Service Unavailable", 2399, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 816, "405/Method Not Allowed", 2, "404/Not Found", 1, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Delete Booking", 5600, 102, "503/Service Unavailable", 101, "405/Method Not Allowed", 1, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Get Updated Booking", 5600, 817, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 816, "404/Not Found", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["Update", 5600, 2299, "503/Service Unavailable", 2298, "405/Method Not Allowed", 1, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
