// --- STRESS ANALYZER LOGIC ---
function calculateStress() {
    const sleep = document.getElementById('sleep').value;
    const study = document.getElementById('study').value;
    const screen = document.getElementById('screen').value;
    const mood = document.getElementById('mood').value;
    const exams = document.getElementById('exams').value;

    let score = 0;

    // Scoring logic
    if (sleep < 6) score += 3;
    if (study > 8) score += 2;
    if (screen > 6) score += 2;
    if (mood === 'stressed') score += 3;
    if (exams === 'yes') score += 2;

    const resultDiv = document.getElementById('result');
    const scoreText = document.getElementById('stressScore');
    const adviceText = document.getElementById('stressAdvice');

    resultDiv.style.display = 'block';

    if (score <= 3) {
        scoreText.innerText = "Stress Level: Low 😊";
        scoreText.style.color = "green";
        adviceText.innerText = "You're doing great! Keep maintaining your current routine.";
    } else if (score <= 7) {
        scoreText.innerText = "Stress Level: Medium 😐";
        scoreText.style.color = "orange";
        adviceText.innerText = "You might be feeling a bit tired. Try to take short breaks and sleep more.";
    } else {
        scoreText.innerText = "Stress Level: High 😰";
        scoreText.style.color = "red";
        adviceText.innerText = "Take a deep breath. It's time to pause, talk to a friend, and reduce your workload for today.";
    }
}

// --- DIARY LOGIC ---
function saveDiary() {
    const entry = document.getElementById('diaryInput').value;
    if (entry === "") return alert("Please write something first!");

    const date = new Date().toLocaleString();
    const diaryData = { text: entry, time: date };

    let entries = JSON.parse(localStorage.getItem('myEntries')) || [];
    entries.unshift(diaryData);
    localStorage.setItem('myEntries', JSON.stringify(entries));

    document.getElementById('diaryInput').value = "";
    displayEntries();
}

function displayEntries() {
    const displayArea = document.getElementById('diaryEntries');
    if (!displayArea) return;

    let entries = JSON.parse(localStorage.getItem('myEntries')) || [];
    displayArea.innerHTML = "";

    entries.forEach(item => {
        displayArea.innerHTML += `
            <div class="card">
                <small>${item.time}</small>
                <p>${item.text}</p>
            </div>
        `;
    });
}

function clearDiary() {
    if (confirm("Delete all entries?")) {
        localStorage.removeItem('myEntries');
        displayEntries();
    }
}

// --- GOAL TRACKER LOGIC ---
function addGoal() {
    const goalInput = document.getElementById('goalInput');
    const goalList = document.getElementById('goalList');

    if (goalInput.value === "") return;

    const li = document.createElement('li');
    li.innerHTML = `✅ ${goalInput.value}`;
    li.style.background = "#fff";
    li.style.padding = "10px";
    li.style.marginBottom = "5px";
    li.style.borderRadius = "5px";
    
    goalList.appendChild(li);
    goalInput.value = "";
}

// Initialize diary on page load
window.onload = () => {
    if (document.getElementById('diaryEntries')) {
        displayEntries();
    }
};
