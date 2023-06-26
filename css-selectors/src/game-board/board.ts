import './board.css';
import { Level } from '../utils/types';
import View from '../utils/view';

export default class BoardView extends View {
  constructor() {
    super('section', ['game-board']);
  }

  public updateContent(level: number, levelsArr: Level[]):void {
    this.removeContent();
    const chosenLevel = levelsArr.find((item) => item.number === level);
    const el = document.createElement('p');
    if (chosenLevel) {
      el.textContent = chosenLevel.task;
    }
    this.element?.append(el);
  }
}
