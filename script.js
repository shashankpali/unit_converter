const inchToMM = 25.4;
const inchToCM = 2.54;
const inchToFeet = 0.0833333;
let inchToPixel = 45;

const units = ["mm", "cm", "inch", "feet", "pixel"];

const converters = {
    mm: (val) => val / inchToMM,
    cm: (val) => val / inchToCM,
    inch: (val) => val,
    feet: (val) => val / inchToFeet,
    pixel: (val) => val / inchToPixel,
};

const unitLabels = {
    mm: "mm",
    cm: "cm",
    inch: "inch",
    feet: "ft",
    pixel: "px",
};

let activeField = null;

function fromUnit(unit, value) {
    activeField = unit;
    const val = parseFloat(value);
    if (isNaN(val)) return;

    const inch = converters[unit](val);
    updateFields(inch);
}

function updateFields(inchVal) {
    units.forEach((unit) => {
        if (unit === activeField) return;

        let result = inchVal;
        if (unit === "mm") result = inchVal * inchToMM;
        if (unit === "cm") result = inchVal * inchToCM;
        if (unit === "feet") result = inchVal * inchToFeet;
        if (unit === "pixel") result = inchVal * inchToPixel;

        document.getElementById(unit).value = result.toFixed(2);
    });
}

function copyValue(id) {
    const input = document.getElementById(id);
    const value = input.value.trim();
    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
        showToast(`${value}${unitLabels[id]} is copied to clipboard`);
    });
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.display = "block";
    toast.style.opacity = 1;

    setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => {
            toast.style.display = "none";
        }, 300);
    }, 1500);
}

function clearAll() {
    activeField = null;
    units.forEach((id) => {
        document.getElementById(id).value = "";
    });
}

function editPixelFactor() {
    const val = prompt("Set how many pixels = 1 inch", inchToPixel);
    const parsed = parseFloat(val);

    if (!isNaN(parsed) && parsed > 0) {
        inchToPixel = parsed;
        document.getElementById("pxLabel").innerText =
            `current 1 inch = ${parsed} pixel`;

        const inch = parseFloat(document.getElementById("inch").value);
        if (!isNaN(inch)) updateFields(inch);
    }
}
