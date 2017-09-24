const BASE_URL = 'https://www.letssnap-backend.tk'
const GROUPS_URL = BASE_URL + '/groups'
const LOGIN_URL = BASE_URL + '/facebook'

function createEvent(name, start, stop, hash, lat, lng, callback) {
  fetch(GROUPS_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    // credentials: 'include',
    body: JSON.stringify({
      name: name,
      start: start,
      stop: stop,
      hash: hash,
      latitude: lat,
      longitude: lng
    })
  }).then(callback)
}
