(function(global) {
    if (typeof global !== 'undefined'|| typeof !global.document) {
        console.warn("OrbitViewer: Not running in a browser. Skipping initialization.");
        return
    }
    function OrbitViewer(config) {
        this.config = config;
        this.elementId = config.elementId || 'viewer';
        this.options = config.options || {};
        this.init();
    }

    OrbitViewer.prototype.init = function() {
        const container = document.getElementById(this.elementId);
        if (!container) {
            console.error(`❌ Container #${this.elementId} not found`);
            return;
        }

        // Placeholder: this is where you’d initialize your 3D scene using three.js or similar
        container.innerHTML = `<p style="color:white; text-align:center;">🛰️ OrbitViewer initialized.</p>`;
    };

    OrbitViewer.prototype.drawOrbit = function(params) {
        console.log("📈 Drawing orbit with parameters:", params);


        // ✅ Create OrbitViewer and store globally
        window.viewer = new OrbitViewer({
            elementId: "viewer",
            options: {
                showStats: false,
                enableControls: true,
                enableZoom: true
            }
        });

        console.log("✅ OrbitViewer initialized");

        // ✅ Expose a Flutter-callable function
        window.loadOrbitFromFlutter = function (params) {
            console.log("✅ Received orbit from Flutter:", params);

            if (typeof viewer !== "undefined" && typeof viewer.drawOrbit === "function") {
                viewer.drawOrbit({
                    semiMajorAxis: params.semiMajorAxis,
                    eccentricity: params.eccentricity,
                    inclination: params.inclination,
                    ascendingNode: params.ascendingNode,
                    argumentOfPeriapsis: params.argumentOfPeriapsis,
                    meanAnomaly: params.meanAnomaly,
                    name: params.name
                });
            } else {
                console.warn("⚠️ Viewer not ready or drawOrbit() missing.");
            }
        };
    };

    // Make OrbitViewer available globally
    global.OrbitViewer = OrbitViewer;

})(typeof window !== 'undefined' ? window : {});



/*
// Ensure the DOM and WebGL are ready before running this
window.addEventListener("DOMContentLoaded", function () {
    // Ensure the viewer container exists
    const viewerContainer = document.getElementById("viewer");
    if (!viewerContainer) {
        console.error("❌ Missing <div id='viewer'> element!");
        return;
    }

    // ✅ Create OrbitViewer and store globally
    window.viewer = new OrbitViewer({
        elementId: "viewer",
        options: {
            showStats: false,
            enableControls: true,
            enableZoom: true
        }
    });

    console.log("✅ OrbitViewer initialized");

    // ✅ Expose a Flutter-callable function
    window.loadOrbitFromFlutter = function (params) {
        console.log("✅ Received orbit from Flutter:", params);

        if (typeof viewer !== "undefined" && typeof viewer.drawOrbit === "function") {
            viewer.drawOrbit({
                semiMajorAxis: params.semiMajorAxis,
                eccentricity: params.eccentricity,
                inclination: params.inclination,
                ascendingNode: params.ascendingNode,
                argumentOfPeriapsis: params.argumentOfPeriapsis,
                meanAnomaly: params.meanAnomaly,
                name: params.name
            });
        } else {
            console.warn("⚠️ Viewer not ready or drawOrbit() missing.");
        }
    };
});
*/
