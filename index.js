$(document).ready(function(){
    var data;
    $.ajax({
        type:"GET",
        url:"MOCK_DATA.csv",
        dataType: "text",
        success: function(response) {
            data = $.csv.toArrays(response);
            console.log(data);
            var shifted = data.shift();
            console.log(data);
            var sorted = data.sort(sortLast);
            //ALWAYS PASS SHIFTED DATA
            console.log(data);
            $('#xml').on('click',function(){
                createXML(sorted,shifted);
            });
            $('#csv').on('click',function(){
                createCSV(sorted,shifted);
            });
            $('#json').on('click',function(){
                createJSON(sorted,shifted);
            });
            generateHtmlTable(sorted,shifted);
            $('#table').tablesorter();
        }
    });
    
    function sortLast(a,b) {
        //only replacing '
        //TODO add other exceptions
        if (a[2].replace(/'/g,'').toLowerCase() === b[2].replace(/'/g,'').toLowerCase()) {
            return (a[1].replace(/'/g,'').toLowerCase() < b[1].replace(/'/g,'').toLowerCase()) ? -1 : 1;
        }
        else {
            return (a[2].replace(/'/g,'').toLowerCase() < b[2].replace(/'/g,'').toLowerCase()) ? -1 : 1
        }
    }
    
    function createJSON(arr,shifted) {
        var parsed = [];
        for (i=0; i < arr.length;i++){
            parsed[i] = {};
            for(u=0;u < shifted.length;u++){
                parsed[i][`${shifted[u]}`]=arr[i][u];
                //console.log(arr[i]);
            }
        }
        console.log(parsed);
        var json = JSON.stringify(parsed);
        var jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);
        var link = document.createElement('a');
        link.setAttribute('href', jsonStr);
        link.setAttribute('download',"sorted_data.json");
        link.click();
    }
    
    function createXML(arr,title) {
        var xmlString = '<root></root>';
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlString, "text/xml");
        var doc = document.implementation.createDocument("", "", null);
        var root = doc.createElement('root');
        arr.forEach(function(rowArray,u){
            var person = doc.createElement('person');
            for (i=0;i<rowArray.length;i++){
                person.setAttribute(`${title[i]}`,`${rowArray[i]}`);
            }
            root.appendChild(person);
        });
        var serializer = new XMLSerializer();
        var xmlString = serializer.serializeToString(root);
        var filename = "sorted_data.xml";
        var link = document.createElement('a');
        var bb = new Blob([xmlString], {type: 'text/xml'});
        link.setAttribute('href',window.URL.createObjectURL(bb));
        link.setAttribute('download',filename);
        
        link.click();
    }
    
    function createCSV(arr,shifted) {
        var csv = "data:text/csv;charset=utf-8,";
        arr.unshift(shifted);
        arr.forEach(function(rowArray){
            var row = rowArray.join(",");
            csv += row + "\r\n";
        });
        var encodedUri = encodeURI(csv);
        var link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download','sorted_data.csv');
        document.body.appendChild(link);
        link.click();
    }

    function generateHtmlTable(data,shifted) {
        data.unshift(shifted);
        console.log(data.length);
        var html = '<table id="table" class="table table-condensed table-hover table-striped">';
     
          if(typeof(data[0]) === 'undefined') {
            return null;
          } else {
            $.each(data, function( index, row ) {
          //bind header
          if(index == 0) {
            html += '<thead>';
            html += '<tr>';
            $.each(row, function( index, colData ) {
            html += `<th id="${colData}">`;
            html += `<a href="javascript:;" class="${colData}">${colData}</a>`;
            html += '</th>';
            });
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';
          } else {
            html += '<tr>';
            $.each(row, function( index, colData ) {
            html += '<td>';
            html += colData;
            html += '</td>';
            });
            html += '</tr>';
          }
            });
            html += '</tbody>';
            html += '</table>';
            $('#table-container').append(html);
          }
        }	
});