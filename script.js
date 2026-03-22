document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    loadGoals();
});

// --- STRESS ANALYZER LOGIC ---
function analyzeStress() {
    const sleep = document.getElementById('sleepHours').value;
    const study = document.getElementById('studyHours').value;
    const screen = document.getElementById('screenTime').value;
    const mood = document.getElementById('mood').value;
    const exams = document.getElementById('exams').value;

    const resultDiv = document.getElementById('stressResult');
    resultDiv.style.display = 'block';

    let stressScore = 0;

    // Logic calculation
    if (sleep < 6) stressScore += 3;
    if (study > 8) stressScore += 2;
    if (screen > 5) stressScore += 2;
    if (mood === 'anxious') stressScore += 3;
    if (exams === 'yes') stressScore += 2;

    let level = "";
    let suggestion = "";
    let cssClass = "";

    if (stressScore <= 4) {
        level = "Low Stress";
        suggestion = "You're doing great! Keep maintaining this balance.";
        cssClass = "low-stress";
    } else if (stressScore <= 8) {
        level = "Medium Stress";
        suggestion = "Try to take more breaks and maybe reduce screen time.";
        cssClass = "med-stress";
    } else {
        level = "High Stress";
        suggestion = "Please prioritize sleep and reach out to a friend. Take a day off if possible.";
        cssClass = "high-stress";
    }

    resultDiv.className = `result-area ${cssClass}`;
    resultDiv.innerHTML = `<strong>Result: ${level}</strong><br>${suggestion}`;
}

// --- DIGITAL DIARY LOGIC ---
function saveNote() {
    const noteText = document.getElementById('diaryInput').value;
    if (!noteText) return;

    const date = new Date().toLocaleString();
    const notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
    
    notes.unshift({ text: noteText, date: date }); // Add new note to top
    localStorage.setItem('myNotes', JSON.stringify(notes));
    
    document.getElementById('diaryInput').value = ''; // Clear input
    loadNotes();
}

function loadNotes() {
    const notesContainer = document.getElementById('notesContainer');
    const notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
    
    notesContainer.innerHTML = notes.map(note => `
        <div class="note-item">
            <span class="note-date">${note.date}</span>
            <p>${note.text}</p>
        </div>
    `).join('');
}

// --- GOAL TRACKER LOGIC ---
function addGoal() {
    const goalInput = document.getElementById('goalInput');
    const goalText = goalInput.value;
    if (!goalText) return;

    const goals = JSON.parse(localStorage.getItem('myGoals') || '[]');
    goals.push(goalText);
    localStorage.setItem('myGoals', JSON.stringify(goals));
    
    goalInput.value = '';
    loadGoals();
}

function loadGoals() {
    const goalList = document.getElementById('goalList');
    const goals = JSON.parse(localStorage.getItem('myGoals') || '[]');
    
    goalList.innerHTML = goals.map((goal, index) => `
        <li>
            ${goal} 
            <button onclick="deleteGoal(${index})">Done</button>
        </li>
    `).join('');
}

function deleteGoal(index) {
    const goals = JSON.parse(localStorage.getItem('myGoals') || '[]');
    goals.splice(index, 1);
    localStorage.setItem('myGoals', JSON.stringify(goals));
    loadGoals();
}
