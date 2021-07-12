// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by status.js.
import { name as packageName } from "meteor/leaonline:status";

// Write your tests here!
// Here is an example.
Tinytest.add('status - example', function (test) {
  test.equal(packageName, "status");
});
