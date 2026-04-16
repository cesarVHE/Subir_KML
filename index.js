var map = L.map("map").setView([24.1, -102], 6);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map)

document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(e) {
        var kmlText = e.target.result;
        var parser = new DOMParser();
        var kml = parser.parseFromString(kmlText, 'text/xml');

        var layer = omnivore.kml.parse(kml.documentElement)
            .on('ready', function() {
                var bounds = layer.getBounds();
                console.log("Bounds calculados:", bounds);
                if (bounds && bounds.isValid && bounds.isValid()) {
                    map.fitBounds(bounds);
                } else {
                    console.warn("Límites no válidos para el KML.");
                }
            })
            .addTo(map);
    };

    reader.readAsText(file);
});
