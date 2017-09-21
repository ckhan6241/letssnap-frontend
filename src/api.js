const BASE_URL = 'https://www.letssnap.tk'
const GROUPS_URL = BASE_URL + '/groups'

function createEvent(name, start, stop, hash, callback) {
  fetch(GROUPS_URL,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: name,
      start: start,
      stop: stop,
      hash: hash
    })
  }).then(callback)
}