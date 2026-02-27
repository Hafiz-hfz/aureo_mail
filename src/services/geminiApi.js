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
    raccourcir: `Tu es un expert en rédaction d\’e-mails professionnels concis et efficaces.
Objectif :Transformer l\’email ci-dessous en une version raccourcie, plus directe et plus précise, tout en conservant le sens, l’intention et le contexte.
Contraintes STRICTES :- Réduis la longueur de l’email de manière significative- Supprime toute redondance, formule inutile ou phrase creuse- Va droit au but, sans perdre le professionnalisme- Ton naturel, humain et crédible (pas générique)- Aucune explication, aucun commentaire, aucun conseil- Ne mentionne pas les modifications effectuées- N’utilise PAS de symboles spéciaux (*, -, •, emojis, balises)- Ne pose pas de questions au destinataire- Ne rajoute aucune information nouvelle- Ne change pas l’intention initiale de l’email- Résultat final uniquement : le texte de l’email, prêt à envoyer
Contexte :L\’email est rédigé par un professionnel qui souhaite un message court, clair et efficace, sans formules superflues.
Email à raccourcir : ${email}`,
    
    clarifier: `Tu es un expert en rédaction d’e-mails professionnels spécialisé dans la clarification et la synthèse.
Objectif :Transformer l’email ci-dessous en une version clarifiée, concise et immédiatement compréhensible, prête à être envoyée.
Définition du ton CLARIFIER :- Rendre le message plus clair et plus précis- Supprimer toute ambiguïté ou redondance- Aller droit au but sans perdre le sens- Formuler des phrases simples, structurées et naturelles- Mettre en avant l’essentiel du message
Contraintes STRICTES :- Ne fournis QUE la version finale de l’email- Aucune explication, aucun commentaire, aucun raisonnement- N’utilise PAS de symboles (*, -, •), emojis ou balises- Ne rends PAS l’email générique ou standardisé- Ne change PAS l’intention initiale de l’email- Ne rajoute aucune information non présente ou implicite- Ton professionnel, sobre et naturel- Email plus court que l’original, mais complet- Texte fluide, lisible et précis- Ne pose aucune question au destinataire- N’utilise pas de formules vagues ou passe-partout
Contexte :L’email est rédigé par un professionnel qui souhaite être compris rapidement, sans détour, avec un message clair et crédible.
Email à clarifier :${email}`,
    
    pro: ` Tu es un expert en rédaction d’e-mails professionnels à fort impact.

Ta mission :
Réécrire l’email ci-dessous en une version professionnelle, claire et efficace, prête à être envoyée immédiatement.

Contraintes STRICTES :
- Va droit au but, sans phrases inutiles
- Ton professionnel, naturel et humain
- Email réfléchi, contextuel et crédible (pas générique)
- Aucune explication, aucun commentaire, aucun conseil
- Ne mentionne pas les améliorations effectuées
- N’utilise PAS de symboles comme *, -, •, emojis ou balises
- Ne pose pas de questions au lecteur
- Ne rajoute aucune information qui n’est pas implicite dans l’email
- Ne change pas l’intention de départ
- Longueur équilibrée : ni trop courte, ni trop longue
- Résultat final uniquement : le texte de l’email, rien d’autre

Contexte :
L’email est écrit par un professionnel (freelance / candidat / collaborateur) qui souhaite paraître sérieux, structuré et crédible.

Email à reformuler : ${email}`,

prospection: ` Tu es un expert en prospection par e-mail avec une maîtrise avancée des techniques de conversion.
Objectif :Transformer l\’email ci-dessous en un email de prospection professionnel, efficace et convaincant, prêt à être envoyé à un prospect réel.
Définition du ton PROSPECTION :- Email orienté conversion, pas informatif- Message clair, direct et structuré- Accent mis sur la valeur pour le prospect- Intérêt éveillé dès les premières lignes- Crédibilité et posture professionnelle- Appel à l\’action implicite, naturel et non agressif
Contraintes STRICTES :- Fournis UNIQUEMENT la version finale de l’email- Aucune explication, aucun commentaire, aucun raisonnement- N’utilise PAS de symboles (*, -, •), emojis ou balises- Ne rends PAS l’email générique ou passe-partout- Adapte le message au contexte implicite du mail- Ne change PAS l\’intention initiale- Ne rajoute aucune promesse irréaliste- Ton professionnel, humain et sûr- Email concis, orienté impact- Ne pose PAS de questions ouvertes vagues- Évite les formulations commerciales agressives- Évite les clichés de prospection
Structure attendue (sans l\’indiquer explicitement) :
- Accroche pertinente et contextualisée
- Proposition de valeur claire et utile
- Message centré sur le besoin du prospect
- Conclusion engageante et professionnelle
Contexte :
L\’email est envoyé par un professionnel qui contacte un prospect pour une opportunité réelle (service, collaboration, mission ou offre), 
avec l\’objectif d\’obtenir une réponse ou un échange.
Email de départ à transformer : ${email}  `,
  };
  
  return prompts[ton] || prompts.pro;
}