const clientId = "131"; // Deine Client-ID
const redirectUri = "https://misa-ku.github.io/oauth/callback/callback.html"; // exakt wie bei der App registriert!
const scope = "read:time-tables"; // Passe ggf. an, je nach API-Berechtigung

// Generiere zufälligen Code Verifier
function generateCodeVerifier(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// SHA256 + base64-url encode (für code_challenge)
async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Login-Button-Funktion
async function redirectToAuth() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Save Verifier für späteren Token-Tausch
  localStorage.setItem("code_verifier", codeVerifier);

  const authUrl = `https://beste.schule/oauth/authorize?` +
    `client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scope)}` +
    `&code_challenge=${codeChallenge}` +
    `&code_challenge_method=S256`;

  window.location.href = authUrl;
}
