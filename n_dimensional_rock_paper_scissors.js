let plays = {
  rock: 0,
  paper: 1,
  scissors: 2,
  scissor: 2
};

let div_player_a = document.getElementById('div_player_a');
let textarea_player_a = document.getElementById('textarea_player_a');
let div_player_b = document.getElementById('div_player_b');
let textarea_player_b = document.getElementById('textarea_player_b');
let div_result = document.getElementById('div_result');
let h3_result = document.getElementById('h3_result');
let p_score = document.getElementById('p_score');

let a_input = [];
let b_input = [];

function eval_match(_a, _b) {

  let a = plays[_a.toLowerCase()];
  let b = plays[_b.toLowerCase()];

  if (a == b) return 0;
  if (a == (b + 1) % 3) return 1;
  return -1;
}

function run_full_match(a_list, b_list) {

  let score = 0;

  for (let a = 0; a < a_list.length; a++) {
    for (let b = 0; b < b_list.length; b++) {
      score += eval_match(a_list[a], b_list[b]);
    }
  }

  if (score > 0) h3_result.innerHTML = 'Player A Wins!';
  else if (score < 0) h3_result.innerHTML = 'Player B Wins!';
  else h3_result.innerHTML = 'Draw!';

  return score;
}

function submit_a() {
  a_input = textarea_player_a.value.split(' ').filter(function (el) {return el || el === 0;});
  div_player_a.style.display = 'none';
  div_player_b.style.display = 'block';
}
function submit_b() {
  b_input = textarea_player_b.value.split(' ').filter(function (el) {return el || el === 0;});
  div_player_b.style.display = 'none';
  let score = run_full_match(a_input, b_input);
  p_score.innerHTML = 'Score: ' + score;
  div_player_a.style.display = 'block';
  div_player_b.style.display = 'block';
  div_result.style.display = 'block';
}