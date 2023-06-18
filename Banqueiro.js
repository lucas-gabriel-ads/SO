// Função para verificar se uma solicitação de recurso é segura
function isSafeState(available, maximum, allocation, need) {
    var numProcesses = maximum.length;
    var work = available.slice();
    var finish = new Array(numProcesses).fill(false);
  
    // Verificar se todos os processos podem ser alocados
    var safeSequence = [];
    var count = 0;
  
    while (count < numProcesses) {
      var found = false;
  
      for (var i = 0; i < numProcesses; i++) {
        if (!finish[i]) {
          var j;
          for (j = 0; j < available.length; j++) {
            if (need[i][j] > work[j]) {
              break;
            }
          }
  
          if (j === available.length) {
            for (var k = 0; k < available.length; k++) {
              work[k] += allocation[i][k];
            }
  
            safeSequence.push(i);
            finish[i] = true;
            found = true;
            count++;
          }
        }
      }
  
      // Se não encontrar um processo seguro, o estado não é seguro
      if (!found) {
        break;
      }
    }
  
    return count === numProcesses ? safeSequence : null;
  }
  
  // Exemplo de uso
  var available = [3, 3, 2]; // Recursos disponíveis
  var maximum = [
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3]
  ]; // Requisitos máximos de recursos para cada processo
  var allocation = [
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2]
  ]; // Recursos alocados para cada processo
  var need = [
    [7, 4, 3],
    [1, 2, 2],
    [6, 0, 0],
    [0, 1, 1],
    [4, 3, 1]
  ]; // Recursos necessários para cada processo
  
  var safeSequence = isSafeState(available, maximum, allocation, need);
  
  if (safeSequence !== null) {
    console.log("Estado seguro. Sequência segura: ", safeSequence);
  } else {
    console.log("Estado inseguro. Não há sequência segura.");
  }
  