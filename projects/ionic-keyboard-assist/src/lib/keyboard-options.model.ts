/**
 * Keyboard options class
 */
export class KeyboardOptions {

  scrollPadding: boolean;
  scrollAssist: boolean;

  constructor(options?: KeyboardOptionsModel) {
    this.scrollPadding = options && options.scrollPadding ? options.scrollPadding : true;
    this.scrollAssist = options && options.scrollAssist ? options.scrollAssist : true;
  }

}

/**
 * Keyboard options model
 */
export interface KeyboardOptionsModel {
  scrollPadding: boolean;
  scrollAssist: boolean;
}
