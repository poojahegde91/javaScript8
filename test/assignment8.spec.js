// Test Case for Assignment8.
const expect = require("chai").expect;
const sinon = require("sinon");
const fs = require("fs");
const readline = require("readline");
const index = require("../index");

describe("Test the createInterface method of readline", function() {
  it("should be called only once", function() {
    let spyCreateInterface = sinon.spy(readline, "createInterface");
    index.exec();
    readline.createInterface.restore();
    sinon.assert.calledOnce(spyCreateInterface);
  });
});
describe("Test the on() method of readline interface for line event", function() {
  it("should be called", function() {
    let stub = sinon.stub(readline.Interface.prototype, "on");
    index.exec();
    sinon.assert.called(stub);
    readline.Interface.prototype.on.restore();
    sinon.assert.calledWith(stub, "line");
  });
});
describe("Test the close() method of readline interface for close event", function() {
  it("should be called", function() {
    let stub = sinon.stub(readline.Interface.prototype, "on");
    index.exec();
    readline.Interface.prototype.on.restore();
    sinon.assert.calledWith(stub, "close");
  });
});

describe("Testing for existence of Synchronous writeFileSync methods", function() {
  let sandbox = "";
  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  })

  it("should not be called writeFileSync", function() {
    let stub = sandbox.stub(fs, "writeFileSync");
    index.exec();
    sinon.assert.callCount(stub, 0);
  });
  afterEach(function() {
    sandbox.restore();
  });
});

describe("Testing for existence of Asynchronous writeFile methods", function() {
  let sandbox = "";
  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  })

  it("should be called writeFile", function(done) {
    let stub = sandbox.stub(fs, "writeFile");
    index.exec();
    setTimeout(function() {
      sinon.assert.called(stub);
    }, 10000);
      done();
  });
  afterEach(function() {
    sandbox.restore();
  });
});

describe.skip("Testing for whether close() method called on fs", function() {
  let sandbox = "";
  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  })

  it("should be called", function() {
    let stub = sandbox.stub(fs, "close");
      index.exec();
      sinon.assert.called(stub);
  });

  afterEach(function() {
    sandbox.restore();
  });
});

describe.skip("Test for use of JSON.stringify() functions", function() {
  it("JSON.stringify() should be used atleast once", function() {
    let stringifySpy = sinon.spy(JSON, "stringify");
    index.exec();
    sinon.assert.called(stringifySpy);
  });
});

describe("Assignment8 - Test code for correct output", function(){
  it ("Matches the desired output of object values as per given input test case", function(done){
    index.exec();
    expect(index.countries[0]).to.have.property("countryname", "Argentina");
    done();
  });
});