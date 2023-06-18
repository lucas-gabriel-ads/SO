function calcularTempos(processos, quantum, trocaContexto) {
    const tempos = [];
  
    processos.sort((a, b) => a.ingresso - b.ingresso);
  
    let tempoAtual = 0;
    let processosRestantes = [...processos];
  
    while (processosRestantes.length > 0) {
        const processoAtual = processosRestantes.shift();

        if (processosRestantes.length == 0){
            tempoAtual += processoAtual.duracao;
            const tempoEspera = (tempoAtual - processoAtual.ingresso) - processoAtual.duracaoTotal;
            const tempoVida = tempoAtual - processoAtual.ingresso;
            tempos.push({
                processo: processoAtual,
                tempoVida: tempoVida,
                tempoEspera: tempoEspera
            });
        }else{
            if (processoAtual.duracao <= quantum) {
                tempoAtual += processoAtual.duracao;
                const tempoEspera = (tempoAtual - processoAtual.ingresso) - processoAtual.duracaoTotal;
                const tempoVida = tempoAtual - processoAtual.ingresso;
                tempos.push({
                    processo: processoAtual,
                    tempoVida: tempoVida,
                    tempoEspera: tempoEspera
                });
            } else {
                tempoAtual += quantum;
                processoAtual.duracao -= quantum;
                processosRestantes.push(processoAtual);
            }
        }

        tempoAtual += trocaContexto;
    }
    return tempos;
}
  
const processos = [
    { ingresso: 5, duracao: 30, duracaoTotal: 30 },
    { ingresso: 15, duracao: 10, duracaoTotal: 10 },
    { ingresso: 10, duracao: 40, duracaoTotal: 40 },
    { ingresso: 0, duracao: 20, duracaoTotal: 20 },
];
  
const quantum = 15;
const trocaContexto = 4;
  
const tempos = calcularTempos(processos, quantum, trocaContexto);
tempos.forEach((tempo) => {
    console.log(`Processo ${tempo.processo.ingresso}:`);
    console.log("Tempo de vida:", tempo.tempoVida);
    console.log("Tempo de espera:", tempo.tempoEspera);
    console.log("-------------------------------------");
});

let totalEspera = 0
let totalVida = 0
for (let i=0; i<tempos.length; i++){
    totalEspera += tempos[i].tempoEspera;
    totalVida += tempos[i].tempoVida;
}
console.log("Tempo médio de vida: ", totalVida/tempos.length);
console.log("Tempo médio de espera: ", totalEspera/tempos.length);
  