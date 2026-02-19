const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

console.log('🔑 API Key présente:', API_KEY ? 'OUI' : 'NON');

export async function reecrireEmailAvecGemini(emailOriginal, ton) {
  if (!API_KEY) {
    throw new Error('Clé API Gemini manquante');
  }

  const prompt = creerPrompt(emailOriginal, ton);
  
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    console.log('📡 Status API:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur API:', errorText);
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Réponse reçue');
    
    return data.candidates[0].content.parts[0].text;
    
  } catch (error) {
    console.error('💥 Erreur complète:', error);
    throw error;
  }
}

function creerPrompt(email, ton) {
  const prompts = {
    raccourcir: `Réécris cet email de manière plus courte et concise, tout en gardant le message principal et un ton professionnel :

${email}`,
    
    clarifier: ` Réécris cet email pour le rendre plus clair, précis et bien structuré. Améliore la grammaire et la syntaxe :

${email}`,
    
    pro: `Transforme cet email en version très professionnelle et formelle. Utilise un langage soutenu et des formules de politesse appropriées :

${email}`
  };
  
  return prompts[ton] || prompts.pro;
}