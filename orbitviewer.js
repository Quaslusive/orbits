(function (global) {
    if (typeof global === 'undefined' || !global.document) {
        console.warn("OrbitViewer: Not running in a browser. Skipping initialization.");
        return;
    }

    function OrbitViewer(config) {
        this.config = config;
        this.elementId = config.elementId || 'viewer';
        this.options = config.options || {};
        this.init();
    }

    OrbitViewer.prototype.init = function () {
        const container = document.getElementById(this.elementId);
        if (!container) {
            console.error(`❌ OrbitViewer: Container #${this.elementId} not found`);
            return;
        }

        container.innerHTML = `<p style="color:white; text-align:center;">🛰️ OrbitViewer initialized.</p>`;
    };

    OrbitViewer.prototype.drawOrbit = function (params) {
        console.log("📈 Drawing orbit with parameters:", params);

        const container = document.getElementById(this.elementId);
        if (container) {
            container.innerHTML += `
                <div style="color:white; padding:20px; text-align:center;">
                    <h3>${params.name}</h3>
                    <p>Semi-Major Axis: ${params.semiMajorAxis}</p>
                    <p>Eccentricity: ${params.eccentricity}</p>
                    <p>Inclination: ${params.inclination}</p>
                    <p>Ascending Node: ${params.ascendingNode}</p>
                    <p>Argument of Periapsis: ${params.argumentOfPeriapsis}</p>
                    <p>Mean Anomaly: ${params.meanAnomaly}</p>
                </div>
            `;
        } else {
            console.error("❌ Cannot draw orbit – viewer container not found");
        }
    };

    global.OrbitViewer = OrbitViewer;

    global.addEventListener("DOMContentLoaded", function () {
        const viewerContainer = document.getElementById("viewer");
        if (!viewerContainer) {
            console.error("❌ Missing <div id='viewer'> element!");
            return;
        }

        global.viewer = new OrbitViewer({
            elementId: "viewer",
            options: {
                showStats: false,
                enableControls: true,
                enableZoom: true
            }
        });

        console.log("✅ OrbitViewer initialized");

        global.loadOrbitFromFlutter = function (params) {
            console.log("📡 Received orbit from Flutter:", params);

            if (typeof viewer !== "undefined" && typeof viewer.drawOrbit === "function") {
                viewer.drawOrbit(params);
            } else {
                console.warn("⚠️ Viewer not ready or drawOrbit() missing.");
            }
        };
    });
})(typeof window !== 'undefined' ? window : {});
