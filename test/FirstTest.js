var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('First test',function(){
    var location1;
    var location2;
    var location3;
    var locations = [location1, location2,location3];

    before(function(done){
        api.post('/locations')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            addressStreet: '111 Main St',
            addressCity: 'Portland',
            addressState: 'OR',
            addressZip: '97209',
            userId: 1
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
            // console.log('Response: ', res);
            location1 = res.body;    
        })

        api.post('/locations')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            addressStreet: '222 Main St',
            addressCity: 'Portland',
            addressState: 'OR',
            addressZip: '97209',
            userId: 2
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
            location2 = res.body;    
        })

        api.post('/locations')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            addressStreet: '333 Main St',
            addressCity: 'Portland',
            addressState: 'OR',
            addressZip: '97209',
            userId: 3
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
            location3 = res.body;    
            done();
        })
    })

    it('User 1 should return 200 response', function(done){
        api.get('/users/1')
            .set('Accept', 'application/json')
            .expect(200, done);
    })

    it('User 2 should return 200 response', function(done){
        api.get('/users/2')
            .set('Accept', 'application/json')
            .expect(200, done);
    })

    it('test addressStreet',function(done){
        api.get('/users/2/location')
            .set('Accept','application/json')
            .expect(200)
            .end(function(err,res){
                console.log(res.body);
                expect(res.body.addressStreet).to.equal('222 Main St');
                done();
            })

    })
})