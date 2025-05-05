(async function handleCallback() {
    const code = new URLSearchParams(window.location.search).get('code');
    const codeVerifier = localStorage.getItem('code_verifier');
  
    if (!code || !codeVerifier) {
      document.body.innerHTML = "<h2>Fehler: Code oder Verifier fehlt</h2>";
      return;
    }
  
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://DEINUSERNAME.github.io/smartschool/oauth/callback/',
      client_id: 'DEINE_CLIENT_ID_HIER',
      code_verifier: codeVerifier,
    });
  
    const res = await fetch('https://beste.schule/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  
    const data = await res.json();
    console.log('Access Token:', data.access_token);
  
    document.body.innerHTML = `<h2>Login erfolgreich ✅</h2><pre>${JSON.stringify(data, null, 2)}</pre>`;
  })();
  