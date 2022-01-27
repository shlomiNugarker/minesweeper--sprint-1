'use strict';


function buildBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
      board[i] = []
      for (var j = 0; j < size; j++) {
        var cell = {
            minesAroundCount: 0,
            isShown: false,
            isMine:  false,
            isMarked: false,
        }
        board[i][j] = cell;
      }
    }
    return board;
}

function renderBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {
      strHTML += '<tr>'
      for (var j = 0; j < mat[0].length; j++) {
        var item = CELL
        
        var className = `cell cell-${i}-${j}`;
        strHTML += `<td class="${className}" onclick="cellClicked(this , ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j})">${item}</td>`
      }
      strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    var elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML;
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function countNegsAround(mat, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
      if (i < 0 || i > mat.length - 1) continue
      for (var j = colIdx - 1; j <= colIdx + 1; j++) {
        if (j < 0 || j > mat[0].length - 1) continue
        if (i === rowIdx && j === colIdx) continue
        var currCell = mat[i][j]
        if (currCell.isMine) count++
      }
    }
    return count
}