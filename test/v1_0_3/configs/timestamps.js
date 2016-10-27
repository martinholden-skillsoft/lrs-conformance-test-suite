/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */
(function (module, helper) {
    "use strict";

    // defines overwriting data
    var INVALID_DATE = '01/011/2015';
    var FUTURE_DATE = new Date().setFullYear(new Date().getFullYear + 5);
    var INVALID_STRING = 'should fail';

    // configures tests
    module.exports.config = function () {
        return [
            {
            /**  XAPI-00123, Data 4.5 ISO8601 Timestamps
             * A Timestamp must conform to ISO 8601 Date format. An LRS rejects a statement with a Timestamp which doesn’t validate to ISO 8601 Extended or ISO 8601 Basic.
             */
                name: 'A TimeStamp is defined as a Date/Time formatted according to ISO 8601 (Format, Data 4.5.s1.b1, ISO8601, XAPI-00123)',
                config: [
                    {
                        name: 'statement "template" invalid string',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "template" invalid date',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_DATE}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00022, Data 2.4 Statement Properties
             * A "timestamp" property is a TimeStamp, per section 4.5. An LRS rejects with 400 Bad Request a statement if it has a TimeStamp and that TimeStamp is invalid.
             */
                name: 'A "timestamp" property is a TimeStamp (Type, Data 2.4.7, Data 2.4.s1.table1.row7, XAPI-00022)',
                config: [
                    {
                        name: 'statement "template" invalid string',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "template" invalid date',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_DATE}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "template" future date',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: FUTURE_DATE}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'substatement "template" invalid string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{statements.default}}'},
                            {timestamp: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'substatement "template" invalid date',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{statements.default}}'},
                            {timestamp: INVALID_DATE}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'substatement "template" future date',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{statements.default}}'},
                            {timestamp: FUTURE_DATE}
                        ],
                        expect: [200]
                    }
                ]
            },
        ];
    };
}(module, require('./../../helper.js')));
