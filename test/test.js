/**
 * Created by vijay.budhram on 7/9/14.
 */
(function () {
    "use strict";

    // Set the endpoint of the LRS you are testing.
    // Currently, these tests do not support LRS authentication.
    var LRS_ENDPOINT = 'http://testclient.elmnts-test.com/lrs';

    var request = require('request');
    var should = require('should');
    var q = require('q');
    var statementNoActor = require('../test/data/statement_no_actor.json');
    var statementNoVerb = require('../test/data/statement_no_verb.json');
    var statementNoObject = require('../test/data/statement_no_object.json');
    var statementNoId = require('../test/data/statement_no_id.json');
    var statmentEmptyActor = require('../test/data/statement_empty_actor.json');
    var statmentEmptyVerb = require('../test/data/statement_empty_verb.json');
    var statmentEmptyObject = require('../test/data/statement_empty_object.json');

    // Generates an RFC4122 compliant uuid
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    function generateUUID() {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return uuid;
    };

    // Helper function to clone object
    function clone(item) {
        return JSON.parse(JSON.stringify(item));
    }

    describe('Statement Requirements', function () {
        it('A Statement uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "actor" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "verb" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "object" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "result" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "context" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "timestamp" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "stored" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "authority" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "version" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "attachment" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement contains an "actor" property (Multiplicity, 4.1.b)', function (done) {
            var data = clone(statementNoActor);
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.be.equal(400);
                done();
            });
        });

        it('A Statement contains a "verb" property (Multiplicity, 4.1.b)', function (done) {
            var data = clone(statementNoVerb);
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.be.equal(400);
                done();
            });
        });

        it('A Statement contains an "object" property (Multiplicity, 4.1.b)', function (done) {
            var data = clone(statementNoObject);
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.be.equal(400);
                done();
            });
        });

        it('An "id" property is a String (Type, 4.1.1.description.a)', function (done) {
            var data = clone(statementNoId);

            // Generate random number from 1-10000 as id
            data[0].id = Math.floor((Math.random() * 10000) + 1);
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.be.equal(400);
                done();
            });
        });

        it('An "id" property is a UUID following RFC 4122(Syntax, RFC 4122 )', function (done) {
            var data = clone(statementNoId);

            data[0].id = generateUUID();
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.be.equal(200);
                (err === null).should.be.true;
                done();
            });
        });

        it('An "actor" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "objectType" property is a String (Type, 4.1.2.1.table1.row1.a)', function (done) {
            var data = clone(statementNoId);

            data[0].actor.objectType = 123;
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.be.equal(400);
                done();
            });
        });

        it('An "actor" propertys "objectType" property is either "Agent" or "Group" (Vocabulary, 4.1.2.1.table1.row1.b, 4.1.2.1.table1.row1.b)', function (done) {
            var data = clone(statementNoId);

            data[0].actor.objectType = 'FooBar';
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Agent is defined by "objectType" of an "actor" or "object" with value "Agent" (4.1.2.1.table1.row1)', function (done) {
            var data = clone(statementNoId);

            data[0].actor.objectType = 'Agent';
            data[0].object.objectType = 'Agent';
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Agent uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "name" property is a String (Type, 4.1.2.1.table1.row2.a)', function (done) {
            var data = clone(statementNoId);

            data[0].actor.objectType = 'Agent';
            data[0].actor.name = 123;

            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            // Test non string
            request(options, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "actor" property with "objectType" as "Agent" uses one of the following properties: "mbox", "mbox_sha1sum", "open_id", "account" (Multiplicity, 4.1.2.1.a)', function (done) {
            var testData = [
                'mbox', 'mailto:xapi@adlnet.gov',
                'mbox_sha1sum', '1234231412342312342423',
                'open_id', 'adsf',
                'account', '1231234'
            ];

            var dataMbox = clone(statmentEmptyActor);
            dataMbox[0].actor.objectType = 'Agent';
            dataMbox[0].actor['mbox'] = 'mailto:xapi@adlnet.gov';
            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: dataMbox
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });

            // TODO Test other object types.
        });

        it('An Agent uses the "mbox" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent does not use the "mbox" property if "mbox_sha1sum", "open_id", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            var data = clone(statmentEmptyActor);
            data[0].actor.objectType = 'Agent';
            data[0].actor['mbox'] = 'mailto:xapi@adlnet.gov';
            data[0].actor['mbox_sha1sum'] = '1234231412342312342423';
            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });

            // TODO: Test other types
        });

        it('An Agent uses the "mbox_sha1sum" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent does not use the "mbox_sha1sum" property if "mbox", "open_id", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            var data = clone(statmentEmptyActor);
            data[0].actor.objectType = 'Agent';
            data[0].actor['mbox_sha1sum'] = '1234231412342312342423';
            data[0].actor['open_id'] = 'adsf';
            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });

            // TODO: Test other types
        });

        it('An Agent uses the "open_id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent does not use the "open_id" property if "mbox", "mbox_sha1sum", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            var data = clone(statmentEmptyActor);
            data[0].actor.objectType = 'Agent';
            data[0].actor['mbox'] = 'mailto:xapi@adlnet.gov';
            data[0].actor['open_id'] = 'adsf';
            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });

            // TODO: Test other types
        });

        it('An Agent uses the "account" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent does not use the "account" property if "mbox", "mbox_sha1sum", or "open_id" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            var data = clone(statmentEmptyActor);
            data[0].actor.objectType = 'Agent';
            data[0].actor.account = {
                "homePage": "http://cloud.scorm.com/",
                "name": "anonymous"
            };
            data[0].actor['mbox'] = 'mailto:xapi@adlnet.gov';
            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });

            // TODO: Test other types
        });

        it('A Group is defined by "objectType" of an "actor" or "object" with value "Group" (4.1.2.2.table1.row2)', function (done) {
            var data = clone(statmentEmptyActor);
            data[0].actor.objectType = 'Group';
            data[0].actor.account = {
                "homePage": "http://cloud.scorm.com/",
                "name": "group"
            };
            data[0].actor['mbox'] = 'mailto:xapi@adlnet.gov';
            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('A Group uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Group uses the "member" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Anonymous Group is defined by "objectType" of an "actor" or "object" with value "Group" and by none of "mbox", "mbox_sha1sum", "open_id", or "account" being used (4.1.2.2.table1.row2, 4.1.2.2.table1)', function (done) {
            var data = clone(statmentEmptyActor);
            data[0].actor.objectType = 'Group';
            data[0].actor.account = {
                "homePage": "http://cloud.scorm.com/",
                "name": "anonymous"
            };
            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An Anonymous Group uses the "member" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Anonymous Group uses the "member" property (Multiplicity, 4.1.2.2.table1.row3.b)', function (done) {
            var data = clone(statmentEmptyActor);
            data[0].actor.objectType = 'Group';
            data[0].actor.account = {
                "homePage": "http://cloud.scorm.com/",
                "name": "anonymous"
            };

            data[0].actor.member = [
                {
                    "mbox": "mailto:test@example.com"
                }
            ];
            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('The "member" property is an array of Objects following Agent requirements (4.1.2.2.table1.row3.a)', function (done) {
            var data = clone(statmentEmptyActor);
            data[0].actor.objectType = 'Group';
            data[0].actor.account = {
                "homePage": "http://cloud.scorm.com/",
                "name": "anonymous"
            };

            data[0].actor.member = {
                "mbox": "mailto:test@example.com"
            };
            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Identified Group is defined by "objectType" of an "actor" or "object" with value "Group" and by one of "mbox", "mbox_sha1sum", "open_id", or "account" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['open_id'] = 'mailto:test@example.com';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Identified Group uses one of the following properties: "mbox", "mbox_sha1sum", "open_id", "account" (Multiplicity, 4.1.2.1.a)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['mbox'] = 'mailto:test@example.com';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });
        it('An Identified Group uses the "mbox" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group does not use the "mbox" property if "mbox_sha1sum", "open_id", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['mbox'] = 'mailto:test@example.com';
            item[0].actor['open_id'] = '12341234';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Identified Group uses the "mbox_sha1sum" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group does not use the "mbox_sha1sum" property if "mbox", "open_id", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['mbox_sha1sum'] = '1234231412342312342423';
            item[0].actor['mbox'] = 'mailto:test@example.com';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Identified Group uses the "open_id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group does not use the "open_id" property if "mbox", "mbox_sha1sum", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['open_id'] = '1234231412342312342423';
            item[0].actor['mbox'] = 'mailto:test@example.com';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Identified Group uses the "account" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group does not use the "account" property if "mbox", "mbox_sha1sum", or "open_id" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor.account = {
                "homePage": "http://www.example.com",
                "name": "1625378"
            };
            item[0].actor['open_id'] = '1234231412342312342423';
            item[0].actor['mbox'] = 'mailto:test@example.com';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "mbox" property is an IRI (Type, 4.1.2.3.table1.row1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "mbox" property has the form "mailto:email address" (Syntax, 4.1.2.3.table1.row1.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['mbox'] = 'asdfasdf@ssss';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "mbox_sha1sum" property is it a String (Type, 4.1.2.3.table1.row2.a)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['mbox_sha1sum'] = 12312312312;

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "open_id" property is a URI (Type, 4.1.2.3.table1.row3.a)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['open_id'] = 12312312312;

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "account" property uses the "homePage" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "account" property uses the "homePage" property (Multiplicity, 4.1.2.4.table1.row1.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor.account = {
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "account" propertys homePage" property is an IRL (Type, 4.1.2.4.table1.row1.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An "account" property uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "account" property uses the "name" property (Multiplicity, 4.1.2.4.table1.row2.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor.account = {
                "name": 'asdf',
                "homePage": 'http://www.example.com'
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An "account" propertys "name" property is a String (Type, 4.1.2.4.table1.row1.a)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor.account = {
                "name": 234123213423
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('A "verb" property uses the "id" property at most one time (Multiplicity, 4.1.3.table1.row1.aultiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "verb" property contains an "id" property (Multiplicity, 4.1.3.table1.row1.b)', function (done) {
            var item = clone(statmentEmptyVerb);

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('A "verb" propertys "id" property is an IRI (Type, 4.1.3.table1.row1.a)', function (done) {
            var item = clone(statmentEmptyVerb);
            item[0].verb = {
                "id": "http://adlnet.gov/expapi/verbs/created",
                "display": {
                    "en-US": "created"
                }
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('A "verb" property uses the "display" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "verb" propertys "display" property is a Language Map (Type, 4.1.3.table1.row2.a)', function (done) {
            var item = clone(statmentEmptyVerb);
            item[0].verb.id = 'http://adlnet.gov/expapi/verbs/created';
            item[0].verb.display = {
                "en-US": "created"
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('A Language Map is defined as a list of language tag/String pairs has at least 1 entry Implicit', function (done) {
            var item = clone(statmentEmptyVerb);
            item[0].verb.id = 'http://adlnet.gov/expapi/verbs/created';
            item[0].verb.display = {
                2345: 2345
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('A Language Map follows RFC5646 (Format, 5.2.a, RFC5646)', function (done) {
            var item = clone(statmentEmptyVerb);
            item[0].verb.id = 'http://adlnet.gov/expapi/verbs/created';
            item[0].verb.display = {
                "sdfg": {
                    "asdf": 23
                }
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('A "display" property uses a Language Map (Format, 4.1.3.table1.row1.a)', function (done) {
            var item = clone(statmentEmptyVerb);
            item[0].verb.id = 'http://adlnet.gov/expapi/verbs/created';
            item[0].verb.display = {
                "en-US": "created"
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An "object" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "object" property uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "object" property uses the "definition" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "object" property contains an "id" property (Multiplicity, 4.1.4.1.table1.row2.b)', function (done) {
            var item = clone(statmentEmptyObject);

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "object" propertys "id" property is an IRI (Type, 4.1.4.1.table1.row2.a)', function (done) {
            var item = clone(statmentEmptyObject);
            item[0].object.id = 'http://example.adlnet.gov/xapi/example/activity';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An "object" propertys "objectType" property is either "Activity", "Agent", "Group", "SubStatement", or"StatementRef" (Vocabulary, 4.1.4.b)', function (done) {
            var item = clone(statmentEmptyObject);
            item[0].object.id = 'http://example.adlnet.gov/xapi/example/activity';
            item[0].object.objectType = 'asdfasdf';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Activity is defined by the "objectType" of an "object" with value "Activity" (4.1.4.1.table1.row1.b)', function (done) {
            var item = clone(statmentEmptyObject);
            item[0].object.id = 'http://example.adlnet.gov/xapi/example/activity';
            item[0].object.objectType = 'Activity';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An Activity uses the "definition" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activitys "definition" property is an Object (Type, 4.1.4.1.table1.row3.a)', function (done) {
            var item = clone(statmentEmptyObject);
            item[0].object.id = 'http://example.adlnet.gov/xapi/example/activity';
            item[0].object.objectType = 'Activity';
            item[0].object.definition = 123123;

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Activity Object is the contents of a "definition" property object of an Activity (Format, 4.1.4.1.table2)', function (done) {
            var item = clone(statmentEmptyObject);
            item[0].object.id = 'http://example.adlnet.gov/xapi/example/activity';
            item[0].object.objectType = 'Activity';
            item[0].object.definition = {

            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An Activity Object contains at least one of the following properties: Implicit(Format, 4.1.4.1.table2)', function (done) {
            done(new Error('Implement Test'));
        });
    });
}());