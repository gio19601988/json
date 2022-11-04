///დავალება N1 https://reqres.in/api/unknown წამოიღეთ xml http requist-ის საშუალებით name + year;
function getname() {
  let requist = new XMLHttpRequest();

requist.addEventListener("load", function () {
let pasuxiText = this.responseText;
let pasuxiJs = JSON.parse(pasuxiText);


let ul = document.createElement('ul');
 pasuxiJs.data.forEach(masivi => {
   let li = document.createElement('li');
   li.textContent = `${masivi.name} ${masivi.year}`;
  ul.appendChild(li);
});

document.getElementById('userinfo').appendChild(ul);
});

requist.addEventListener('error-პრობლემა', function() {
let p = document.createElement('p');
p.textContent = 'Page Not found';

document.getElementById('userinfo').appendChild(p);
})

requist.open("GET", "https://reqres.in/api/unknown");
requist.send();
}

getname()



//დავალება N2 https://reqres.in/api/users?page=2 წამოიღეთ fetchის საშუალებით სახელი გვარი + სურათი;

let currentPage = 1;
let totalPages;

function getUsersFunction(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (responseTextInfo) {
      if (responseTextInfo.status !== 200) {
        throw responseTextInfo.status;
      }
      return responseTextInfo.json();
    })
    .then(function (resposnseJsData) {
     
      const fragment = new DocumentFragment();

      resposnseJsData.data.forEach((masivi) => {
        let li = document.createElement("li");
        let imge = document.createElement("img");
        
        li.textContent = masivi.last_name;
        imge.src= masivi.avatar;
        fragment.appendChild(li);
        fragment.appendChild(imge);
      });

      document.getElementById('list-users').innerHTML = ' ';
      document.getElementById('list-users').appendChild(fragment);
      document.getElementById('imagegio').appendChild(fragment);
      totalPages = resposnseJsData.total_pages;
    })
    .catch(function (error) {
      if (error == 404) {
        let p = document.createElement("p");
        p.textContent = "Page Not found";

        document.getElementById("userinfo").appendChild(p);
      } else if (error == 500) {
        let p = document.createElement("p");
        p.textContent = "Server Error";

        document.getElementById("userinfo").appendChild(p);
      }
    });
}

document.getElementById('loadprevius').addEventListener('click', function() {
  if (currentPage == 1) {
    return;
  }
  currentPage -= 1;
  getUsersFunction(currentPage);
})

document.getElementById('loadnext').addEventListener('click', function() {
  if (currentPage == totalPages) {
    return;
  }
  currentPage += 1;
  getUsersFunction(currentPage);
})

getUsersFunction(currentPage);