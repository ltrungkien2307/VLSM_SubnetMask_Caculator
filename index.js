function calculateVLSM() {
    let ip = document.getElementById('ip').value.trim();
    let SM = parseInt(document.getElementById('cidr').value);
    let subnets = parseInt(document.getElementById('subnets').value);
    let tbody = document.getElementById('result').getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";

    let n = Math.ceil(Math.log2(subnets));
    let m = 32 - SM - n;
    let newSubnetMask = SM + n;
    let step = Math.pow(2, m);
    let subnetMask = 256 - step;

    let ipParts = ip.split('.').map(Number);
    let baseIp = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];

    for (let i = 0; i < subnets; i++) {
        let subnetID = baseIp + (i * step);
        let firstHost = subnetID + 1;
        let lastHost = subnetID + step - 2;
        let broadcast = lastHost + 1;

        let row = tbody.insertRow();
        row.insertCell().innerText = i + 1;
        row.insertCell().innerText = intToIp(subnetID) + "/" + newSubnetMask;
        row.insertCell().innerText = "255.255.255." + subnetMask;
        row.insertCell().innerText = intToIp(firstHost);
        row.insertCell().innerText = intToIp(lastHost);
        row.insertCell().innerText = intToIp(broadcast);
    }
}

function intToIp(int) {
    return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
}
