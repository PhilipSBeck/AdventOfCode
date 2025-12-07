function Year2025Day7PartOne(value) {
    let lines = value.split("\n");

    let beams = new Map();
    for(let i = 0; i < lines[0].length; i++){
        if(lines[0][i] == "S"){
            beams.set(i, true);
            break;
        }
    }

    let totalSplits = 0;
    for (let i = 1; i < lines.length; i++) {
        let line = lines[i];
        let beamArray = Array.from(beams.keys());
        for (let j = 0; j < beamArray.length; j++){
            beam = beamArray[j];
            if (line[beam] == "^") {
                totalSplits++;
                beams.delete(beam);
                beams.set(beam - 1, true);
                beams.set(beam + 1, true);
            }
        }
    }

    return totalSplits;
}

function Year2025Day7PartTwo(value) {
    let lines = value.split("\n");
    let beams = new Map();
    for(let i = 0; i < lines[0].length; i++){
        if(lines[0][i] == "S"){
            beams.set(i, 1);
        }
    }
    for (let i = 1; i < lines.length; i++) {
        let line = lines[i];
        let beamArray = Array.from(beams.keys());
        
        for (let j = 0; j < beamArray.length; j++){
            beam = beamArray[j];
            if (line[beam] == "^") {
                let timelineCount = beams.get(beam);
                beams.delete(beam);
                let leftBeam = beam - 1;
                if (beams.has(leftBeam)) {
                    beams.set(leftBeam, beams.get(leftBeam) + timelineCount);
                }
                else {
                    beams.set(leftBeam, timelineCount);
                }
                let rightBeam = beam + 1;
                if (beams.has(rightBeam)) {
                    beams.set(rightBeam, beams.get(rightBeam) + timelineCount);
                }
                else {
                    beams.set(rightBeam, timelineCount);
                }
            }
        }
    }


    let beamArray = Array.from(beams.keys());
    let totalTimelines = 0;
    for(let i = 0; i < beamArray.length; i++){
        totalTimelines += beams.get(beamArray[i]);
    }

    return totalTimelines;
}