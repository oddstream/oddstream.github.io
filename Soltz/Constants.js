const Constants = {
  GAME_NAME: 'Oddstream Soltz',
  GAME_VERSION: '19.11.8.0',
  SVG_NAMESPACE: 'http://www.w3.org/2000/svg',
  LOCALSTORAGE_GAME: 'Oddstream Soltz Game',
  LOCALSTORAGE_SETTINGS: 'Oddstream Soltz Settings',

  MOBILE:     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  CHROME:     navigator.userAgent.indexOf('Chrome/') !== -1,   // also Brave, Opera
  EDGE:       navigator.userAgent.indexOf('Edge/') !== -1,
  FIREFOX:    navigator.userAgent.indexOf('Firefox/') !== -1,

  GRID_SIZE: 4,
  GRID_GAP: 100,  // left and top margin
  CARD_SIZE: 100, // square cards, width == height
  CARD_GAP: 5,
  CARD_RADIUS: 5,     // CARD_SIZE / 20
  BUTTON_WIDTH: 100,  // Constants.CARD_SIZE,
  BUTTON_HEIGHT: 50,  // Constants.CARD_SIZE / 2,
}

export default Constants;