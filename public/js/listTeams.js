async function listTeams() {
  const response = await fetch("http://localhost:3000/searchAllTeam");
  const teams = await response.json();

  const select = document.getElementById("form-select");

  teams.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.text = item.name;
    select.appendChild(option);
  });
}

listTeams();
