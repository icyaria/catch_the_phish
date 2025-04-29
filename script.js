const levels = [
    {
      id: 1,
      emails: [
        { text: "Γεια σου, εδώ είναι οι φωτογραφίες από τη χθεσινή εκδρομή!", phishing: false },
        { text: "Ασφάλεια: Ο λογαριασμός σου θα κλειδωθεί! Κάνε κλικ εδώ για να συνδεθείς τώρα!", phishing: true },
        { text: "Ο καθηγητής ανέβασε το διαγώνισμα στο eclass.", phishing: false }
      ],
      correctCount: 1
    },
    {
      id: 2,
      emails: [
        { text: "Συγχαρητήρια! Κέρδισες ένα iPhone. Πάτησε εδώ!", phishing: true },
        { text: "Ειδοποίηση από το σχολείο: Η γιορτή ακυρώθηκε λόγω καιρού.", phishing: false },
        { text: "Ο τραπεζικός σου λογαριασμός έχει πρόβλημα. Κατέβασε το συνημμένο για επιδιόρθωση.", phishing: true }
      ],
      correctCount: 2
    }
  ];
  
  let currentLevel = 0;
  let found = 0;
  
  function loadLevel() {
    const level = levels[currentLevel];
    document.getElementById("emails").innerHTML = "";
    document.getElementById("result").textContent = "";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("level-label").textContent = `🎯 Πίστα ${level.id}`;
  
    level.emails.forEach((email, index) => {
      const div = document.createElement("div");
      div.className = "email";
      div.textContent = email.text;
      div.onclick = () => handleClick(div, email.phishing);
      document.getElementById("emails").appendChild(div);
    });
  
    found = 0;
  }
  
  function handleClick(div, isPhishing) {
    if (div.classList.contains("correct") || div.classList.contains("incorrect")) return;
  
    if (isPhishing) {
      div.classList.add("correct");
      found++;
    } else {
      div.classList.add("incorrect");
    }
  
    if (found === levels[currentLevel].correctCount) {
      document.getElementById("result").textContent = "✅ Μπράβο! Τα εντόπισες όλα!";
      document.getElementById("next-btn").style.display = "inline-block";
    }
  }
  
  function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
      loadLevel();
    } else {
      document.getElementById("game").innerHTML = `
        <h1>🎉 Τέλος παιχνιδιού!</h1>
        <p>Εντόπισες όλα τα ύποπτα emails! Μπράβο σου!</p>
        <p>Να θυμάσαι πάντα να προσέχεις πριν ανοίξεις άγνωστα emails!</p>
      `;
    }
  }
  
  window.onload = loadLevel;
  