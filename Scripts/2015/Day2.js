function Year2015Day2PartOne(value) {
    let totalWrapping = 0;

    let boxes = value.split("\n");
    for (i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        let dimensions = box.split("x");
        let face1 = dimensions[0] * dimensions[1];
        let face2 = dimensions[0] * dimensions[2];
        let face3 = dimensions[1] * dimensions[2];
        
        let wrappingNeeded = Math.min(face1, Math.min(face2, face3));
        wrappingNeeded += 2 * (face1 + face2 + face3);
        
        totalWrapping += wrappingNeeded;
    }
    return totalWrapping;
}

function Year2015Day2PartTwo(value) {
    let totalRibbon = 0;

    let boxes = value.split("\n");
    for (i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        let dimensions = box.split("x");
        let side1 = parseInt(dimensions[0]);
        let side2 = parseInt(dimensions[1]);
        let side3 = parseInt(dimensions[2]);
        
        // perimeter
        totalRibbon += 2 * (side1 + side2 + side3 - Math.max(side1, Math.max(side2, side3)));
        // volume
        totalRibbon += side1 * side2 * side3;
    }
    return totalRibbon;
}