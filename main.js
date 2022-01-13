var responseDTO;
async function fetchData() {
  resetDTO();
  resetDTO();

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
        document.getElementById("location").innerText = result.location;

        document.getElementById("bio").innerText = result.bio;

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
        console.log("repos url", result);
        let htmlData = result.map((item) => {
          return `<div class="col-sm-6">
                            <div class="card" style="display: grid; margin-top:5px;">
                              <div class="card-body">
                                <h5 class="card-title">${
                                  item.name
                                } <span class="visibilityClass">${
            item.visibility
          }</span></h5>
                                <p style=" font-size: small;" class="card-text">${
                                  item.description ? item.description : ""
                                }</p>
                                <div style="display: flex; justify-content: space-between;">
                                <span>${
                                  item.language ? item.language : ""
                                }</span>
                                <span><i class="fas fa-code-branch"></i> ${
                                  item.forks_count
                                }</span>
                                <span><i class="fas fa-star"></i> ${
                                  item.stargazers_count
                                }</span>                                
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
      if (result.length) {
        image.src = result[0].avatar_url;
        // document.getElementById("orgImage").src = result.avatar_url;
        document.getElementById("overlay").innerText = result[0].description;
      } else {
        image.style.display = "none";
      }
    });
}
function resetDTO() {
  document.getElementById("loader").value = "";
  document.getElementById("information").value = "";
  document.getElementById("repositories").value = "";
  document.getElementById("image").value = "";
  document.getElementById("name").value = "";
  document.getElementById("follower").value = "";
  document.getElementById("following").value = "";
  document.getElementById("company").value = "";
  document.getElementById("login").value = "";
  document.getElementById("public_repos").value = "";
  document.getElementById("location").value = "";
  document.getElementById("bio").value = "";
  document.getElementById("overlay").innerText = "";
}
function printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;

  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}
/*var doc = new jsPDF();

 function saveDiv(divId, title) {
 doc.fromHTML(`<html><head><title>${title}</title></head><body>` + document.getElementById(divId).innerHTML + `</body></html>`);
 doc.save('div.pdf');
}

function printDiv(divId,
  title) {

  let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

  mywindow.document.write(`<html><head><title>${title}</title>`);
  mywindow.document.write('</head><body >');
  mywindow.document.write(document.getElementById(divId).innerHTML);
  mywindow.document.write('</body></html>');

  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10

  mywindow.print();
  mywindow.close();

  return true;
} */
