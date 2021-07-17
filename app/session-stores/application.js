// import Cookie from 'ember-simple-auth/session-stores/cookie';

// export default Cookie.extend();

import CookieStore from 'ember-simple-auth/session-stores/cookie';

export default class ApplicationSessionStore extends CookieStore {}