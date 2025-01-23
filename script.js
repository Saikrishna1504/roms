function showROM(device) {
    document.getElementById('device-select').style.display = 'none';
    document.getElementById('begonia-rom').style.display = 'none';
    document.getElementById('duchamp-rom').style.display = 'none';
    document.getElementById(`${device}-rom`).style.display = 'block';
}

function showDevices() {
    document.getElementById('device-select').style.display = 'block';
    document.getElementById('begonia-rom').style.display = 'none';
    document.getElementById('duchamp-rom').style.display = 'none';
}