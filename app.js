const fifa = new Fifa();
const storage = new Storage();
const ui = new UI();

const btnWrapper = document.getElementById("btnWrapper");
const leagueList = document.getElementById("leagueList");
const leagueImage = document.getElementById("leagueImage");

document.addEventListener("DOMContentLoaded", setTeamListToStorage);

document.getElementById("backBtn").addEventListener("click", function () {
    TweenMax.fromTo(btnWrapper, 1, {
        opacity: "0",
    }, {
        opacity: "1",
        ease: Power2.easeInOut
    })
    btnWrapper.style.pointerEvents = "auto";
    leagueList.style.opacity = "0";
    leagueList.style.pointerEvents = "none";
    document.getElementById("footer").style.opacity = "1";
});

setEventEplClick();
setEventLigaClick();

function displayLeague() {
    btnWrapper.style.opacity = "0";
    btnWrapper.style.pointerEvents = "none";
    document.getElementById("footer").style.opacity = "0";
    TweenMax.fromTo(leagueList, 1, {
        opacity: "0",
    }, {
        opacity: "1",
        ease: Power2.easeInOut
    });
    // leagueList.style.opacity = "1";
    leagueList.style.pointerEvents = "auto";
}

function displayTeamInfo() {
    btnWrapper.style.opacity = "0";
    btnWrapper.style.pointerEvents = "none";
    leagueList.style.opacity = "0";
    leagueList.style.pointerEvents = "none";
    // document.getElementById("footer").style.opacity = "0";
    TweenMax.fromTo("#teamInfo", 1, {
        opacity: "0",
    }, {
        opacity: "1",
        ease: Power2.easeInOut
    });
    // document.getElementById("teamInfo").style.opacity = "1";
    document.getElementById("teamInfo").style.pointerEvents = "auto";
}

function getEPLTeamList() {
    let eplArr = [];
    fifa.getEPLTeamsList()
        .then(data => {
            data.forEach(element => {
                eplArr.push(element);
            });
            storage.setListToStorage("eplTeamList", JSON.stringify(eplArr));
        });
}

function getLigaTeamList() {
    let ligaArr = [];
    fifa.getLigaTeamList()
        .then(data => {
            data.forEach(element => {
                ligaArr.push(element);
            });
            storage.setListToStorage("ligaTeamList", JSON.stringify(ligaArr));
        });
}

function setTeamListToStorage() {
    if (storage.getListFromStorage("eplTeamList") === null || storage.getListFromStorage("ligaTeamList") === null) {
        getEPLTeamList();
        getLigaTeamList();
    }
}

function setClickEventForTeams() {
    const teamsBtn = document.querySelectorAll(".selectedTeam");
    teamsBtn.forEach((elem) => {
        elem.addEventListener("click", function (e) {
            getTeamDetails(e.target.value);
        })
    });
}

function getTeamDetails(teamId) {
    displayTeamInfo();
    let teamInfo = {};
    let teamSquad = [];
    fifa.getTeamById(teamId)
        .then(data => {
            teamInfo = data[0];
            ui.displayTeamLogo(teamInfo.logo);
            ui.displayTeamInfoUI(teamInfo);
            setClickEventInfoBtn(teamInfo);
        });
    fifa.getCurrentSquad(teamId)
        .then(data => {
            data.forEach(elem => {
                teamSquad.push(elem);
                setClickEventSquadBtn(teamInfo, teamSquad);
            });
        });


}

function setClickEventInfoBtn(team) {
    document.getElementById("infoBtn").addEventListener("click", function () {
        ui.displayTeamLogo(team.logo);
        ui.displayTeamInfoUI(team);
    });
}

function setClickEventSquadBtn(team, squad) {
    document.getElementById("squadBtn").addEventListener("click", function () {
        ui.displaySquad(team, squad);
    })
}

function setEventEplClick() {
    document.getElementById("eplBtn").addEventListener("click", function () {
        displayLeague();
        leagueImage.setAttribute("src", "./premier.png");
        let eplTeamList = storage.getListFromStorage("eplTeamList");
        ui.displayTeamList(eplTeamList);
        setClickEventForTeams();
    });
    document.getElementById("eplBtnImg").addEventListener("click", function () {
        displayLeague();
        leagueImage.setAttribute("src", "./premier.png");
        let eplTeamList = storage.getListFromStorage("eplTeamList");
        ui.displayTeamList(eplTeamList);
        setClickEventForTeams();
    });
}

function setEventLigaClick() {
    document.getElementById("ligaBtn").addEventListener("click", function () {
        displayLeague();
        leagueImage.setAttribute("src", "./laliga.png");
        let ligaTeamList = storage.getListFromStorage("ligaTeamList");
        ui.displayTeamList(ligaTeamList);
        setClickEventForTeams();
    });
    document.getElementById("ligaBtnImg").addEventListener("click", function () {
        displayLeague();
        leagueImage.setAttribute("src", "./laliga.png");
        let ligaTeamList = storage.getListFromStorage("ligaTeamList");
        ui.displayTeamList(ligaTeamList);
        setClickEventForTeams();
    });
}