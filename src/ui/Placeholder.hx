package ui;

import js.html.*;
import coconut.ui.*;

class Placeholder extends View {
  static var ROOT = cix.Style.rule('
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

                                   p { color: red; }
                                   ');  
  

  function render() '
      <div class=${ROOT}>
  <p>Ready!</p>
  </div>
  ';
}