function createTable() {
    var columnCount = document.getElementById("columnInput").value;
    var table = document.getElementById("myTable");
    table.innerHTML = '';

    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    var headerRow = document.createElement('tr');

    var th = document.createElement('th');
    th.textContent = 'Material';
    headerRow.appendChild(th);

    for (var i = 2; i <= columnCount; i++) {
      var th = document.createElement('th');
      var input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Column ' + i;
      th.appendChild(input);
      th.setAttribute('data-value', 'column' + i);
      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    table.appendChild(thead);
    table.appendChild(tbody);

    // Enable drag and drop for the table columns
    enableDragAndDrop();
  }

  function addRow() {
    var table = document.getElementById("myTable");
    var tbody = table.querySelector('tbody');

    var row = document.createElement('tr');

    var columnCount = table.rows[0].cells.length;

    for (var i = 0; i < columnCount; i++) {
      var cell = document.createElement('td');
      var input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Row ' + (table.rows.length + 1) + ', Column ' + (i + 1);
      cell.appendChild(input);
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  function enableDragAndDrop() {
    var headers = document.querySelectorAll("#myTable th");
    [].forEach.call(headers, function(header) {
      header.draggable = true;

      header.addEventListener('dragstart', handleDragStart, false);
      header.addEventListener('dragover', handleDragOver, false);
      header.addEventListener('dragenter', handleDragEnter, false);
      header.addEventListener('dragleave', handleDragLeave, false);
      header.addEventListener('drop', handleDrop, false);
      header.addEventListener('dragend', handleDragEnd, false);
    });
  }

  var dragSrcElement = null;

  function handleDragStart(e) {
    dragSrcElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.getAttribute('data-value'));
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (dragSrcElement !== this) {
      var srcValue = e.dataTransfer.getData('text/plain');
      var destValue = this.getAttribute('data-value');
      swapColumns(srcValue, destValue);
      enableDragAndDrop(); // Re-enable drag and drop after swapping columns
    }
    return false;
  }

  function handleDragEnd(e) {
    var headers = document.querySelectorAll('#myTable th');
    [].forEach.call(headers, function(header) {
      header.classList.remove('over');
    });
  }

  function swapColumns(srcValue, destValue) {
    var table = document.getElementById('myTable');
    var rows = table.rows;

    var srcIndex = -1;
    var destIndex = -1;

    // Find the source and destination column indices
    for (var i = 0; i < rows[0].cells.length; i++) {
      if (rows[0].cells[i].getAttribute('data-value') === srcValue) {
        srcIndex = i;
      } else if (rows[0].cells[i].getAttribute('data-value') === destValue) {
        destIndex = i;
      }
    }

    if (srcIndex !== -1 && destIndex !== -1) {
      for (var j = 0; j < rows.length; j++) {
        var srcCell = rows[j].cells[srcIndex].cloneNode(true);
        var destCell = rows[j].cells[destIndex].cloneNode(true);

        rows[j].replaceChild(destCell, rows[j].cells[srcIndex]);
        rows[j].replaceChild(srcCell, rows[j].cells[destIndex]);
      }
    }
  }