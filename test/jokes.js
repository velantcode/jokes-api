/* eslint-disable no-undef,no-unused-vars */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
import GeneralJokes from '../src/Models/GeneralJokes';

const should = chai.should();
chai.use(chaiHttp);

const JOKE_OBJ = { id: 1, joke: '¿Qué le dice un jardinero a otro? Nos vemos cuando podamos.' };

describe('Jokes', () => {
  beforeEach((done) => {
    GeneralJokes.deleteMany({})
      .exec()
      .then(() => {
        done();
      });
  });

  /*
   * Test the /GET route
   */
  describe('/GET jokes', () => {
    it('it should GET all the jokes, but return an empty list.', (done) => {
      chai
        .request(server)
        .get('/jokes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
    it('it should GET all the jokes', (done) => {
      GeneralJokes.insertMany([JOKE_OBJ]).then(() => {
        chai
          .request(server)
          .get('/jokes')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.gt(0);
            res.body.data[0].should.a('object');
            res.body.data[0].should.have.property('id');
            res.body.data[0].should.have.property('joke');
            res.body.data[0].id.should.a('number');
            res.body.data[0].id.should.be.eq(1);
            res.body.data[0].joke.should.a('string');
            res.body.data[0].joke.should.be.eq(JOKE_OBJ.joke);
            done();
          });
      });
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST jokes', () => {
    it('it should not POST a joke if the value is less than 3 characters', (done) => {
      const body = { joke: 'ab' };
      chai
        .request(server)
        .post('/jokes')
        .send(body)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          res.body.err.should.be.eq('El texto del chiste es incorrecto.');
          done();
        });
    });
    it('it should POST a Joke', (done) => {
      const body = { joke: '¿Qué le dice un jardinero a otro? Nos vemos cuando podamos.' };
      chai
        .request(server)
        .post('/jokes')
        .send(body)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('msg').eql('¡Chiste guardado!');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('joke');
          res.body.data.joke.should.be.eq(body.joke);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id Joke', () => {
    it('it should not GET a joke given the id if the ID is invalid', (done) => {
      chai
        .request(server)
        .get('/jokes/1bd')
        .end((err2, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('err').eql('El chiste seleccionado es inválido.');
          done();
        });
    });
    it('it should not GET a joke given the ID not found!', (done) => {
      chai
        .request(server)
        .get('/jokes/1')
        .end((err2, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('err').eql('¡Chiste no encontrado!');
          done();
        });
    });
    it('it should GET a joke by the given ID', (done) => {
      GeneralJokes.insertMany([JOKE_OBJ]).then(() => {
        chai
          .request(server)
          .get(`/jokes/${JOKE_OBJ.id}`)
          .end((err2, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('joke').eq(JOKE_OBJ.joke);
            res.body.data.should.have.property('id').eql(JOKE_OBJ.id);
            done();
          });
      });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id Joke', () => {
    it('it should not UPDATE a joke given the ID if the id is invalid', (done) => {
      chai
        .request(server)
        .put('/jokes/1bd')
        .end((err2, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('err').eql('El chiste seleccionado es inválido.');
          done();
        });
    });
    it('it should not UPDATE a joke if the value is less than 3 characters', (done) => {
      const body = { joke: 'ab' };
      chai
        .request(server)
        .put('/jokes/10')
        .send(body)
        .end((err2, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          res.body.err.should.be.eq('El texto del chiste es incorrecto.');
          done();
        });
    });
    it('it should not UPDATE a joke given the ID not found!', (done) => {
      const body = { joke: 'abcdef' };
      chai
        .request(server)
        .put('/jokes/1')
        .send(body)
        .end((err2, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('err').eql('¡Chiste no encontrado!');
          done();
        });
    });
    it('it should UPDATE a joke given the ID', (done) => {
      GeneralJokes.insertMany([JOKE_OBJ]).then(() => {
        chai
          .request(server)
          .put(`/jokes/${JOKE_OBJ.id}`)
          .send({ joke: '¿Qué le dice un jardinero a otro? Nos vemos cuando podamos.' })
          .end((err2, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('msg').eq('¡Chiste actualizado!');
            res.body.data.should.have.property('joke').eq(JOKE_OBJ.joke);
            done();
          });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id Joke', () => {
    it('it should not DELETE a joke given the ID if the id is invalid', (done) => {
      chai
        .request(server)
        .delete('/jokes/1bd')
        .end((err2, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('err').eql('El chiste seleccionado es inválido.');
          done();
        });
    });
    it('it should DELETE a joke given the ID', (done) => {
      GeneralJokes.insertMany([JOKE_OBJ]).then(() => {
        chai
          .request(server)
          .delete(`/jokes/${JOKE_OBJ.id}`)
          .end((err2, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('msg').eql('Chiste eliminado exitosamente.');
            done();
          });
      });
    });
  });
});
