async function searchAllUsers() {
  const response = await fetch("http://localhost:3000/searchAllUser");
  const users = await response.json();

  const userTable = document.getElementById("userList");

  users.forEach((user) => {

    const row = userTable.insertRow();

    /* const idCell = row.insertCell();
    idCell.innerText = user.id; */

    const nameCell = row.insertCell();
    nameCell.innerText = user.name;

    const emailCell = row.insertCell();
    emailCell.innerText = user.email;

    const createdAtCell = row.insertCell();
    createdAtCell.innerText = user.createdAt;

/*     const passwordCell = row.insertCell();
    passwordCell.innerText = user.password; */
  });
  return users;
}

searchAllUsers();
