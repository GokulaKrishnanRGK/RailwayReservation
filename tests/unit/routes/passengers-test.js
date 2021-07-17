import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | passengers', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:passengers');
    assert.ok(route);
  });
});
