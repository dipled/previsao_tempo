import axios from 'axios';
import readline from 'readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function menuLoop() {
  while (true) {
    console.log("\n=== Consulta de Previsão do Tempo ===");
    try {
      const cidade = await rl.question("Digite o nome da cidade (CTRL+C para sair): ",);
      const estado = await rl.question("Digite a sigla do estado (ex: SC, SP): ");
      try {
        const response = await axios.get('http://localhost:5000/previsao', {
          params: { cidade, estado }
        });
  
        const dados = response.data;
  
        if (dados.erro) {
          console.log(`Erro: ${dados.erro}`);
        } else {
          console.log(`\nPrevisão do tempo para ${dados.cidade} - ${dados.estado}:`);
          console.log(`Temperatura atual: ${dados.temperatura_atual}°C`);
          console.log(`Vento atual: ${dados.vento_atual} km/h`);
          console.log(`Máxima hoje: ${dados.maxima_hoje}°C`);
          console.log(`Mínima hoje: ${dados.minima_hoje}°C`);
          console.log(`Precipitação acumulada hoje: ${dados.precipitacao_hoje} mm`);
          console.log(`Descrição: ${dados.descricao}\n`);
        }
      } catch (error) {
        if (error.response) {
          console.log(`Erro: ${error.response.data.erro}`);
        } else {
          console.log(`Erro de conexão: ${error.message}`);
        }
      }
    } catch (err) {
      if (err.code === 'ABORT_ERR') {
        console.log("\nSaindo...");
        process.exit(0);
      } else {
        console.error("Erro ao ler entrada:", err);
        continue;
      }
    }

  }
}

menuLoop();
