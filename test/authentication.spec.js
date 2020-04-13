const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('App.authentication.test', () => {
  it('passes authentication and returns json', () => {
    const bundle = {
      authData: {
        apiKey: 'secret'
      }
    };

    
  });
});
