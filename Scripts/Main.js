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
    let yearSelection = document.getElementById("year_selection");
    year = yearSelection.value;
    let numDays = 25;
    if (year >= 2025)
    {
        numDays = 12;
    }

    let daySelection = document.getElementById("day_selection");
    daySelection.innerHTML = "";

    for (i = 1; i <= numDays; i++) {
        let newOption = document.createElement("option");
        newOption.value = i;
        newOption.innerText = i;
        daySelection.appendChild(newOption);
    }

    SelectionChanged()
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

    
    localStorage.setItem("year", year)
    localStorage.setItem("day", day)
    localStorage.setItem("part", part)
}

window.onload = function() {
    YearSelectionChanged();

    let input = document.getElementById("input");
    input.value = localStorage.getItem("input");
}