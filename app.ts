import $ = require('jquery');


document.addEventListener('DOMContentLoaded', init);
var output = [];
var Player = new Tone.Player();

function init() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
    } else {
      console.error('The File APIs are not fully supported in this browser.');
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


function handleFileButtonSelect(e) {
    var files = e.target.files; // FileList object
    printFileData(files);
    console.dir(e.target.files[0]);
}

function printFileData(files) {
    // files is a FileList of File objects. List some properties.
    // Loop through the FileList and play the audio files.
    for (var i = 0, f; f = files[i]; i++) {
        console.log(f.type);

        // Only process audio files.
        if (!f.type.match('audio.*')) {
            console.log('not an audio file');
            continue;
        }

        var reader = new FileReader();

        reader.onload = function(ev:any) {
            Player.context.decodeAudioData(ev.target.result, function(theBuffer){

                playBuffer(theBuffer);

            }, function(){ //error function
            	console.error('Sorry, we could not process this audio file.');

            });
        };

    reader.readAsArrayBuffer(f);

    }
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


function playBuffer(buffer: AudioBuffer) {
    console.log(buffer);
    Player.buffer = buffer;
    Player.volume.value = 0.5;
    Player.loop = true;
    Player.toMaster();
    Player.start();
    console.log(Player);
    document.getElementById('drop_zone').style.borderColor = 'green';
}
