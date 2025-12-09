function Year2025Day9PartOne(value) {
    let lines = value.split("\n");
    let corners = [];
    for(let i = 0; i < lines.length; i++){
        let coords = lines[i].split(",");
        corners.push([parseInt(coords[0]),parseInt(coords[1])]);
    }
    let largestRectangle = 0;
    for (let i = 0; i < corners.length - 1; i++){
        for(let j = i + 1; j < corners.length;j++){
            let x = Math.abs(corners[j][0] - corners[i][0]) + 1;
            let y = Math.abs(corners[j][1] - corners[i][1]) + 1;
            let rectangle = x * y;
            if (rectangle > largestRectangle) {
                largestRectangle = rectangle;
            }
        }
    }
    return largestRectangle;
}

// These two have been borrowed off the internet and translated into JS
// this is realy cool but I don't really know how it works
function DoLinesCross(l1Start, l1End, l2Start,l2End){
  var det, gamma, lambda;
  det = (l1End[0] - l1Start[0]) * (l2End[1] - l2Start[1]) - (l2End[0] - l2Start[0]) * (l1End[1] - l1Start[1]);
  if (det === 0) {
    return false;
  } else {
    lambda = ((l2End[1] - l2Start[1]) * (l2End[0] - l1Start[0]) + (l2Start[0] - l2End[0]) * (l2End[1] - l1Start[1])) / det;
    gamma = ((l1Start[1] - l1End[1]) * (l2End[0] - l1Start[0]) + (l1End[0] - l1Start[0]) * (l2End[1] - l1Start[1])) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};
function IsPointInsideShape(polygon, point) {
    const num_vertices = polygon.length;
    const x = point[0];
    const y = point[1];
    let inside = false;

    let p1 = polygon[0];
    let p2;

    for (let i = 1; i <= num_vertices; i++) {
        p2 = polygon[i % num_vertices];

        if (y > Math.min(p1[1], p2[1])) {
            if (y <= Math.max(p1[1], p2[1])) {
                if (x <= Math.max(p1[0], p2[0])) {
                    const x_intersection = ((y - p1[1]) * (p2[0] - p1[0])) / (p2[1] - p1[1]) + p1[0];

                    if (p1[0] === p2[0] || x <= x_intersection) {
                        inside = !inside;
                    }
                }
            }
        }

        p1 = p2;
    }

    return inside;
}

// Check if the square crosses any of the vertices
function IsSquareInsideShape(vertices, corner1, corner2) {
    let p1 = vertices[0];
    let p2;
    let linesCross = false;
    for (let i = 1; i <= vertices.length; i++) {
        p2 = vertices[i % vertices.length];

        linesCross |= DoLinesCross(p1,p2,[corner1[0],corner1[1]], [corner1[0], corner2[1]]);
        linesCross |= DoLinesCross(p1,p2,[corner1[0],corner1[1]], [corner2[0], corner2[1]]);
        linesCross |= DoLinesCross(p1,p2,[corner1[0],corner2[1]], [corner2[0], corner2[1]]);
        linesCross |= DoLinesCross(p1,p2,[corner2[0],corner1[1]], [corner2[0], corner2[1]]);

        if (linesCross){
            return false;
        }

        p1 = p2;
    }
    return true;
}

function Year2025Day9PartTwo(value) {
    let lines = value.split("\n");
    let corners = [];
    for(let i = 0; i < lines.length; i++){
        let coords = lines[i].split(",");
        corners.push([parseInt(coords[0]),parseInt(coords[1])]);
    }

    let currentPos = 0;
    let vertices = [corners[currentPos]];
    while(vertices.length != corners.length){
        for(let j = 0; j < corners.length;j++){
            if(currentPos != j && (corners[j][0] == corners[currentPos][0] || corners[j][1] == corners[currentPos][1]))
            {
                vertices.push(corners[j]);
                currentPos = j;
            }
        }
    }

    let largestRectangle = 0;
    for (let i = 0; i < corners.length - 1; i++){
        for(let j = i + 1; j < corners.length;j++){
            let x = Math.abs(corners[j][0] - corners[i][0]) + 1;
            let y = Math.abs(corners[j][1] - corners[i][1]) + 1;
            let rectangle = x * y;
            if (rectangle > largestRectangle) {
                let corner1 = [Math.min(corners[i][0], corners[j][0]) + 1,Math.min(corners[i][1], corners[j][1]) + 1];
                let corner2 = [Math.max(corners[i][0], corners[j][0]) - 1,Math.max(corners[i][1], corners[j][1]) - 1];
                if (IsPointInsideShape(vertices, corner1)) {
                    if (IsSquareInsideShape(vertices, corner1, corner2)){
                        largestRectangle = rectangle;
                    }
                }
            }
        }
    }

    return largestRectangle;
}