const graphConfigs = [
  { canvasId: 'graficoGPU', jsonFile: 'price_history/price_history/kabum-prices.json', title: 'Evolução de Preços - Kabum' },
  { canvasId: 'graficoVendas', jsonFile: 'price_history/price_history/pichau-prices.json', title: 'Evolução de Preços - Pichau' },
  { canvasId: 'graficoEstoque', jsonFile: 'price_history/price_history/terabyte-prices.json', title: 'Evolução de Preços - Terabyte' }
];

// Store chart instances to update them later
const charts = {};

// Function to create or update a line graph
function createOrUpdateLineGraph(canvasId, jsonFile, title) {
  fetch(jsonFile)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then(dados => {
      const ctx = document.getElementById(canvasId).getContext('2d');
      const cores = ['#f87171', '#60a5fa', '#facc15', '#34d399', '#a78bfa', '#fb923c'];

      const allDates = new Set();
      Object.values(dados).forEach(prices => prices.forEach(p => allDates.add(p.date)));
      const sortedDates = Array.from(allDates).sort();

      const datasets = Object.entries(dados).map(([modelo, prices], i) => {
        const priceMap = new Map(prices.map(p => [p.date, p.price]));
        const priceData = sortedDates.map(date => priceMap.get(date) || null);
        return {
          label: modelo,
          data: priceData,
          borderColor: cores[i % cores.length],
          backgroundColor: cores[i % cores.length],
          fill: false,
          tension: 0.2,
          pointRadius: 4,
          spanGaps: true
        };
      });

      // If chart exists, update it; otherwise, create a new one
      if (charts[canvasId]) {
        charts[canvasId].data.labels = sortedDates;
        charts[canvasId].data.datasets = datasets;
        charts[canvasId].update();
      } else {
        charts[canvasId] = new Chart(ctx, {
          type: 'line',
          data: { labels: sortedDates, datasets: datasets },
          options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' }, title: { display: true, text: title } },
            scales: {
              y: { title: { display: true, text: 'Preço (R$)' }, suggestedMin: 0 },
              x: {
                title: { display: true, text: 'Data' },
                ticks: {
                  callback: function(value, index) {
                    return new Date(sortedDates[index]).toLocaleDateString('pt-BR');
                  }
                }
              }
            }
          }
        });
      }
    })
    .catch(error => console.error(`Error loading ${jsonFile}:`, error.message));
}

// Initial chart creation
graphConfigs.forEach(config => createOrUpdateLineGraph(config.canvasId, config.jsonFile, config.title));

// Periodically reload charts (every hour)
setInterval(() => {
  graphConfigs.forEach(config => createOrUpdateLineGraph(config.canvasId, config.jsonFile, config.title));
}, 3600000); // 3600000 ms = 1 hour
