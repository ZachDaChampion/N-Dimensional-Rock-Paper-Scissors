let plays = {
  rock: 0,
  paper: 1,
  scissors: 2,
  scissor: 2
};

let player_label = document.getElementById('player_label');
let player_choices = document.getElementById('player_choices');
let results_div = document.getElementById('div_result');
let h3_result = document.getElementById('h3_result');
let p_scores = document.getElementById('p_scores');

let player_inputs = [];

function eval_match(_a, _b) {

  let a = plays[_a.toLowerCase()];
  let b = plays[_b.toLowerCase()];

  if (a == b) return 0;
  if (a == (b + 1) % 3) return 1;
  return -1;
}

function run_pair(a_list, b_list) {

  let score = 0;

  for (let a = 0; a < a_list.length; a++) {
    for (let b = 0; b < b_list.length; b++) {
      score += eval_match(a_list[a], b_list[b]);
    }
  }

  return score;
}

function run_full_match(lists) {

  let scores = {};

  for (let playera = 0; playera < player_inputs.length; playera++) {
    scores[String.fromCharCode(65 + playera)] = 0;
    for (let playerb = 0; playerb < player_inputs.length; playerb++) {
      if (playera != playerb) scores[String.fromCharCode(65 + playera)] += run_pair(player_inputs[playera], player_inputs[playerb]);
    }
  }
  return scores;
}

function submit_choices() {
  player_inputs.push(player_choices.value.split(' ').filter(function (el) {return el || el === 0;}));
  let new_letter = String.fromCharCode(65 + player_inputs.length);
  player_label.innerHTML = "Enter player " + new_letter + "'s choices";
  player_choices.name = "Player " + new_letter + "'s choices";
  player_choices.value = '';
}

function submit_all() {
  let scores = run_full_match(player_inputs);
  let keysSorted = Object.keys(scores).sort(function(x,y){return scores[y]-scores[x]});
  console.log(scores, keysSorted);
  let winners = [];
  let score = scores[keysSorted[0]];
  for (let i = 0; i < keysSorted.length; i++) {
    if (scores[keysSorted[i]] == score) winners.push(keysSorted[i]);
    else break;
  }
  h3_result.innerHTML = "Winners: " + winners.join(', ');
  if (winners.length == keysSorted.length) h3_result.innerHTML = "Draw between everyone";
  let results_text = '';
  for (let i = 0; i < keysSorted.length; i++) {
    results_text += keysSorted[i] + ': ' + scores[keysSorted[i]] + '<br>';
  }
  p_scores.innerHTML = results_text;
  div_result.style.display = 'block';
}