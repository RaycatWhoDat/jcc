package;

import js.Browser.*;
import coconut.Ui.hxx;

class JCC {
  static function main() {
    trace("Ready!");
    coconut.ui.Renderer.mount(
        cast document.body.appendChild(document.createDivElement()),
        hxx('<ui.Placeholder />'));
  }
}