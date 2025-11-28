var CurrentFunction = "NoFunction"

function NoFunction() {
    return "No function for this day and part!";
}

function InputChanged() {
    let input = document.getElementById("input");
    let value = input.value;
    localStorage.setItem("input", value)
}

function Run() {
    let input = document.getElementById("input");
    let value = input.value;
    let answer = window[CurrentFunction](value);
    document.getElementById("answer_output_box").innerText = answer;
}

function YearSelectionChanged() {
    SetDaysForYear(document.getElementById("day_selection").value);
    SelectionChanged();
}

function SetDaysForYear(selection = 1) {
    let yearSelection = document.getElementById("year_selection");
    year = yearSelection.value;
    let numDays = 25;
    if (year >= 2025)
    {
        numDays = 12;
        if (selection >= numDays) {
            selection = numDays;
        }
    }

    let daySelection = document.getElementById("day_selection");
    daySelection.innerHTML = "";

    //TODO check if the option actually has a function
    for (i = 1; i <= numDays; i++) {
        let newOption = document.createElement("option");
        newOption.value = i;
        newOption.innerText = i;
        
        CurrentFunction = "Year" + year + "Day" + i;
        if (typeof window[CurrentFunction + "PartOne"] === "function" || typeof window[CurrentFunction + "PartTne"] === "function")
        {
            daySelection.appendChild(newOption);
        }
    }
    
    daySelection.value = selection;
}

function DaySelectionChanged() {
    SelectionChanged()
}

function PartSelectionChanged() {
    SelectionChanged()
}

function SelectionChanged() {
    let yearSelection = document.getElementById("year_selection");
    year = yearSelection.value;
    let daySelection = document.getElementById("day_selection");
    day = daySelection.value;
    let parts = document.getElementsByName('part');
    let part = ""
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].checked) {
            part = parts[i].value;
        }
    }
    CurrentFunction = "Year" + year + "Day" + day + "Part" + part;
    
    if (typeof window[CurrentFunction] !== "function")
    {
        CurrentFunction = "NoFunction";
    }

    
    localStorage.setItem("year", year);
    localStorage.setItem("day", day);
    localStorage.setItem("part", part);
}

window.onload = function() {
    if (localStorage.getItem("year") !== null) {
        document.getElementById("year_selection").value = localStorage.getItem("year");
    }

    if (localStorage.getItem("day") !== null) {
        SetDaysForYear(localStorage.getItem("day"));
    }

    if (localStorage.getItem("part") !== null) {
        part = localStorage.getItem("part");
        if (part == "One") {
            document.getElementById("part_selection_one").checked = "checked";
        }
        else {
                document.getElementById("part_selection_two").checked = "checked";
        }
    }

    YearSelectionChanged();

    let input = document.getElementById("input");
    input.value = localStorage.getItem("input");
}