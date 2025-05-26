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
