export default class AssociationTable {
  // https://en.wikipedia.org/wiki/Associative_entity
  constructor() {
    this.mapTileCard = new Map();
    this.mapCardTile = new Map();
  }

  /**
   * @param {Tile} place 
   * @param {Card} card 
   */
  putCard(place, card) {
    this.mapTileCard.set(place, card);
    this.mapCardTile.set(card, place);
  }

  /**
   * @param {Tile} place 
   */
  getCard(place) {
    return this.mapTileCard.get(place);
  }

  /**
   * @param {Card} card 
   */
  getTile(card) {
    return this.mapCardTile.get(card);
  }

  /**
   * @param {Tile} fromTile 
   * @param {Tile} toTile 
   */
  moveCard(fromTile, toTile) {
    const card = this.mapTileCard.get(fromTile);

    this.mapTileCard.delete(fromTile);
    this.mapCardTile.delete(card);
    
    this.mapTileCard.set(toTile, card);
    this.mapCardTile.set(card, toTile);
  }

  /**
   * @param {Tile} place1 
   * @param {Tile} place2 
   */
  swapCards(place1, place2) {
    const card1 = this.mapTileCard.get(place1);
    const card2 = this.mapTileCard.get(place2);

    this.mapTileCard.delete(place1);
    this.mapCardTile.delete(card1);

    this.mapTileCard.delete(place2);
    this.mapCardTile.delete(card2);

    this.mapTileCard.set(place1, card2);
    this.mapCardTile.set(card2, place1);

    this.mapTileCard.set(place2, card1);
    this.mapCardTile.set(card1, place2);
  }

  /**
   * @param {Card} card 
   */
  deleteCard(card) {
    const place = this.mapCardTile.get(card);

    this.mapTileCard.delete(place);
    this.mapCardTile.delete(card);
  }

  reset() {
    this.mapTileCard.clear();
    this.mapCardTile.clear();
  }
}

