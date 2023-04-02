async function searchAllRouded() {
  const response = await fetch("http://localhost:3000/searchAllRouded");
  const roudeds = await response.json();

  const userTable = document.getElementById("roudedList");
  const roudedCount = {};
  let rowspan = 1;

  console.log(roudeds);
  roudeds.forEach((rouded, index) => {
    if (roudedCount[rouded.roundNumber] === undefined) {
      roudedCount[rouded.roundNumber] = 1;
    } else {
      roudedCount[rouded.roundNumber]++;
    }
    const row = userTable.insertRow();

    const roudedCell = row.insertCell();
    roudedCell.style.textAlign = "center";
    roudedCell.style.verticalAlign = "middle";
    if (roudedCount[rouded.rouded] > 1) {
      roudedCell.innerText = rouded.roundNumber;
      roudedCell.style.color = "transparent";
      roudedCount[rouded.roundNumber]--;
    } else {
      roudedCell.innerText = rouded.roundNumber;
    }

    const homePlayerCell = row.insertCell();
    homePlayerCell.innerText = rouded.homePlayer;

    const scoreHomeCell = row.insertCell();

    const inputScoreHome = document.createElement("input");
    inputScoreHome.type = "text";
    inputScoreHome.id = "inputScoreHome";
    inputScoreHome.className = "text-center";
    inputScoreHome.value = rouded.scoreHome;
    scoreHomeCell.appendChild(inputScoreHome);

    const xCell = row.insertCell();
    xCell.innerText = "X";

    const scoreVisitingCell = row.insertCell();

    const inputscoreVisiting = document.createElement("input");
    inputscoreVisiting.type = "text";
    inputscoreVisiting.id = "inputscoreVisiting";
    inputscoreVisiting.className = "text-center";
    inputscoreVisiting.value = rouded.scoreVisiting;
    scoreVisitingCell.appendChild(inputscoreVisiting);

    const visitingPlayerCell = row.insertCell();
    visitingPlayerCell.innerText = rouded.visitingPlayers;

    const btnCell = row.insertCell();
    const saveButton = document.createElement("button");
    saveButton.innerText = "Salvar";
    saveButton.id = "saveButton";
    saveButton.style.color = "#025f43";
    saveButton.style.cursor = "pointer";
    saveButton.style.display = "inline-block";
    saveButton.style.padding = "0";
    saveButton.style.margin = "0";
    saveButton.style.border = "none";
    saveButton.style.background = "none";
    saveButton.style.fontSize = "1em";
    saveButton.setAttribute("type", "button");
    saveButton.addEventListener("click", async function (event) {
      const row = event.target.closest("tr"); // encontra a linha (tr) mais próxima do botão clicado
      const roudedCell = row.cells[0]; // a célula com a informação da rodada é a primeira da linha
      const rouded = roudedCell.innerText; // obtém o valor da rodada

      await saveData(rouded);
    });

    async function saveData(rouded) {
      const row = event.target.parentNode.parentNode;

      const homePlayer = row.cells[1].innerText;
      const scoreHomeCell = row.cells[2];
      const scoreHomeInput = scoreHomeCell.querySelector("input");
      const scoreHome = parseInt(scoreHomeInput ? scoreHomeInput.value : "");
      const visitingPlayer = row.cells[5].innerText;
      const scoreVisitingCell = row.cells[4];
      const scoreVisitingInput = scoreVisitingCell.querySelector("input");
      const scoreVisiting = parseInt(scoreVisitingInput ? scoreVisitingInput.value : "");

      const roudeds = parseInt(rouded)

      const response = await fetch(`http://localhost:3000/updatedTableRouded`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rouded: roudeds,
          homePlayer,
          scoreHome,
          scoreVisiting,
        }),
      });
    
      const result = await response.json();
      window.location.href = `/rounds`;
      
    }

    btnCell.appendChild(saveButton);
  });

  const lastCellToMerge = userTable.rows[roudeds.length - rowspan].cells[0];
  lastCellToMerge.rowSpan = rowspan;

  return roudeds;
}

searchAllRouded();
