async function exchangeCodeForToken() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
    console.error("Kein Code in der URL gefunden");
    return;
  }

  const codeVerifier = localStorage.getItem("pkce_code_verifier");

  if (!codeVerifier) {
    console.error("Kein Code Verifier gefunden");
    return;
  }

  // Setze hier wieder deine Werte ein
  const clientId = "DEINE_CLIENT_ID_HIER";
  const redirectUri = "https://misa-ku.github.io/oauth/callback/";

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    code: code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  try {
    const response = await fetch("https://beste.schule/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body.toString(),
    });

    const data = await response.json();

    if (data.access_token) {
      console.log("Access Token:", data.access_token);
      // Hier kannst du den Token speichern oder API-Calls machen
    } else {
      console.error("Fehler beim Token-Austausch:", data);
    }
  } catch (err) {
    console.error("Request fehlgeschlagen:", err);
  }
}

exchangeCodeForToken();
