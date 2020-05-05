const path = require('path');

const chainWebpack = config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)));
    
    config
        .plugin('html')
        .tap(args => {
            args[0].title = 'RPS';
            return args;
        });
};

const addStyleResource = rule => {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/styles/globals.scss'),
            ],
        });
};

module.exports = {
    chainWebpack
};
