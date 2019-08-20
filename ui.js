class UI {
  constructor() {}
  displayTeamList(teamList) {
    const teamLeft = document.getElementById("teamListLeft");
    const teamRight = document.getElementById("teamListRight");
    teamLeft.innerHTML = "";
    teamRight.innerHTML = "";
    let count = 0;
    for (let team of teamList) {
      const newBtn = document.createElement("button");
      newBtn.className = "btn btn-outline-default waves-effect custom-btn selectedTeam";
      newBtn.value = team.team_id;
      newBtn.textContent = team.name;
      if (count >= 10) {
        teamRight.appendChild(newBtn);
      } else {
        teamLeft.appendChild(newBtn);
      }
      count++;
    }

  };

  displayTeamLogo(teamLogo) {
    document.getElementById("teamLogo").src = teamLogo;
  }

  displayTeamInfoUI(teamInfo) {
    document.getElementById("displayChoices").innerHTML = "";
    document.getElementById("displayChoices").innerHTML = `<h3 class="text-center">${teamInfo.name}</h3>
        <ul class="ml-3 mt-4">
          <li class="mb-4">Stadium: ${teamInfo.venue_name}</li>
          <li class="mb-4">Stadium Capacity: ${teamInfo.venue_capacity}</li>
          <li class="mb-4">Founded: ${teamInfo.founded}</li>
        </ul>`;

    document.getElementById("backTeamBtn").addEventListener("click", function (e) {
      document.getElementById("teamInfo").style.opacity = "0";
      document.getElementById("teamInfo").style.pointerEvents = "none";
      TweenMax.fromTo("#leagueList", 1, {
        opacity: "0",
      }, {
        opacity: "1",
        ease: Power2.easeInOut
      });
      // document.getElementById("leagueList").style.opacity = "1";
      document.getElementById("leagueList").style.pointerEvents = "auto";
    });
  }

  displaySquad(team, squad) {
    let countPage = 2;
    let count = 0;
    let output = "";
    let tenPerPage = 10;
    let pageList = `<li class="page-item"><a class="page-link" href="#" id="1">1</a></li>`;
    let numberOfPages;
    document.getElementById("displayChoices").innerHTML = "";
    document.getElementById("displayChoices").innerHTML = `
        <div class="container">
        <h3 class="text-center">${team.name}</h3>
        <p class="lead text-center text-muted">Squad 2019-2020</p>
        <div class="row">
          <div class="col-md-12">
            <ul
              class="list-group list-group-flush mt-3 text-center"
              id="playerList"
            >
            </ul>
            <ul class="pagination justify-content-center mt-3" id="page">
            </ul>
          </div>
        </div>
        </div>
      </div>`;

    // Create number of page for Pagination   
    numberOfPages = Math.round(squad.length / 10);
    while (countPage <= numberOfPages) {
      pageList += `
        <li class="page-item"><a class="page-link" href="#" id="${countPage}">${countPage}</a></li>
        `;
      countPage++;
    }

    // Insert pagination to display page
    document.getElementById("page").innerHTML = pageList;
    let pages = document.querySelectorAll(".page-link");

    // Display players for page 1
    // set active state for first page
    pages[0].parentElement.classList.add("page-active");
    for (let player of squad) {
      output += ` 
            <li class="list-group-item">
            <a href="#" class="player-link" id="${player.player_id}">${player.firstname} ${player.lastname}</a>
          </li>`;
      if (count === 10) {
        document.getElementById("playerList").innerHTML = output;
        output = "";
      }
      count++;
    }

    // Set Click Events for each player in page
    let playersWithClickClass = document.querySelectorAll(".player-link");
    playersWithClickClass.forEach(
      elem => {
        elem.addEventListener("click", function (e) {
          console.log(e.target.id);
          displayPlayerInfo(e.target.id);
        });
      });

    // Set Click event for Pagination
    pages.forEach(elem => {
      elem.addEventListener("click", function (e) {

        // remove active state for all page in pagination then set active for current page
        for (let element of Array.from(elem.parentElement.parentElement.children)) {
          element.classList.remove("page-active");
        }
        elem.parentElement.classList.add("page-active");

        // clear page before displaying
        document.getElementById("playerList").innerHTML = "";
        output = "";
        for (let i = e.target.id * 10 - 10; i < e.target.id * 10; i++) {
          if (i == squad.length) {
            break;
          }
          output += ` 
                    <li class="list-group-item">
                    <a href="#" class="player-link" id="${squad[i].player_id}">${squad[i].firstname} ${squad[i].lastname}</a>
                    </li>`;
        }
        document.getElementById("playerList").innerHTML = output;

        // Set Click Events for each player in page
        playersWithClickClass = document.querySelectorAll(".player-link");
        playersWithClickClass.forEach(
          elem => {
            elem.addEventListener("click", function (e) {
              displayPlayerInfo(e.target.id);
            });
          });
      });

    });
  }

  displayPlayer(player) {

    displayPlayerInfoPage();

    // Clear player Info and display new Player
    document.getElementById("playerInfoCard").innerHTML = "";
    document.getElementById("playerInfoCard").innerHTML = `
         <div class="container">
        <h3 class="text-center">${player.player_name}</h3>
        <div class="row">
          <div class="col-md-6 player-info">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Position: ${player.position}</li>
              <li class="list-group-item">Birthdate: ${player.birth_date}</li>
              <li class="list-group-item">Nationality: ${player.nationality}</li>
              <li class="list-group-item">Height: ${player.height}</li>
              <li class="list-group-item">Weight: ${player.weight}</li>
            </ul>
          </div>
          <div class="col-md-6 player-stats">
            <ul class="list-group list-group-flush">
            <li class="list-group-item">
            Total shots:
            <span class="badge badge-pill badge-secondary"> ${player.shots.total}</span> | On
            target:
            <span class="badge badge-pill badge-success"> ${player.shots.on}</span>
          </li>
          <li class="list-group-item">
          Total Goals:
          <span class="badge badge-pill badge-secondary"> ${player.goals.total}</span> | 
          Assists
          <span class="badge badge-pill badge-success"> ${player.goals.assists}</span>
        </li>
          <li class="list-group-item">
            Total Passes:
            <span class="badge badge-pill badge-secondary"> ${player.passes.total}</span> |
            Key Passes:
            <span class="badge badge-pill badge-success"> ${player.passes.key}</span> |
            Accuracy:
            <span class="badge badge-pill badge-secondary"> ${player.passes.accuracy}</span>
          </li>
          <li class="list-group-item">
            Total tackles:
            <span class="badge badge-pill badge-secondary"> ${player.tackles.total}</span> |
            Blocks:
            <span class="badge badge-pill badge-danger"> ${player.tackles.blocks}</span> |
            Interceptions:
            <span class="badge badge-pill badge-info"> ${player.tackles.interceptions}</span>
          </li>
          <li class="list-group-item">
            Total 1vs1:
            <span class="badge badge-pill badge-secondary"> ${player.duels.total}</span> |
            Wons: <span class="badge badge-pill badge-success"> ${player.duels.won}</span>
          </li>
          <li class="list-group-item">
            Dribbles Total:
            <span class="badge badge-pill badge-secondary"> ${player.dribbles.attemps}</span> |
            Success:
            <span class="badge badge-pill badge-success"> ${player.dribbles.success}</span>
          </li>
          <li class="list-group-item">
            Yellow Cards:
            <span class="badge badge-pill badge-warning"> ${player.cards.yellow}</span> | Red
            Cards: <span class="badge badge-pill badge-danger"> ${player.cards.red}</span>
          </li>
          <li class="list-group-item">
            Penalty Wons:
            <span class="badge badge-pill badge-success"> ${player.penalty.won}</span> |
            Missed: <span class="badge badge-pill badge-danger"> ${player.penalty.missed}</span>
          </li>
          <li class="list-group-item">
            Appearances:
            <span class="badge badge-pill badge-primary"> ${player.games.appearances}</span> |
            Minutes-played:
            <span class="badge badge-pill badge-secondary"> ${player.games.minutes_played}</span> |
            Lineups:
            <span class="badge badge-pill badge-info"> ${player.games.lineups}</span>
          </li>
            </ul>
          </div>
          <button
          class="btn btn-outline-light waves-effect shadow-none"
          id="backSquadBtn"
        >
          <i class="fas fa-chevron-left"></i> Squad
        </button>
        
        </div>
      </div> 
        `;
    setEventBackSquadBtn();
  }

}

//Function Declaration
function displayPlayerInfo(playerId) {
  const fifa = new Fifa();
  const ui = new UI();

  let playerInfo = {};
  fifa.getPlayer(playerId)
    .then(data => {
      playerInfo = data[0];
      ui.displayPlayer(playerInfo);
    });
}

function displayPlayerInfoPage() {
  // Hide team Info and display player Info
  document.getElementById("teamInfo").style.opacity = "0";
  document.getElementById("teamInfo").style.pointerEvents = "none";
  TweenMax.fromTo("#playerInfoCard", 1, {
    opacity: "0",
  }, {
    opacity: "1",
    ease: Power2.easeInOut
  });
  // document.getElementById("playerInfoCard").style.opacity = "1";
  document.getElementById("playerInfoCard").style.pointerEvents = "auto";
}

function setEventBackSquadBtn() {
  document.getElementById("backSquadBtn").addEventListener("click", function (e) {
    TweenMax.fromTo("#teamInfo", 1, {
      opacity: "0",
    }, {
      opacity: "1",
      ease: Power2.easeInOut
    });
    // document.getElementById("teamInfo").style.opacity = "1";
    document.getElementById("teamInfo").style.pointerEvents = "auto";
    document.getElementById("playerInfoCard").style.opacity = "0";
    document.getElementById("playerInfoCard").style.pointerEvents = "none";
  });
}