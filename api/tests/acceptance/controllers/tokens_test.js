const server = require('../../../server');
const User = require('../../../app/models/data/user');

describe('API | Challenges', function () {

  before(function (done) {
    knex.migrate.latest().then(() => {
      knex.seed.run().then(() => {
        done();
      });
    });
  });

  after(function (done) {
    server.stop(done);
  });

  describe('POST /api/tokens/user_token', function () {


    const options = { 
      method: 'POST', 
      url: '/api/tokens/user_token',
      payload: {
        auth: {
          firstName:      'Anae', 
          lastName:       'DaSilva', 
          email:          'anae.dasilva@caramail.com', 
          password:       'my_password',
          passwordConfirm:'my_password',
          hasAcceptedCGU:  true,
        }
      }
    };

    it("should return 201 HTTP status code, an application/json format, a jwt token in response", function (done) {
      server.injectThen(options).then((response) => {
        expect(response.statusCode).to.equal(201);
        const contentType = response.headers['content-type'];
        expect(contentType).to.contain('application/json');
        const token = JSON.parse(response.payload).jwt;
        // Regexp for JSON Web Token. See https://github.com/auth0/node-jsonwebtoken/issues/162
        expect(token).to.match(/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/);
        done();
      });
    });

    it("should persist an bcrypt-encrypted password", function (done) {
        new User({ email: 'anae.dasilva@caramail.com' })
        .fetch()
        .then(function (model) {
          //ok, the right user
          expect(model.get('email')).to.equal('anae.dasilva@caramail.com');
          // now check the password was salted.
          // XXX : no way to strictly check it, 
          //but let's consider that the password saved is not the one of the user.
          expect(model.get('password')).not.to.equal('my_password');
          //... and that the saved stuff is long enough
          expect(model.get('password')).to.have.length.above(40);

          done();
        });
    });




  });

});
