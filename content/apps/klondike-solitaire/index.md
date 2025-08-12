---
layout: "app"
title: "Klondike Solitaire"
date: 2025-08-08
draft: false
tags: ["Game", "Solitaire", "Card Game", "Klondike"]
description: "Play a beautiful, responsive game of Klondike Solitaire in your browser."
---
<main class="min-vh-100 d-flex align-items-center justify-content-center position-relative">
  <button type="button" class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow"
    data-bs-toggle="modal" data-bs-target="#helpModal" style="z-index:10;width:2.5rem;height:2.5rem;">
    <i class="fas fa-question fa-lg text-primary"></i>
  </button>
  <div class="solitaire-wrap w-100 h-100 d-flex align-items-center justify-content-center">
    <div id="solitaire-root" class="solitaire-root"></div>
  </div>
</main>
<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="helpModalLabel">Klondike Solitaire Help</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h6>Overview</h6>
        <p>
          Klondike Solitaire is the classic single-player card game you know and love. The goal is to move all cards to the four foundation piles, sorted by suit and in ascending order from Ace to King. This web app provides a beautiful, responsive, and touch-friendly version of Klondike Solitaire that works on any device.
        </p>
        <h6>How to Play</h6>
        <ul>
          <li>The game uses a standard 52-card deck. Cards are dealt into seven tableau columns, with only the top card in each column face up.</li>
          <li>Move cards between tableau columns by building down in alternating colors (red on black, black on red).</li>
          <li>Only Kings (or sequences starting with a King) can be moved to empty tableau columns.</li>
          <li>Move cards to the foundation piles (top right) in ascending order and matching suit, starting with the Ace.</li>
          <li>Click the stock pile (top left) to draw cards. You can cycle through the stock as many times as you like.</li>
          <li>Double-click or tap a card to auto-move it to a foundation if possible.</li>
        </ul>
        <h6>Controls</h6>
        <ul>
          <li>Drag and drop cards with your mouse or finger.</li>
          <li>Click/tap cards to select and move.</li>
          <li>Use the "New Game" button to start a fresh game at any time.</li>
        </ul>
        <h6>Features</h6>
        <ul>
          <li>Beautiful, responsive card graphics and animations</li>
          <li>Undo/redo moves</li>
          <li>Auto-move to foundations</li>
          <li>Tracks moves and time</li>
          <li>Works on desktop, tablet, and mobile</li>
        </ul>
        <h6>Tips</h6>
        <ul>
          <li>Try to uncover face-down cards in the tableau as soon as possible.</li>
          <li>Move cards to the foundation when it doesn't block other moves.</li>
          <li>Use undo if you make a mistake or want to try a different strategy.</li>
        </ul>
        <h6>About</h6>
        <p>
          This game is built with HTML5, CSS3, Bootstrap 5, and JavaScript. All gameplay is local and private. Enjoy!
        </p>
      </div>
    </div>
  </div>
</div>
