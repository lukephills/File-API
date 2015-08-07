import $ = require('jquery');


document.addEventListener('DOMContentLoaded', init);
var output = [];

function init() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }


    // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragenter', handleDragEnter, false);
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('dragleave', handleDragLeave, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
    dropZone.addEventListener('click', handleDropZoneClick, false);

    document.getElementById('fileButton').addEventListener('change', handleFileButtonSelect, false);

}

function handleDropZoneClick() {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, false);
    document.getElementById('fileButton').dispatchEvent(event);
}




function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files; // FileList object.

    printFileData(files);

    console.dir(e.dataTransfer.files[0]);

}

function printFileData(files) {
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', encodeURI(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}


function handleDragEnter(e) {
    document.getElementById('drop_zone').style.borderColor = 'green';
    console.log('file drag entered area');
}

function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    console.log('file drag over');
}

function handleDragLeave(e) {
    document.getElementById('drop_zone').style.borderColor = 'red';
    console.log('file left drag area');
}


function handleFileButtonSelect(e) {
    var files = e.target.files; // FileList object
    printFileData(files);
    console.dir(e.target.files[0]);
}
