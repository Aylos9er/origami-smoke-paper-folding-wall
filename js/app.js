"use strict";

// Initialize Paper.js
paper.install(window);
window.onload = function() {
    try {
        // Setup Paper.js
        paper.setup('canvas');
        const view = paper.view;

        // UI Controls
        const rowsSlider = document.getElementById('rows');
        const colsSlider = document.getElementById('cols');
        const rowsValue = document.getElementById('rows-value');
        const colsValue = document.getElementById('cols-value');
        const smokeToggle = document.getElementById('smoke-toggle');
        const refreshBtn = document.getElementById('refresh');
        const downloadBtn = document.getElementById('download');

        // Parameters for polygon mesh
        let rows = parseInt(rowsSlider.value);
        let cols = parseInt(colsSlider.value);
        let points = [];
        let triangles = [];

        function createMesh() {
            // Clear existing paths
            paper.project.activeLayer.removeChildren();
            points = [];
            triangles = [];

            const width = view.size.width;
            const height = view.size.height;
            const cellWidth = width / cols;
            const cellHeight = height / rows;

            // Create mesh grid points
            for (let y = 0; y <= rows; y++) {
                for (let x = 0; x <= cols; x++) {
                    points.push(new paper.Point(
                        x * cellWidth + Math.random() * (cellWidth * 0.2) - cellWidth * 0.1,
                        y * cellHeight + Math.random() * (cellHeight * 0.2) - cellHeight * 0.1
                    ));
                }
            }

            // Create triangles
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const topLeft = y * (cols + 1) + x;
                    const topRight = topLeft + 1;
                    const bottomLeft = (y + 1) * (cols + 1) + x;
                    const bottomRight = bottomLeft + 1;

                    // Randomly choose diagonal direction
                    if (Math.random() > 0.5) {
                        createTriangle(points[topLeft], points[bottomLeft], points[bottomRight]);
                        createTriangle(points[topLeft], points[bottomRight], points[topRight]);
                    } else {
                        createTriangle(points[topLeft], points[bottomLeft], points[topRight]);
                        createTriangle(points[bottomLeft], points[bottomRight], points[topRight]);
                    }
                }
            }

            // Start animation
            startAnimation();
        }

        function createTriangle(p1, p2, p3) {
            const triangle = new paper.Path({
                segments: [p1, p2, p3],
                closed: true,
                fillColor: {
                    gradient: {
                        stops: [
                            [new paper.Color('#ffb87c').multiply(0.3), 0],
                            [new paper.Color('#ffb87c').multiply(0.1), 1]
                        ]
                    },
                    origin: p1,
                    destination: p3
                },
                strokeColor: new paper.Color('#ffb87c').multiply(0.2)
            });
            triangles.push(triangle);
            return triangle;
        }

        function startAnimation() {
            let frame = 0;
            view.onFrame = function(event) {
                frame++;
                triangles.forEach((triangle, index) => {
                    const offset = Math.sin(frame * 0.02 + index * 0.1) * 2;
                    triangle.segments.forEach(segment => {
                        segment.point.y += Math.sin(frame * 0.05 + segment.point.x * 0.01) * 0.2;
                        segment.point.x += Math.cos(frame * 0.05 + segment.point.y * 0.01) * 0.2;
                    });
                });
            };
        }

        // Event Listeners
        rowsSlider.addEventListener('input', function() {
            rows = parseInt(this.value);
            rowsValue.textContent = rows;
            createMesh();
        });

        colsSlider.addEventListener('input', function() {
            cols = parseInt(this.value);
            colsValue.textContent = cols;
            createMesh();
        });

        smokeToggle.addEventListener('change', function() {
            const smokeLayer = document.querySelector('.smoke-layer');
            smokeLayer.style.display = this.checked ? 'block' : 'none';
        });

        refreshBtn.addEventListener('click', createMesh);

        downloadBtn.addEventListener('click', function() {
            const canvas = document.getElementById('canvas');
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'origami-wall.png';
            link.href = dataUrl;
            link.click();
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                paper.view.viewSize = new paper.Size(
                    canvas.offsetWidth,
                    canvas.offsetHeight
                );
                createMesh();
            }, 250);
        });

        // Initial creation
        createMesh();

    } catch (error) {
        console.error('Error initializing Paper.js:', error);
        document.body.innerHTML = `
            <div style="color: #ffb87c; text-align: center; padding: 20px;">
                <h2>Error Initializing Animation</h2>
                <p>Please refresh the page or check console for details.</p>
            </div>
        `;
    }
};
