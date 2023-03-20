const values = ["pedra", "papel", "tesoura"];
const userValue = process.argv[2];
const machineValue = values[Math.floor(Math.random() * values.length)];

if (userValue === "pedra") {
  if (machineValue === "tesoura") {
    console.log("você ganhou");
  }

  if (machineValue === "papel") {
    console.log("você perdeu");
  }

  if (machineValue === "pedra") {
    console.log("empatou");
  }
}

if (userValue === "papel") {
  if (machineValue === "tesoura") {
    console.log("você perdeu");
  }

  if (machineValue === "papel") {
    console.log("empatou");
  }

  if (machineValue === "pedra") {
    console.log("você ganhou");
  }
}

if (userValue === "tesoura") {
  if (machineValue === "tesoura") {
    console.log("empatou");
  }

  if (machineValue === "papel") {
    console.log("evocê ganhou");
  }

  if (machineValue === "pedra") {
    console.log("você perdeu");
  }
}

console.log(`você jogou ${userValue} e seu oponente jogou ${machineValue}`);