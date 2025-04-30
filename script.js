const levels = [
  {
    phishingCount: 1,
    emails: [
      {
        subject: "Ενημέρωση διαγωνίσματος Μαθηματικών",
        from: "info@school.gr",
        body: "Το διαγώνισμα θα γίνει τη Δευτέρα στην αίθουσα Β1. Καλή επιτυχία!"
      },
      {
        subject: "Ο λογαριασμός σου θα διαγραφεί!",
        from: "support@secure.xyz",
        body: "Συνδέσου άμεσα στο http://fake-login.com για να αποτρέψεις την απενεργοποίηση του email σου.",
        phishing: true
      },
      {
        subject: "Αλλαγή ώρας εκδρομής",
        from: "teacher@school.gr",
        body: "Η εκδρομή μεταφέρεται για την Παρασκευή λόγω καιρού."
      }
    ]
  },
  {
    phishingCount: 2,
    emails: [
      {
        subject: "Δωροεπιταγή 500€ από το Jumbo!",
        from: "gift@winbig.ru",
        body: "Συγχαρητήρια! Κέρδισες! Πάτησε εδώ: http://jumbo-freegift.ru",
        phishing: true
      },
      {
        subject: "Αναστολή λογαριασμού email",
        from: "webadmin@school.net",
        body: "Στείλε μας το password σου για να ενεργοποιηθεί ξανά ο λογαριασμός σου.",
        phishing: true
      },
      {
        subject: "Συνάντηση Συλλόγου Γονέων",
        from: "parents@school.gr",
        body: "Η επόμενη συνάντηση θα γίνει την Παρασκευή στην αίθουσα Α3."
      }
    ]
  }
];

let currentLevel = 0;
let marked = 0;

function loadLevel() {
  const level = levels[currentLevel];
  marked = 0;
  document.getElementById("nextLevelBtn").style.display = "none";
  document.getElementById("emailList").innerHTML = "";
  document.getElementById("emailView").innerHTML = "";
  document.title = "📨 MailSim";
  updateProgress();

  level.emails.forEach((email, i) => {
    const item = document.createElement("div");
    item.className = "email-item";
    const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(email.from)}&background=d2e3fc&color=1a73e8&size=36`;

    item.innerHTML = `
      <div class="email-row">
        <img class="avatar" src="${avatarURL}" alt="avatar">
        <div>
          <strong>${email.subject}</strong><br>
          <span>${email.from}</span>
        </div>
      </div>
    `;
    item.onclick = () => openEmail(email, i, item);
    document.getElementById("emailList").appendChild(item);
  });
}

function openEmail(email, index, clickedItem) {
  document.querySelectorAll(".email-item").forEach(el => el.classList.remove("selected"));
  clickedItem.classList.add("selected");

  document.title = `📨 MailSim | ${email.subject}`;
  const bodyWithLinks = email.body.replace(/(http[^ \n]+)/g, `<a href="suspicious.html" target="_blank">$1</a>`);

  const view = document.getElementById("emailView");
  view.classList.add("active");
  view.innerHTML = `
    <h3>${email.subject}</h3>
    <p><strong>Από:</strong> ${email.from}</p>
    <p>${bodyWithLinks}</p>
    <button class="spam-btn" id="mark${index}" onclick="markAsSpam(${index})">🚫 Mark as Spam</button>
    <br><br>
    <button class="spam-btn" style="background:#ccc;color:#333;" onclick="goBack()">🔙 Πίσω στο Inbox</button>
  `;
}

function goBack() {
  document.getElementById("emailView").innerHTML = "";
  document.getElementById("emailView").classList.remove("active");
  document.title = "📨 MailSim";
  document.querySelectorAll(".email-item").forEach(el => el.classList.remove("selected"));
}

function markAsSpam(index) {
  const email = levels[currentLevel].emails[index];
  const button = document.getElementById(`mark${index}`);
  if (email.phishing && !button.disabled) {
    marked++;
    button.textContent = "✅ Marked as Spam";
    button.style.backgroundColor = "#34a853";
  } else {
    button.textContent = "❌ Not phishing";
    button.style.backgroundColor = "#999";
  }
  button.disabled = true;
  updateProgress();
}

function updateProgress() {
  const level = levels[currentLevel];
  document.getElementById("progress").textContent = `📌 Marked: ${marked}/${level.phishingCount}`;
  if (marked === level.phishingCount) {
    document.getElementById("nextLevelBtn").style.display = "block";
  }
}

function nextLevel() {
  currentLevel++;
  if (currentLevel < levels.length) {
    loadLevel();
  } else {
    document.body.innerHTML = `
      <header><h1 style="padding:20px;color:white;background:#1a73e8;">🎉 Μπράβο!</h1></header>
      <div class="container">
        <p>Εντόπισες όλα τα ύποπτα emails!</p>
        <p>Να θυμάσαι πάντα να προσέχεις links και να μην αποκαλύπτεις προσωπικά στοιχεία!</p>
      </div>`;
  }
}

window.onload = loadLevel;
