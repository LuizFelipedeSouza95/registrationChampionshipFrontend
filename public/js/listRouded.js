async function searchAllRouded() {
  const response = await fetch("http://localhost:3000/searchAllRouded");

  if (response.status === 204) {
  } else {
    const rounds = await response.json();

    const userTable = document.getElementById("roundsList");
    const roundCount = {};
    let rowspan = 1;

    rounds.forEach((rounds, index) => {
      if (roundCount[rounds.roundNumber] === undefined) {
        roundCount[rounds.roundNumber] = 1;
      } else {
        roundCount[rounds.roundNumber]++;
      }
      const row = userTable.insertRow();

      const roundCell = row.insertCell();
      roundCell.style.textAlign = "center";
      roundCell.style.verticalAlign = "middle";
      if (roundCount[rounds.rouded] > 1) {
        roundCell.innerText = rouded.roundNumber;
        roundCell.style.color = "transparent";
        roundCount[rounds.roundNumber]--;
      } else {
        roundCell.innerText = rounds.roundNumber;
      }

      const homePlayerCell = row.insertCell();
      homePlayerCell.innerText = rounds.homePlayer;

      const scoreHomeCell = row.insertCell();

      const inputScoreHome = document.createElement("input");
      inputScoreHome.type = "text";
      inputScoreHome.id = "inputScoreHome";
      inputScoreHome.className = "ScoreHome text-center";
      inputScoreHome.value = rounds.scoreHome;
      inputScoreHome.disabled = rounds.disabledInputs;
      scoreHomeCell.appendChild(inputScoreHome);

      const xCell = row.insertCell();
      xCell.innerText = "X";

      const scoreVisitingCell = row.insertCell();

      const inputscoreVisiting = document.createElement("input");
      inputscoreVisiting.type = "text";
      inputscoreVisiting.id = "inputscoreVisiting";
      inputscoreVisiting.className = "scoreVisiting text-center";
      inputscoreVisiting.value = rounds.scoreVisiting;
      inputscoreVisiting.disabled = rounds.disabledInputs;
      scoreVisitingCell.appendChild(inputscoreVisiting);

      const visitingPlayerCell = row.insertCell();
      visitingPlayerCell.innerText = rounds.visitingPlayers;

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
      saveButton.disabled = rounds.disabledInputs;
      saveButton.setAttribute("type", "button");
      saveButton.addEventListener("click", async function (event) {
        const row = event.target.closest("tr"); // encontra a linha (tr) mais próxima do botão clicado
        const roundCell = row.cells[0]; // a célula com a informação da rodada é a primeira da linha
        const round = roundCell.innerText; // obtém o valor da rodada

        await saveData(round);
      });

      async function saveData(round) {
        const row = event.target.parentNode.parentNode;

        const homePlayer = row.cells[1].innerText;
        const scoreHomeCell = row.cells[2];
        const scoreHomeInput = scoreHomeCell.querySelector("input");
        const scoreHome = parseInt(scoreHomeInput ? scoreHomeInput.value : "");
        const visitingPlayer = row.cells[5].innerText;
        const scoreVisitingCell = row.cells[4];
        const scoreVisitingInput = scoreVisitingCell.querySelector("input");
        const scoreVisiting = parseInt(
          scoreVisitingInput ? scoreVisitingInput.value : ""
        );

        const rounds = parseInt(round);
        const response = await fetch(
          `http://localhost:3000/updatedGameRounds`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              roundNumber: rounds,
              homePlayer,
              scoreHome,
              scoreVisiting,
              disabledInputs: true,
            }),
          }
        );

        const responseClassification = await fetch(
          `http://localhost:3000/updateTableClassification`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              player1: homePlayer,
              gols1: scoreHome,
              player2: visitingPlayer,
              gols2: scoreVisiting,
            }),
          }
        );
        const result = await response.json();
        window.location.href = `/rounds`;
      }

      btnCell.appendChild(saveButton);
    });

    const lastCellToMerge = userTable.rows[rounds.length - rowspan].cells[0];
    lastCellToMerge.rowSpan = rowspan;

    return rounds;
  }
}

searchAllRouded();
