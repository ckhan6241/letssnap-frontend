const BASE_URL = 'https://www.letssnap-backend.tk'
const GROUPS_URL = BASE_URL + '/groups'
const SEARCH_URL = BASE_URL + '/groups/get/GroupsWithCoordinate'

function createEvent(name, start, stop, hash, lat, lng, callback) {
  fetch(GROUPS_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
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

function searchEvents(lat, lng, callback) {
  fetch(SEARCH_URL + '/' + lat + '/' + lng, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then(callback)
}