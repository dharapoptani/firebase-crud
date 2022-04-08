const addButton = document.querySelector("#add");
const submitButton = document.querySelector("#s-btn");
const editButton = document.querySelector("#edit-s-btn");

const modalWrapper = document.querySelector(".modal__wrapper");
const appBody = document.querySelector(".app__body");
const editModal = document.querySelector(".emodal__wrapper");

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const highlight = document.querySelector("#highlight");
const thought = document.querySelector("#thought");
const ename = document.querySelector("#ename");
const eemail = document.querySelector("#eemail");
const ehighlight = document.querySelector("#ehighlight");
const ethought = document.querySelector("#ethought");
let edit_id = null;

const addPost = (doc, id) => {
  const postWrapper = document.createElement("div");
  postWrapper.classList.add("post");
  postWrapper.id = `${id}`;
  const post = `
               <h2>${doc.name}</h2>
               <p>${doc.date}
               <p>${doc.email}</p>
               <div class="post__heading">
                <h3>${doc.highlight}</h3>
                <button class="e-btn"
                id='${id}'>Edit</button>
                <button id='${id}'  class="d-btn">Delete</button>

               </div>
            <p>${doc.thought}</p>
    
           `;

  postWrapper.innerHTML = post;

  appBody.appendChild(postWrapper);

  postWrapper.addEventListener("click", (e) => {
    if (e.target.classList[0] === "e-btn") {
      editModal.classList.add("modal__show");
      edit_id = e.target.id;
      console.log(e.target.id, id);
    } else if (e.target.classList[0] === "d-btn") {
      db.collection("blogs")
        .doc(id)
        .delete()
        .then(() => document.location.reload());
    }
  });
};
//getting data from database
db.collection("blogs")
  .get()
  .then((snaps) => {
    snaps.forEach((doc) => {
      addPost(doc.data(), doc.id);
    });
  });

// Event listeners

addButton.addEventListener("click", () => {
  modalWrapper.classList.add("modal__show");
});

modalWrapper.addEventListener("click", (e) => {
  if (e.target === modalWrapper) modalWrapper.classList.remove("modal__show");
});
editModal.addEventListener("click", (e) => {
  if (e.target === editModal) editModal.classList.remove("modal__show");
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  db.collection("blogs").add({
    name: name.value,
    email: email.value,
    highlight: highlight.value,
    thought: thought.value,
    date: Date(),
  });

  modalWrapper.classList.remove("modal__show");
  setTimeout(() => document.location.reload(), 3000);
});

editButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(edit_id);
  db.collection("blogs")
    .doc(edit_id)
    .update({
      name: ename.value,
      email: eemail.value,
      highlight: ehighlight.value,
      thought: ethought.value,
      date: Date(),
    })
    .then(() => {
      editModal.classList.remove("show__modal");
      document.location.reload();
    });
});
