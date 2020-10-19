const title = document.createElement("h1");
title.innerHTML = "Group Manager";
document.body.appendChild(title);

const box = document.createElement("div");
box.classList.add("container");
document.body.appendChild(box);

const endp = document.createElement("p");
endp.classList.add("Method");
endp.innerHTML = "http://localhost:4000/graphql";
box.appendChild(endp);

const queries = document.createElement("p");
queries.classList.add("Method");
queries.innerHTML = "QUERIES<br/>";
box.appendChild(queries);

const des1 = document.createElement("p");
des1.classList.add("Des");
des1.innerHTML = "findMember: Get one member by name<br/>findAllMembers: Get all members<br/>";
box.appendChild(des1);

const mutations = document.createElement("p");
mutations.classList.add("Method");
mutations.innerHTML = "MUTATIONS<br/>";
box.appendChild(mutations);

const des2 = document.createElement("p");
des2.classList.add("Des");
des2.innerHTML = "createMember: Create member<br/>removeMembers: Delete member<br/>modifyGroup: Change group of member by name<br/>";
box.appendChild(des2);

