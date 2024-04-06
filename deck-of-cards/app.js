/** -------------------------------------------------------------------------------- **
 ** ---------------------------[Assignment] Deck of Cards--------------------------- **
 ** -------------------------------------------------------------------------------- **/
"use strict";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck {
  #deckId = null;
  #cardsDrawn = [];
  #headers = new Headers({
    "Content-Type": "application/json",
  });
  constructor() {
    this.#init();
  }

  async #init() {
    this.#deckId = await this.#getDeck();
  }

  async #getDeck() {
    try {
      const response = await fetch(`${BASE_URL}/new/shuffle`, {
        headers: this.#headers,
      });
      if (!response.ok) {
        throw new Error("Failed to get a new deck.");
      }
      const data = await response.json();
      if (!data.success) throw new Error("Failed to get a new deck.");
      return data.deck_id;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async drawCard() {
    try {
      const response = await fetch(
        `${BASE_URL}/${this.#deckId}/draw/?count=1`,
        { headers: this.#headers }
      );
      if (!response.ok) {
        throw new Error("Failed to draw card.");
      }
      const data = await response.json();
      if (!data.success) throw new Error("Failed to draw card.");
      this.#cardsDrawn.push(data.cards[0]);
      return { success: true, card: data.cards[0], remains: data.remaining };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async resetDeck() {
    const query = new URLSearchParams({
      cards: this.#cardsDrawn.map((card) => card.code).join(","),
    });
    const url = `${BASE_URL}/${this.#deckId}/return/?${query}`;

    this.#cardsDrawn = [];
    try {
      const response = await fetch(url, {
        headers: this.#headers,
      });
      if (!response.ok) {
        throw new Error("Failed to reset deck.");
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error("Failed to reset deck.");
      }
      this.#deckId = data.deck_id;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

class Game {
  #cardsCount = 0;
  #deck = new Deck();
  #cardsContainer = document.getElementById("deck");
  //   #shuffleBtn = document.getElementById("shuffle");
  #drawBtn = document.getElementById("draw");
  #resetBtn = document.getElementById("reset");
  #renderedCards = [];
  #drawIsThrottled = false;
  #cardAnimationDuration = 3;

  constructor() {
    this.#drawBtn.addEventListener("click", this.#drawCard.bind(this));

    // this.#shuffleBtn.addEventListener("click", this.#shuffleDeck.bind(this));
    this.#resetBtn.addEventListener("click", this.#reset.bind(this));
  }

  async #drawCard() {
    if (this.#drawIsThrottled) return;
    this.#drawIsThrottled = true;
    const drawResponse = await this.#deck.drawCard();
    this.#drawIsThrottled = false;
    if (!drawResponse.success) this.#showErrorMsg(drawResponse.error);
    const card = drawResponse;
    const renderedCard = this.#renderCard(card);
    this.#renderedCards.push(renderedCard);
  }

  #renderCard({ card, remains }) {
    if (remains === 0) {
      this.#drawBtn.disabled = true;
      this.#drawBtn.classList.add("disabled");
    }
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");

    const img = document.createElement("img");
    img.src = card.image;
    img.alt = card.code;
    cardEl.appendChild(img);
    this.#cardsContainer.appendChild(cardEl);
    const rotation = Math.random() * 90 - 45; // Random rotation between -45 and 45 degrees
    const randomX = Math.ceil(Math.random() * 30) - 10; // Random X between -10 and 20
    const randomY = Math.ceil(Math.random() * 20) - 10; // Random Y between -10 and 10
    cardEl.style.transform = `translate(${-50 + randomX}%, ${
      -50 + randomY
    }%) rotate(${rotation}deg)`;
    cardEl.style.zIndex = this.#cardsCount++;
    cardEl.style.transition = `all ${this.#cardAnimationDuration}s`;

    if (this.#cardsCount === 1) {
      this.#resetBtn.disabled = false;
      this.#resetBtn.classList.remove("disabled");
    }

    return { card: cardEl, rotation, randomX, randomY };
  }

  //   async #shuffleDeck() {}

  async #reset() {
    this.#drawBtn.disabled = true;
    this.#drawBtn.classList.add("disabled");
    this.#resetBtn.disabled = true;
    this.#resetBtn.classList.add("disabled");
    const resetDeck = await this.#deck.resetDeck();
    const resetAnimation = await this.#animateReset();
    this.#cardsCount = 0;
    this.#renderedCards = [];
    this.#cardsContainer.innerHTML = "";
    if (!resetDeck.success || !resetAnimation.success) {
      this.#resetBtn.disabled = false;
      this.#resetBtn.classList.remove("disabled");
      this.#showErrorMsg("Failed to reset the deck. Please try again.");
    }

    this.#drawBtn.disabled = false;
    this.#drawBtn.classList.remove("disabled");
  }

  #animateCard({ card, rotation, randomX, randomY }) {
    console.log(card, rotation, randomX, randomY);
    if (rotation > 0) {
      card.style.transform = `translate(${(randomX || 1) * 200}%, ${
        (randomY || 1) * 200
      }%) rotate(${rotation + 360}deg`;
    } else {
      card.style.transform = `translate(${(randomX || 1) * -200}%, ${
        (randomY || 1) * -200
      }%) rotate(${rotation + 360}deg`;
    }
    // card.style.transition = `transform ${this.#cardAnimationDuration}s`;
  }
  #animateReset() {
    return new Promise((resolve, reject) => {
      if (this.#renderedCards.length === 0) {
        resolve({ success: true });
      }
      this.#renderedCards.forEach((card) => {
        if (!card) reject({ success: false, error: "Card not found." });
        this.#animateCard(card);
      });
      setTimeout(() => {
        resolve({ success: true });
      }, (this.#cardAnimationDuration / 2) * 1000);
    });
  }

  #showErrorMsg(message) {
    const errorEl = document.createElement("div");
    errorEl.classList.add("error");
    errorEl.textContent = message;
    this.#cardsContainer.appendChild(errorEl);
    throw new Error(message);
  }
}

const game = new Game();

// let animationFrameId = null;
// document.querySelector(".test-card").addEventListener("click", () => {});
