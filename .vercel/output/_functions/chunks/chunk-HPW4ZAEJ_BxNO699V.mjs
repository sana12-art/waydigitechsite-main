import { W as WIX_CLIENT_ID } from './client_CNyuvofr.mjs';

function saveSessionTokensToCookie(context, tokens) {
  const cookieOptions = {
    path: "/",
    secure: true
  };
  context.cookies.set("wixSession", sessionCookieJson(tokens), cookieOptions);
}
function sessionCookieJson(tokens) {
  return {
    clientId: WIX_CLIENT_ID,
    tokens
  };
}

export { saveSessionTokensToCookie as s };
