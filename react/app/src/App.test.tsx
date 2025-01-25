import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

function isSolvable(tiles: number[]): boolean {
  let inversions = 0;
  // Count inversions (ignoring 0)
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] > 0 && tiles[j] > 0 && tiles[i] > tiles[j]) {
        inversions++;
      }
    }
  }

  // For a 3×3 puzzle, solvability depends on inversions being even
  return inversions % 2 === 0;
}


describe('isSolvable function', () => {
  test('should return true for a solvable puzzle', () => {
    const tiles = [1, 8, 2, 0, 4, 3, 7, 6, 5]; // Solvable puzzle
    expect(isSolvable(tiles)).toBe(true);
  });

  test('should return false for an unsolvable puzzle', () => {
    const tiles = [8,1,5,2,0,3,4,7,6]; // Unsolvable puzzle
    expect(isSolvable(tiles)).toBe(false);
  });
  
  test('should return false for an unsolvable puzzle', () => {
    const tiles = [1, 2, 3, 4, 5, 6, 8, 7, 0]; // Unsolvable puzzle
    expect(isSolvable(tiles)).toBe(false);
  });

  test('should return true for a solved puzzle', () => {
    const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // Already solved
    expect(isSolvable(tiles)).toBe(true);
  });

  test('should return true for a shuffled solvable puzzle', () => {
    const tiles = [8, 1, 6, 7, 0, 5, 4, 2, 3]; // Solvable configuration
    expect(isSolvable(tiles)).toBe(true);
  });

  test('should return false for a shuffled unsolvable puzzle', () => {
    const tiles = [8, 1, 6, 7, 5, 0, 4, 3, 2]; // Unsolvable configuration
    expect(isSolvable(tiles)).toBe(false);
  });
});