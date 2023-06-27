import Levels from '../../levels/levels';
import InputView from '../../utils/input-view';
import { levelsArray } from '../../utils/levelsArray';
import './input.css';
import { correctAnswerAnimation, wrongAnswerAnimation } from '../../utils/animationUtils';

export default class Input extends InputView {
  private levels: Levels;

  constructor(levels: Levels) {
    super(['input', 'blink']);
    this.setInputType('text');
    this.setPlaceholder('Type in css selector');
    this.levels = levels;
    this.element?.setAttribute('maxlength', '40');
    this.element?.addEventListener('keyup', (e) => this.handleKeyDown(e));
    this.element?.addEventListener('input', () => {
      this.element?.classList.remove('blink');
      if (!this.element?.value) {
        this.element?.classList.add('blink');
      }
    });
  }

  public clearInput(): void {
    if (this.element) {
      this.element.value = '';
      this.element.classList.add('blink');
    }
  }

  public handleInput(): void {
    const currentLevel = this.levels.getSelectedLevel();
    const currentLevelElement = this.levels.getSelectedLevelElement();
    const obj = levelsArray.find((item) => item.number === currentLevel);
    if (obj?.answers.some((item) => item === this.element?.value)) {
      correctAnswerAnimation();
      setTimeout(() => {
        this.levels.changeLevelStatus();
        this.levels.goToNextLevel();
        if (currentLevelElement) {
          const helpAttributeValue = currentLevelElement.getAttribute('data-help');
          if (helpAttributeValue === 'true') {
            currentLevelElement.classList.add('solved-with-help');
          }
        }
      }, 1000);
    } else {
      wrongAnswerAnimation();
      this.clearInput();
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleInput();
    }
  }
}
