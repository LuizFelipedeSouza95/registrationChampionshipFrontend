async function searchAllUsers() {
  const response = await fetch("http://localhost:3000/searchAllClassification");
  const users = await response.json();

  const userTable = document.getElementById("classificationList");

  users.forEach((user) => {
    const row = userTable.insertRow();

    const timeCell = row.insertCell();
    timeCell.innerText = user.team;

    const jogadorCell = row.insertCell();
    jogadorCell.innerText = user.player;

    const pCell = row.insertCell();
    pCell.innerText = user.P;

    const vCell = row.insertCell();
    vCell.innerText = user.V;

    const eCell = row.insertCell();
    eCell.innerText = user.E;

    const dCell = row.insertCell();
    dCell.innerText = user.D;

    const gpCell = row.insertCell();
    gpCell.innerText = user.GP;

    const gcCell = row.insertCell();
    gcCell.innerText = user.GC;

    const sgCell = row.insertCell();
    sgCell.innerText = user.SG;

  });
  
  return users;
}

searchAllUsers();
