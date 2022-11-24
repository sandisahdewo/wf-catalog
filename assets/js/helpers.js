const apiURL = 'http://localhost/api/public/api/v1/'

function getUrlParams() {
  return Object.fromEntries((new URLSearchParams(window.location.search).entries()))
}