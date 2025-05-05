async function generatePKCE() {
  const codeVerifier = btoa(crypto.getRandomValues(new Uint8Array(32)).join('')).slice(0, 128);
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const base64Digest = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return { codeVerifier, codeChallenge: base64Digest };
}

async function redirectToAuth() {
  const { codeVerifier, codeChallenge } = await generatePKCE();
  localStorage.setItem('code_verifier', codeVerifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: '131',
    redirect_uri: 'https://misa-ku.github.io/oauth/callback/',
    scope: 'read:stundenplan',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  window.location = `https://beste.schule/oauth/authorize?${params.toString()}`;
}
