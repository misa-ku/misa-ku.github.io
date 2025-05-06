async function generatePKCE() {
  // Erstelle zufälligen Code Verifier
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  const codeVerifier = btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  // SHA-256 hash + base64-url encode = Code Challenge
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return { codeVerifier, codeChallenge };
}

async function redirectToAuth() {
  const { codeVerifier, codeChallenge } = await generatePKCE();

  // Speichere Code Verifier im localStorage für später
  localStorage.setItem('pkce_code_verifier', codeVerifier);

  // Setze deine Infos hier ein ↓↓↓
  const clientId = "131";
  const redirectUri = "https://misa-ku.github.io/oauth/callback/callback.html";
  const scope = ""; // je nachdem, was du brauchst

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  window.location.href = `https://beste.schule/oauth/authorize?${params.toString()}`;
}
