import { Component } from '@angular/core';
import { retry } from 'rxjs';

@Component({
  selector: 'app-test-programs',
  templateUrl: './test-programs.component.html',
  styleUrls: ['./test-programs.component.css']
})

export class TestProgramsComponent {

  constructor() { }
  suits = ["C", "D", "H", "S"];
  values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  deck: any = [];
  randomCards: any = [];
  //sortedHand: any = [];
  cardsCount: number = 5;
  rankArray: any = [];
  suitArray: any = [];
  finalResult: string = "";
  tempDeck: any = [];
  player2Cards: any = [];
  player3Cards: any = [];
  player4Cards: any = [];
  player5Cards: any = [];

  player1SortedCards: any = [];
  player2SortedCards: any = [];
  player3SortedCards: any = [];
  player4SortedCards: any = [];
  player5SortedCards: any = [];

  player1RanksAndSuits: [any, any] = [[], []];
  player2RanksAndSuits: [any, any] = [[], []];
  player3RanksAndSuits: [any, any] = [[], []];
  player4RanksAndSuits: [any, any] = [[], []];
  player5RanksAndSuits: [any, any] = [[], []];

  play1Final: string = "";
  play2Final: string = "";
  play3Final: string = "";
  play4Final: string = "";
  play5Final: string = "";
  ngOnInit() {
    this.generateDeckCards();
  }

  // Prepare the deck
  // Generate random 5 cards for each person
  // sort the cards
  // Gets the suits and Ranks for each person
  // Final result
  generateDeckCards = () => {
    this.deck = [];
    this.tempDeck = [];
    for (let suit in this.suits) {
      for (let value in this.values) {
        this.deck.push(this.values[value] + "" + this.suits[suit]);
        this.tempDeck.push(this.values[value] + "" + this.suits[suit]);;
      }
    }
    console.log(this.deck);
    // this.tempDeck = this.deck;

    // this.randomCards = this.deck.sort(() => Math.random() - Math.random()).slice(0, 5);

    this.randomCards = this.getRandomCards();
    this.player2Cards = this.getRandomCards();
    this.player3Cards = this.getRandomCards();
    this.player4Cards = this.getRandomCards();
    this.player5Cards = this.getRandomCards();
    console.log("Random Values", this.randomCards);

    this.player1SortedCards = this.getSortedCards(this.randomCards);
    this.player2SortedCards = this.getSortedCards(this.player2Cards);
    this.player3SortedCards = this.getSortedCards(this.player3Cards);
    this.player4SortedCards = this.getSortedCards(this.player4Cards);
    this.player5SortedCards = this.getSortedCards(this.player5Cards);

    this.player1RanksAndSuits = this.getSuitAndRanks(this.player1SortedCards,);
    this.player2RanksAndSuits = this.getSuitAndRanks(this.player2SortedCards);
    this.player3RanksAndSuits = this.getSuitAndRanks(this.player3SortedCards);
    this.player4RanksAndSuits = this.getSuitAndRanks(this.player4SortedCards);
    this.player5RanksAndSuits = this.getSuitAndRanks(this.player5SortedCards);
    console.log("this.player1RanksAndSuits", this.player1RanksAndSuits);
    //console.log("flush", this.isFlush());
    //console.log("straight", this.isStraight());
    //console.log("pair", this.pairs());
    this.play1Final = this.finalHand(this.player1RanksAndSuits);
    this.play2Final = this.finalHand(this.player2RanksAndSuits);
    this.play3Final = this.finalHand(this.player3RanksAndSuits);
    this.play4Final = this.finalHand(this.player4RanksAndSuits);
    this.play5Final = this.finalHand(this.player5RanksAndSuits);
  }

  getRandomCards = () => {
    let tempRandom: any = [];
    //return [...this.deck].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 5);
    // this.tempDeck = this.deck;
    console.log("tempDeck", this.tempDeck.length);
    for (let i = 0; i < this.tempDeck.length; i++) {
      let rand = Math.floor(Math.random() * this.tempDeck.length);
      if (tempRandom.indexOf(this.tempDeck[rand]) == -1) {
        tempRandom.push(this.tempDeck[rand]);
        // this.tempDeck.slice(rand, 1);
        this.tempDeck.splice(rand, 1);
      }
      if (tempRandom.length == this.cardsCount) break;
    }
    console.log("this.deck1", tempRandom);
    return tempRandom
  }

  getSortedCards = (randomCards: any): [] => {
    let sortedHand: any = [];
    for (let i = 0; i < this.values.length; i++) {
      for (let j = 0; j < randomCards.length; j++) {
        if (randomCards[j].length == 2) {
          if (this.values[i] === randomCards[j].charAt(0)) {
            sortedHand.push(randomCards[j])
          }
        }
        else {
          if (this.values[i] === randomCards[j].substring(0, 2)) {
            sortedHand.push(randomCards[j])
          }
        }
      }
    }
    //console.log("Sorted Values", this.sortedHand);
    return sortedHand;
  }



  getSuitAndRanks = (sortedArray: any): [[], []] => {
    let rankArray: any = [];
    let suitArray: any = [];
    for (let i = 0; i < sortedArray.length; i++) {
      let sted = sortedArray;
      rankArray.push(sted[i].charAt(0))
      suitArray.push(sted[i].charAt(1))
    }
    // console.log("this.rankArray", rankArray);
    // console.log("this.suitArray", suitArray);
    return [rankArray, suitArray];
  }

  countSuites = (suitArray: []): {} => {
    let suitCount: any = {};
    suitArray.forEach(function (x) {
      suitCount[x] = (suitCount[x] || 0) + 1;
    });
    return suitCount;
  }

  countRanks = (rankArray: []): {} => {
    let rankCount: any = {};
    rankArray.forEach(function (x) {
      rankCount[x] = (rankCount[x] || 0) + 1;
    });
    return rankCount;
  }

  isFlush = (suitArray: []): boolean => {
    // this.suitArray = ['D', 'D', 'D', 'D', 'D'];
    let cS: { [key: string]: number } = this.countSuites(suitArray);
    // console.log(cS);
    console.log("suit Array in FLush", suitArray);
    if (Object.keys(cS).find(key => cS[key] === 5)) {
      return true;
    } else {
      return false;
    }
  }

  isStraight = (rankArray: any): string => {
    // this.rankArray = ['3', '4', '1', 'J', 'A'];
    //this.rankArray = ['7', '8', '9', '10', 'J'];
    let index = this.values.indexOf(rankArray[0]);
    let ref = this.values.slice(index, index + 5).join("");
    let section = rankArray.slice(0).join("");
    console.log("section", section);
    console.log("ref", ref);
    if (section === "10JQKA" && section === ref) {
      return "Straight Flush";
    } else if (section === "A2345" || section === ref) {
      return "Straight";
    } else {
      return "False";
    }
  }

  pairs = (rankArray: any) => {
    let rS: { [key: string]: number } = this.countRanks(rankArray);
    return Object.keys(rS).filter(key => rS[key] === 2).length;
  }

  finalHand(player1RanksAndSuits: [any, any]): string {
    this.finalResult = "";
    let rS: { [key: string]: number } = this.countRanks(player1RanksAndSuits[0]);
    if (this.isFlush(player1RanksAndSuits[1]) === true && this.isStraight(player1RanksAndSuits[0]) === "Straight Flush") {
      this.finalResult = "Royal Flush";
    } else if (this.isFlush(player1RanksAndSuits[1]) === true && this.isStraight(player1RanksAndSuits[0]) === "Straight") {
      this.finalResult = "Straight Flush";
    } else if (Object.keys(rS).find(key => rS[key] === 4)) {
      this.finalResult = "Four of a Kind";
    } else if (Object.keys(rS).find(key => rS[key] === 3) && this.pairs(player1RanksAndSuits[0]) === 1) {
      this.finalResult = "Full House";
    } else if (this.isFlush(player1RanksAndSuits[1]) === true) {
      this.finalResult = "Flush";
    } else if (this.isStraight(player1RanksAndSuits[0]) === "Straight") {
      this.finalResult = "Straight";
    } else if (Object.keys(rS).find(key => rS[key] === 3)) {
      this.finalResult = "Three of a Kind";
    } else if (this.pairs(player1RanksAndSuits[0]) === 2) {
      this.finalResult = "Two Pair";
    } else if (this.pairs(player1RanksAndSuits[0]) === 1) {
      this.finalResult = "Pair";
    } else {
      // this.finalResult = "High Card is " +  player1RanksAndSuits[0][player1RanksAndSuits[0].length - 1];
      this.finalResult = "High Card";
    }
    return this.finalResult;
  }
}
