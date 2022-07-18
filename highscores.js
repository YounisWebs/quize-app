const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

 
highScoresList.innerHTML = highScores.map(score => {
    return `<div class="player"><div class="player-name">
    ${score.name}</div>
    <div class="player-score">
    ${score.score}
    </div></div>`}).join("")