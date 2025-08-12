document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('solitaire-root');
  let game = null;

  function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  function newDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const colors = { '♠': 'black', '♣': 'black', '♥': 'red', '♦': 'red' };
    const ranks = [
      { name: 'A', value: 1 }, { name: '2', value: 2 }, { name: '3', value: 3 }, { name: '4', value: 4 },
      { name: '5', value: 5 }, { name: '6', value: 6 }, { name: '7', value: 7 }, { name: '8', value: 8 },
      { name: '9', value: 9 }, { name: '10', value: 10 }, { name: 'J', value: 11 }, { name: 'Q', value: 12 }, { name: 'K', value: 13 }
    ];
    let deck = [];
    for (let s of suits) {
      for (let r of ranks) {
        deck.push({
          suit: s,
          color: colors[s],
          rank: r.name,
          value: r.value,
          faceUp: false,
          id: `${r.name}${s}`
        });
      }
    }
    return shuffle(deck);
  }

  function initialState() {
    const deck = newDeck();
    const tableau = Array.from({ length: 7 }, () => []);
    const foundation = [[], [], [], []];
    const waste = [];
    let stock = [];
    let idx = 0;
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row <= col; row++) {
        const card = deck[idx++];
        card.faceUp = row === col;
        tableau[col].push(card);
      }
    }
    stock = deck.slice(idx);
    return {
      tableau,
      foundation,
      stock,
      waste,
      moves: [],
      redo: [],
      startTime: Date.now(),
      elapsed: 0
    };
  }

  function render() {
    root.innerHTML = '';
    const statsBar = document.createElement('div');
    statsBar.className = 'sol-btn-bar';
    const newBtn = document.createElement('button');
    newBtn.className = 'btn btn-primary btn-sm';
    newBtn.textContent = 'New Game';
    newBtn.onclick = () => { game = initialState(); render(); };
    const undoBtn = document.createElement('button');
    undoBtn.className = 'btn btn-outline-secondary btn-sm';
    undoBtn.textContent = 'Undo';
    undoBtn.onclick = () => { undo(); };
    const redoBtn = document.createElement('button');
    redoBtn.className = 'btn btn-outline-secondary btn-sm';
    redoBtn.textContent = 'Redo';
    redoBtn.onclick = () => { redo(); };
    const stats = document.createElement('div');
    stats.className = 'sol-stats';
    stats.innerHTML = `<span id="move-count">${game.moves.length}</span> moves &middot; <span id="timer">0:00</span>`;
    statsBar.appendChild(newBtn);
    statsBar.appendChild(undoBtn);
    statsBar.appendChild(redoBtn);
    statsBar.appendChild(stats);
    root.appendChild(statsBar);

    // Top row: Stock, Waste, Foundations
    const topRow = document.createElement('div');
    topRow.className = 'sol-row';
    // Stock
    const stockPile = createPile('stock', [game.stock.length ? game.stock[game.stock.length - 1] : null], false, () => {
      if (game.stock.length === 0) {
        game.stock = game.waste.reverse();
        game.waste = [];
        for (let c of game.stock) c.faceUp = false;
      } else {
        const card = game.stock.pop();
        card.faceUp = true;
        game.waste.push(card);
      }
      game.moves.push({ type: 'draw' });
      game.redo = [];
      render();
    });
    topRow.appendChild(stockPile);

    // Waste
    const wastePile = createPile('waste', game.waste.length ? [game.waste[game.waste.length - 1]] : [], true, null);
    topRow.appendChild(wastePile);

    // Foundations
    for (let i = 0; i < 4; i++) {
      const pile = createPile('foundation', game.foundation[i], true, null, i);
      topRow.appendChild(pile);
    }
    root.appendChild(topRow);

    // Tableau
    const tableauRow = document.createElement('div');
    tableauRow.className = 'sol-row';
    for (let i = 0; i < 7; i++) {
      const pile = createPile('tableau', game.tableau[i], true, null, i);
      tableauRow.appendChild(pile);
    }
    root.appendChild(tableauRow);

    updateTimer();
  }

  function createPile(type, cards, showAll, onClick, pileIndex) {
    const pile = document.createElement('div');
    pile.className = 'sol-pile ' + type;
    if (type === 'foundation' && cards.length && cards[cards.length - 1].value === 13) {
      pile.classList.add('highlight');
    }
    pile.onclick = onClick || null;
    if (type === 'stock' && (!cards[0] || !game.stock.length)) {
      pile.appendChild(createEmptyCard());
      return pile;
    }
    if (type === 'foundation' && !cards.length) {
      pile.appendChild(createEmptyCard('A'));
      return pile;
    }
    if (type === 'tableau' && !cards.length) {
      pile.appendChild(createEmptyCard());
      return pile;
    }
    let yOffset = 0;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardEl = createCard(card, type, pileIndex, i);
      cardEl.style.top = type === 'tableau' ? `${i * 28}px` : '0';
      cardEl.style.zIndex = i + 1;
      pile.appendChild(cardEl);
      yOffset += 28;
    }
    return pile;
  }

  function createEmptyCard(label) {
    const card = document.createElement('div');
    card.className = 'sol-card empty';
    card.style.position = 'relative';
    card.style.top = '0';
    card.style.left = '0';
    card.style.width = '100%';
    card.style.height = '100%';
    card.innerHTML = label ? `<span class="corner">${label}</span>` : '';
    return card;
  }

  function createCard(card, pileType, pileIndex, cardIndex) {
    const el = document.createElement('div');
    el.className = `sol-card${card.faceUp ? '' : ' face-down'} ${card.color}`;
    el.setAttribute('draggable', card.faceUp ? 'true' : 'false');
    el.tabIndex = card.faceUp ? 0 : -1;
    el.innerHTML = card.faceUp
      ? `<span class="corner">${card.rank}${card.suit}</span>
         <span class="suit">${card.suit}</span>
         <span class="corner" style="text-align:right">${card.rank}${card.suit}</span>`
      : '';
    el.addEventListener('click', function (e) {
      if (!card.faceUp && pileType === 'tableau' && cardIndex === game.tableau[pileIndex].length - 1) {
        card.faceUp = true;
        game.moves.push({ type: 'flip', pile: pileIndex, index: cardIndex });
        game.redo = [];
        render();
        return;
      }
      if (card.faceUp) {
        handleCardClick(card, pileType, pileIndex, cardIndex);
      }
    });
    el.addEventListener('dblclick', function (e) {
      if (card.faceUp) {
        autoMoveToFoundation(card, pileType, pileIndex, cardIndex);
      }
    });
    el.addEventListener('dragstart', function (e) {
      if (!card.faceUp) return;
      e.dataTransfer.setData('text/plain', JSON.stringify({ pileType, pileIndex, cardIndex }));
      setTimeout(() => el.classList.add('dragging'), 0);
    });
    el.addEventListener('dragend', function (e) {
      el.classList.remove('dragging');
    });
    el.addEventListener('touchstart', function (e) {
      el.classList.add('selected');
    });
    el.addEventListener('touchend', function (e) {
      el.classList.remove('selected');
    });
    el.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    el.addEventListener('drop', function (e) {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      handleDrop(data, pileType, pileIndex, cardIndex);
    });
    return el;
  }

  function handleCardClick(card, pileType, pileIndex, cardIndex) {
    if (pileType === 'waste') {
      tryMoveCard('waste', null, cardIndex, 'tableau', pileIndex);
      tryMoveCard('waste', null, cardIndex, 'foundation', pileIndex);
    } else if (pileType === 'tableau') {
      tryMoveCard('tableau', pileIndex, cardIndex, 'foundation', null);
      for (let i = 0; i < 7; i++) {
        if (i !== pileIndex) tryMoveCard('tableau', pileIndex, cardIndex, 'tableau', i);
      }
    }
  }

  function autoMoveToFoundation(card, pileType, pileIndex, cardIndex) {
    if (!card.faceUp) return;
    for (let i = 0; i < 4; i++) {
      if (canMoveToFoundation(card, i)) {
        moveCard(pileType, pileIndex, cardIndex, 'foundation', i);
        render();
        return;
      }
    }
  }

  function canMoveToFoundation(card, foundationIndex) {
    const pile = game.foundation[foundationIndex];
    if (!pile.length) return card.value === 1;
    const top = pile[pile.length - 1];
    return top.suit === card.suit && card.value === top.value + 1;
  }

  function tryMoveCard(fromType, fromIndex, fromCardIndex, toType, toIndex) {
    let card;
    if (fromType === 'waste') {
      card = game.waste[game.waste.length - 1];
    } else if (fromType === 'tableau') {
      card = game.tableau[fromIndex][fromCardIndex];
    }
    if (!card) return false;
    if (toType === 'foundation') {
      for (let i = 0; i < 4; i++) {
        if (canMoveToFoundation(card, i)) {
          moveCard(fromType, fromIndex, fromCardIndex, 'foundation', i);
          render();
          return true;
        }
      }
    } else if (toType === 'tableau') {
      if (canMoveToTableau(card, toIndex)) {
        moveCard(fromType, fromIndex, fromCardIndex, 'tableau', toIndex);
        render();
        return true;
      }
    }
    return false;
  }

  function canMoveToTableau(card, tableauIndex) {
    const pile = game.tableau[tableauIndex];
    if (!pile.length) return card.value === 13;
    const top = pile[pile.length - 1];
    return top.faceUp && card.color !== top.color && card.value === top.value - 1;
  }

  function moveCard(fromType, fromIndex, fromCardIndex, toType, toIndex) {
    let movingCards = [];
    if (fromType === 'waste') {
      movingCards = [game.waste.pop()];
    } else if (fromType === 'tableau') {
      movingCards = game.tableau[fromIndex].splice(fromCardIndex);
    }
    if (toType === 'foundation') {
      game.foundation[toIndex].push(...movingCards);
    } else if (toType === 'tableau') {
      game.tableau[toIndex].push(...movingCards);
    }
    game.moves.push({ type: 'move', fromType, fromIndex, fromCardIndex, toType, toIndex, count: movingCards.length });
    game.redo = [];
  }

  function handleDrop(data, toType, toIndex, toCardIndex) {
    if (data.pileType === 'tableau') {
      const card = game.tableau[data.pileIndex][data.cardIndex];
      if (toType === 'tableau' && canMoveToTableau(card, toIndex)) {
        moveCard('tableau', data.pileIndex, data.cardIndex, 'tableau', toIndex);
        render();
      } else if (toType === 'foundation') {
        for (let i = 0; i < 4; i++) {
          if (canMoveToFoundation(card, i)) {
            moveCard('tableau', data.pileIndex, data.cardIndex, 'foundation', i);
            render();
            break;
          }
        }
      }
    } else if (data.pileType === 'waste') {
      const card = game.waste[game.waste.length - 1];
      if (toType === 'tableau' && canMoveToTableau(card, toIndex)) {
        moveCard('waste', null, null, 'tableau', toIndex);
        render();
      } else if (toType === 'foundation') {
        for (let i = 0; i < 4; i++) {
          if (canMoveToFoundation(card, i)) {
            moveCard('waste', null, null, 'foundation', i);
            render();
            break;
          }
        }
      }
    }
  }

  function undo() {
    if (!game.moves.length) return;
    const move = game.moves.pop();
    if (move.type === 'draw') {
      if (game.waste.length) {
        const card = game.waste.pop();
        card.faceUp = false;
        game.stock.push(card);
      } else {
        game.stock = game.stock.reverse();
        for (let c of game.stock) c.faceUp = false;
        game.waste = [];
      }
    } else if (move.type === 'flip') {
      game.tableau[move.pile][move.index].faceUp = false;
    } else if (move.type === 'move') {
      let moved;
      if (move.toType === 'foundation') {
        moved = game.foundation[move.toIndex].splice(-move.count);
      } else if (move.toType === 'tableau') {
        moved = game.tableau[move.toIndex].splice(-move.count);
      }
      if (move.fromType === 'waste') {
        game.waste.push(...moved);
      } else if (move.fromType === 'tableau') {
        game.tableau[move.fromIndex].push(...moved);
      }
    }
    game.redo.push(move);
    render();
  }

  function redo() {
    if (!game.redo.length) return;
    const move = game.redo.pop();
    if (move.type === 'draw') {
      if (game.stock.length) {
        const card = game.stock.pop();
        card.faceUp = true;
        game.waste.push(card);
      } else {
        game.stock = game.waste.reverse();
        game.waste = [];
        for (let c of game.stock) c.faceUp = false;
      }
    } else if (move.type === 'flip') {
      game.tableau[move.pile][move.index].faceUp = true;
    } else if (move.type === 'move') {
      let moved;
      if (move.fromType === 'waste') {
        moved = game.waste.splice(-move.count);
      } else if (move.fromType === 'tableau') {
        moved = game.tableau[move.fromIndex].splice(-move.count);
      }
      if (move.toType === 'foundation') {
        game.foundation[move.toIndex].push(...moved);
      } else if (move.toType === 'tableau') {
        game.tableau[move.toIndex].push(...moved);
      }
    }
    game.moves.push(move);
    render();
  }

  function updateTimer() {
    const timerEl = document.getElementById('timer');
    if (!timerEl) return;
    const elapsed = Math.floor((Date.now() - game.startTime) / 1000);
    const min = Math.floor(elapsed / 60);
    const sec = elapsed % 60;
    timerEl.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
    requestAnimationFrame(updateTimer);
  }

  game = initialState();
  render();
});
