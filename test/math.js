/* eslint-disable no-undef,no-unused-vars */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';

const should = chai.should();
chai.use(chaiHttp);

describe('Math', () => {
  /*
   * Test the /GET sum
   */
  describe('/GET sum', () => {
    it('it should GET the sum but the number value is invalid.', (done) => {
      chai
        .request(server)
        .get('/math/sum')
        .query({ number: 'a1s2' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          res.body.err.should.be.eq('El número indicado es inválido.');
          done();
        });
    });
    it('it should GET the sum a number passed by query params and result must be equals 11.', (done) => {
      chai
        .request(server)
        .get('/math/sum')
        .query({ number: 10 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('sum');
          res.body.data.sum.should.be.a('number');
          res.body.data.sum.should.be.eq(11);
          done();
        });
    });
  });

  describe('/GET MCM', () => {
    it('it should GET the MCM from a numbers array passed by query params, but, the list is empty.', (done) => {
      chai
        .request(server)
        .get('/math/mcm')
        .query({ numbers: [] })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          res.body.err.should.be.eq('Listado de números inválido.');
          done();
        });
    });
    it('it should GET the MCM from a numbers array passed by query params, but, the list values is not valid param.', (done) => {
      chai
        .request(server)
        .get('/math/mcm')
        .query({ numbers: '' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          res.body.err.should.be.eq('Listado de números inválido.');
          done();
        });
    });
    it('it should GET the MCM from a numbers array passed by query params, but, the list values length is less than (<) 2.', (done) => {
      chai
        .request(server)
        .get('/math/mcm')
        .query({ numbers: [1] })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          res.body.err.should.be.eq('La lista de números debe contener al menos 2 valores.');
          done();
        });
    });
    it('it should GET the MCM from a numbers array passed by query params, but, the list values length is less than (<) 2.', (done) => {
      chai
        .request(server)
        .get('/math/mcm')
        .query({ numbers: '1' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          res.body.err.should.be.eq('La lista de números debe contener al menos 2 valores.');
          done();
        });
    });
    it('it should GET the MCM from a numbers array passed by query params, but, some value of the list is not a number.', (done) => {
      chai
        .request(server)
        .get('/math/mcm')
        .query({ numbers: [1, 2, null, 4, 'a'] })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          res.body.err.should.be.eq('Uno de los números de la lista es incorrecto.');
          done();
        });
    });

    it('it should GET the MCM from a numbers string separated by comma passed by query params but, some value of the list is not a number.', (done) => {
      chai
        .request(server)
        .get('/math/mcm')
        .query({ numbers: '1,,3,null,hello' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('err');
          res.body.err.should.be.eq('Uno de los números de la lista es incorrecto.');
          done();
        });
    });
    it('it should GET the MCM from a numbers array passed by query params and the mcm result must be 60.', (done) => {
      chai
        .request(server)
        .get('/math/mcm')
        .query({ numbers: [1, 2, 3, 4, 5] })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('mcm');
          res.body.data.mcm.should.be.a('number');
          res.body.data.mcm.should.be.eq(60);
          done();
        });
    });
    it('it should GET the MCM from a numbers string separated by comma passed by query params and the mcm result must be 60.', (done) => {
      chai
        .request(server)
        .get('/math/mcm')
        .query({ numbers: '1,2,3,4,5' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('mcm');
          res.body.data.mcm.should.be.a('number');
          res.body.data.mcm.should.be.eq(60);
          done();
        });
    });
  });
});
