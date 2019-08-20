class Fifa {
    constructor() {
        this.requestKey = {
            method: "GET",
            headers: {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "c26a5117d0mshb6cbd1a825cd01bp18bfe0jsnc995f54e4a96"
            }
        };
    }

    async getEPLTeamsList() {
        const response = await fetch("https://api-football-v1.p.rapidapi.com/v2/teams/league/2", this.requestKey);
        const data = await response.json();
        return data.api.teams;
    }

    async getLigaTeamList() {
        const response = await fetch("https://api-football-v1.p.rapidapi.com/v2/teams/league/30", this.requestKey);
        const data = await response.json();
        return data.api.teams;
    }

    async getTeamById(teamId) {
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v2/teams/team/${teamId}`, this.requestKey);
        const teamData = await response.json();
        return teamData.api.teams;
    }

    async getCurrentSquad(teamId) {
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v2/players/squad/${teamId}/2019-2020`, this.requestKey);
        const squadData = await response.json();
        return squadData.api.players;
    }

    async getPlayer(playerId) {
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v2/players/player/${playerId}`, this.requestKey);
        const playerData = await response.json();
        return playerData.api.players;
    }

    async getTransfer(teamId) {
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v2/transfers/team/${teamId}`, this.requestKey);
        const transfersData = await response.json();
        return transfersData.api.transfers;
    }
}