            function sortTable(table, order) {
                var asc   = order === 'asc',
                    tbody = table.find('tbody');
                
                tbody.find('tr').sort(function(a, b) {
                    if (asc) {
                        return $('td:first', a).text().localeCompare($('td:first', b).text());
                    } else {
                        return $('td:first', b).text().localeCompare($('td:first', a).text());
                    }
                }).appendTo(tbody);
            }

            sortTable($('#myTable'),'asc');