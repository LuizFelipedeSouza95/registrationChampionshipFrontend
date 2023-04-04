async function searchAllUsers() {
  const response = await fetch("http://localhost:3000/searchAllUser");
  const users = await response.json();

  console.log(users);
  const userTable = document.getElementById("userList");

  users.forEach((user) => {
    const adminUser = user.admin ? "Sim" : "Não";

    const row = userTable.insertRow();

    const nameCell = row.insertCell();
    nameCell.innerText = user.name;

    const emailCell = row.insertCell();
    emailCell.innerText = user.email;

    const teamtCell = row.insertCell();
    teamtCell.innerText = user.teamName;

    const admintCell = row.insertCell();
    admintCell.innerText = adminUser;

    const createdAtCell = row.insertCell();
    createdAtCell.innerText = user.createdAt;
  });
  return users;
}

searchAllUsers();
