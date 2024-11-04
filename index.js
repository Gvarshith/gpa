function calculateGPA() {
    const gradePointMap = {
        'S': 10,
        'A': 9,
        'B': 8,
        'C': 7,
        'D': 6,
        'E': 5,
        'F': 0
    };

    let totalCredits = 0;
    let weightedSum = 0;
    let errorMessages = [];

    const creditsInputs = document.querySelectorAll('.credits');
    const gradeInputs = document.querySelectorAll('.grade');

    for (let i = 0; i < creditsInputs.length; i++) {
        const credits = creditsInputs[i].value.trim();
        const grade = gradeInputs[i].value.trim().toUpperCase();
        const rowNum = i + 1;

        if (credits === "" || grade === "") {
            errorMessages.push(`Enter all fields in row ${rowNum}.`);
            continue;
        }

        const creditsNum = parseFloat(credits);

        if (isNaN(creditsNum) || creditsNum >= 5) {
            errorMessages.push(`Credits should be a number less than 5 in row ${rowNum}.`);
            continue;
        }

        if (!gradePointMap.hasOwnProperty(grade) || grade.length !== 1) {
            errorMessages.push(`Grade should be a single letter between S and F in row ${rowNum}.`);
            continue;
        }

        totalCredits += creditsNum;
        weightedSum += creditsNum * gradePointMap[grade];
    }

    if (errorMessages.length > 0) {
        alert(errorMessages.join("\n"));
        document.getElementById('gpa-result').textContent = "0.00";
    } else {
        const gpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : "0.00";
        document.getElementById('gpa-result').textContent = gpa;
        
        // Display the "Created by Varshith" message for 2 seconds
        const createdByMessage = document.getElementById('created-by');
        createdByMessage.style.display = 'block';
        document.getElementById('gpa-result').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            createdByMessage.style.display = 'none';
        }, 6000);
    }
}

