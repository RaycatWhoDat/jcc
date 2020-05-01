package ui;

import js.html.*;
import coconut.ui.*;

class Placeholder extends View {
  static var ROOT = cix.Style.rule(AppTools.insertStyles("Placeholder"));  

  function render() {
    return AppTools.insertTemplate("Placeholder");
  }
}

// (modify-syntax-entry ?\' "\"")