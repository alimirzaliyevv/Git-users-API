var responseDTO;
async function fetchData() {
  document.getElementById("repositories").innerHTML = "";

  intitialProcess();
  loading("flex");
  const data = document.getElementById("searchParameter");
  // const data = "antkaynak";
  const responseData = await fetch(
    "https://api.github.com/users/" + data.value,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      setTimeout(() => {
        loading();
        intitialProcess("flex");

        console.log("----->", result);
        responseDTO = result;
        organization();
        repositories();
        document.getElementById("image").src = result.avatar_url;
        document.getElementById("name").innerText = result.name;
        document.getElementById("follower").innerText = result.followers;
        document.getElementById("following").innerText = result.following;
        document.getElementById("company").innerText = result.company;
        document.getElementById("login").innerText = result.login;
        document.getElementById("public_repos").innerText = result.public_repos;
        display("none");
      }, 2000);
    });
}

function display(data = "flex") {
  const alert = document.getElementById("alert");
  alert.style.display = data;
}
function intitialProcess(data = "none") {
  const infoBlok = document.getElementById("information");
  infoBlok.style.display = data;
}
intitialProcess();
display();
loading();
function loading(data = "none") {
  const loading = document.getElementById("loader");
  loading.style.display = data;
}
async function followers() {
  const url = responseDTO.followers_url;
  const data = await fetch(url, { method: "GET" })
    .then((response) => response.json())
    .then((result) => {
      console.log("result followers -->", result);
    });
}
async function following() {
  const url = responseDTO.following_url.replace("{/other_user}", "");
  const data = await fetch(url, { method: "GET" })
    .then((response) => response.json())
    .then((result) => {
      console.log("result following -->", result);
    });
}
async function repositories() {
  const url = responseDTO.repos_url;
  let count = 0;
  const data = await fetch(url, { method: "GET" })
    .then((response) => response.json())
    .then((result) => {
      if (count <= 5) {
          console.log('repos url',result)
        let htmlData = result.map((item) => {
          return `<div class="col-sm-6">
                            <div class="card" style="display: grid; margin-top:5px;">
                              <div class="card-body">
                                <h5 class="card-title">${item.name} <span class="visibilityClass">${item.visibility}</span></h5>
                                <p class="card-text">${item.description}</p>
                                <div style="display: flex; justify-content: space-between;">
                                <span>${item.language}</span>
                                <span><i class="fas fa-code-branch"></i> ${item.forks_count}</span>
                                <span><i class="fas fa-star"></i> ${item.stargazers_count}</span>                                
                            </div>
                              </div>
                            </div>
                         </div>`;
        });
        if (count <= 5) {
          console.log("count ", count);
          document.getElementById("repositories").innerHTML = htmlData.join("");
          count++;
        }
      }
    });
}
async function organization() {
  let url = responseDTO.organizations_url;
  const data = await fetch(url, { method: "GET" })
    .then((response) => response.json())
    .then((result) => {
      const image = document.getElementById("orgImage");
      console.log("orgImage", result);
      if(result.length){
        image.src = result[0].avatar_url;
        // document.getElementById("orgImage").src = result.avatar_url;
        document.getElementById("overlay").innerText = result[0].description;
      }else{
          image.style.display= 'none'
      }
    
    });
}
