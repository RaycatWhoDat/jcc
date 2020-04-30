package;

import js.Node;
import js.Node.process;
import js.npm.express.Application;
import js.npm.express.Express;
import js.npm.express.Request;
import js.npm.express.Response;
import js.npm.bodyparser.BodyParser;

import externs.Cors;

class DevServer {
  public static function main() {
    var expressApp = new Application();
        
    var port = process.env.get("PORT") != null
               ? process.env.get("PORT")
               : "8080";

    expressApp.set("port", port);

    expressApp.use(new Cors());
    expressApp.use(BodyParser.json());
    expressApp.use(BodyParser.urlencoded({ extended: true }));

    expressApp.use("/", Express.Static(Node.__dirname));
        
    expressApp.listen(Std.parseInt(expressApp.get("port")), () -> {
        trace("Server ready.");
        trace("Now listening on port " + expressApp.get("port") + ".");
      });
  }
}