// api/scanner.js
export default async function handler(request, response) {
  // Configura CORS - IMPORTANTE para funcionar no Lovable
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Responde imediatamente para requisições OPTIONS (pré-flight)
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }
  
  // Permite apenas requisições POST
  if (request.method !== 'POST') {
    return response.status(405).json({ 
      error: 'Método não permitido. Use POST.' 
    });
  }
  
  try {
    // Extrai a URL do corpo da requisição
    const { url } = request.body;
    
    if (!url) {
      return response.status(400).json({ 
        error: 'Parâmetro "url" é obrigatório no corpo da requisição.' 
      });
    }
    
    console.log(`Iniciando scan para: ${url}`);
    
    // ?? SIMULAÇÃO - REMOVA ISSO DEPOIS!
    // Esta é uma resposta mockada para testes iniciais
    const mockData = {
      url: url,
      timestamp: new Date().toISOString(),
      score: Math.floor(Math.random() * 100), // Score aleatório
      issues: [
        {
          type: 'error',
          message: 'Missing alt text on images',
          element: 'img#logo',
          impact: 'serious'
        },
        {
          type: 'warning', 
          message: 'Low contrast text',
          element: '.btn-primary',
          impact: 'moderate'
        }
      ],
      errorCount: 1,
      warningCount: 1,
      noticeCount: 0
    };
    
    console.log('Scan concluído com sucesso');
    return response.status(200).json(mockData);
    
  } catch (error) {
    console.error('Erro no scanner:', error);
    return response.status(500).json({ 
      error: 'Falha interna ao processar a requisição.',
      details: error.message 
    });
  }
}
