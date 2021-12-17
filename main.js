async function fetchData() {
    loading("flex");
    const data = document.getElementById("searchParameter");
    const responseData = await fetch(
      "https://api.github.com/users/" + data.value,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((result) => {
        setTimeout(() => {
          loading();
          intitialProcess("flex");
          console.log("----->", result);
          responseDTO = result
          document.getElementById("image").src = result.avatar_url;
          document.getElementById("name").innerText = result.name;
          document.getElementById("follower").innerText = result.followers;
          document.getElementById("following").innerText = result.following;
  
  
          display("none");
  
          console.log("image", image.src);
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
  