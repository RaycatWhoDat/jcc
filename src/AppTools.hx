package;

import haxe.macro.Expr;
import coconut.Ui.hxx;

#if macro
import sys.io.File;
#end

using haxe.macro.Tools;

class AppTools {
  public macro static function insertTemplate(templateName: String) {
    var template = "";
    
    try {
      template = File.getContent('./${templateName}.html');
    } catch (error: String) {
      trace("Error: " + error);
    }

    return macro hxx($v{template});
  }

  public macro static function insertStyles(templateName: String) {
    var template = File.getContent('./${templateName}.css');
    return macro $v{template};
  }
}