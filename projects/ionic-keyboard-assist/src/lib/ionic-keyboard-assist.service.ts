import { Injectable, OnDestroy } from '@angular/core';
import { KeyboardOptions, KeyboardOptionsModel } from './keyboard-options.model';

@Injectable({
  providedIn: 'root'
})
export class IonicKeyboardAssist implements OnDestroy {

  /**
   * Stores modified pages element
   */
  private pages = [];

  /**
   * Keyboard options
   */
  private options: KeyboardOptions;

  constructor() {
    this.setOptions();
  }

  /**
   * Start the keyboard wizard
   * @param options: KeyboardOptionsModel
   */
  init(options?: KeyboardOptionsModel) {
    if (options) {
      this.setOptions(options);
    }
    this.addEventListeners();
  }

  /**
   * Set keyboard options
   * @param options: KeyboardOptionsModel
   */
  setOptions(options?: KeyboardOptionsModel) {
    this.options = new KeyboardOptions(options);
  }

  /**
   * Add Event Listeners
   */
  private addEventListeners() {
    window.addEventListener('keyboardDidShow', this.onKeyboardDidShow);
    window.addEventListener('keyboardWillHide', this.onKeyboardWillHide);
  }

  /**
   * Remove Event Listeners
   */
  private removeEventListeners() {
    window.removeEventListener('keyboardDidShow', this.onKeyboardDidShow);
    window.removeEventListener('keyboardWillHide', this.onKeyboardWillHide);
  }

  /**
   * On keyboard did show actions
   * @param event: keyboard event
   */
  private onKeyboardDidShow = (event) => {
    const modal = this.getActiveModalElement();
    let activeElement;

    if (modal) {
      activeElement = modal;
    } else {
      activeElement = this.getActivePageElement();
    }

    this.pages.push(activeElement);

    if (this.options.scrollPadding) {
      this.setPadding(activeElement, event.keyboardHeight);
    }

    if (this.options.scrollAssist) {
      this.scrollAssist();
    }
  };

  /**
   * On keyboard will hide actions
   */
  private onKeyboardWillHide = () => {
    this.pages.forEach(elem => {
      this.setPadding(elem);
    });
    setTimeout(() => this.pages = [], 50);
  };

  /**
   * Get current page element
   */
  private getActivePageElement() {
    const elem = document.getElementsByTagName('ion-router-outlet');
    if (elem && elem.length > 0) {
      const page = elem[elem.length - 1];
      return page && page.lastElementChild ? page.lastElementChild : null;
    }
    return null;
  }

  /**
   * Get current modal element
   */
  private getActiveModalElement() {
    const elem = document.getElementsByTagName('ion-app');
    if (elem && elem.length > 0) {
      const page = elem[elem.length - 1];
      return page && page.lastElementChild && page.lastElementChild.tagName === 'ION-MODAL' ? page.lastElementChild : null;
    }
    return null;
  }

  /**
   * Add padding on the element
   */
  private setPadding(elem, value = 0) {
    if (elem) {
      elem.setAttribute('style', `padding-bottom: ${value}px !important`);
    }
  }

  /**
   * Scroll view to active element
   */
  private scrollAssist() {
    if (document.activeElement && document.activeElement.tagName === 'INPUT') {
      setTimeout(() => document.activeElement.scrollIntoView({block: 'center', behavior: 'smooth'}), 100);
    }
  }

  /**
   * Remove listeners on destroy
   */
  ngOnDestroy(): void {
    this.removeEventListeners();
  }

}
