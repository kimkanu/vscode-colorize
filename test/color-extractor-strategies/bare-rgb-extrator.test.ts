import { assert } from 'chai';
import { describe, it } from 'mocha';

import { REGEXP } from '../../src/lib/colors/strategies/bare-rgb-strategy';
import { regex_exec } from '../test-util';

describe('Test bare rgb color Regex', () => {
  it('Should match a simple rgb color', function () {
    assert.equal(regex_exec('123 123 123', REGEXP)[1], '123 123 123');
  });
  it('Should match a simple rgba color', function () {
    assert.equal(regex_exec('123 123 123 / 0', REGEXP)[1], '123 123 123 / 0');
    assert.equal(regex_exec('123 123 123 /0.3', REGEXP)[1], '123 123 123 /0.3');
    assert.equal(regex_exec('123 123 123/ 0.3', REGEXP)[1], '123 123 123/ 0.3');
    assert.equal(regex_exec('123 123 123 / 1', REGEXP)[1], '123 123 123 / 1');
    assert.equal(regex_exec('123 123 123/1.0', REGEXP)[1], '123 123 123/1.0');
    assert.equal(regex_exec('123   123 123/60%', REGEXP)[1], '123   123 123/60%');
    assert.equal(regex_exec('123 123 123 / 60.248%', REGEXP)[1], '123 123 123 / 60.248%');
    assert.equal(regex_exec('123 123 123 / 260.248%', REGEXP)[1], '123 123 123');
  });
  it('Should not match', function () {
    assert.isNull(regex_exec('123 123', REGEXP));
    assert.isNull(regex_exec('123 123 / 3%', REGEXP));
    assert.isNull(regex_exec('123 123    / 1', REGEXP));
  });
  it('Should match inside a string', function() {
    assert.equal(regex_exec('"123 123 123 / 60%"', REGEXP)[1], '123 123 123 / 60%');
    assert.equal(regex_exec('"123 123 123"', REGEXP)[1], '123 123 123');
  });

  it('Should match with different characters at the end', function () {
    assert.equal(regex_exec('123 123 123 ', REGEXP)[1], '123 123 123');
    assert.equal(regex_exec('123 123 123,', REGEXP)[1], '123 123 123');
    assert.equal(regex_exec('123 123 123;', REGEXP)[1], '123 123 123');
    assert.equal(regex_exec('123 123 123\n', REGEXP)[1], '123 123 123');
    assert.equal(regex_exec('123 123 123)', REGEXP)[1], '123 123 123');
    assert.equal(regex_exec('123 123 123}', REGEXP)[1], '123 123 123');
    assert.equal(regex_exec('123 123 123<', REGEXP)[1], '123 123 123');
  });

  it('Should accept dot values (rgb)', function() {
    assert.equal(regex_exec('12.3 123 123', REGEXP)[1], '12.3 123 123');
    assert.equal(regex_exec('123 12.3 123', REGEXP)[1], '123 12.3 123');
    assert.equal(regex_exec('123 123 123.3', REGEXP)[1], '123 123 123.3');
    assert.equal(regex_exec('123 123 123.333333', REGEXP)[1], '123 123 123.333333');
    assert.equal(regex_exec('12.3 12.3 12.3', REGEXP)[1], '12.3 12.3 12.3');
    assert.equal(regex_exec('.3 12.3 12.3', REGEXP)[1], '.3 12.3 12.3');
  });

  it('Should accept dot values (rgba)', function() {
    assert.equal(regex_exec('12.3 123 123 / 0', REGEXP)[1], '12.3 123 123 / 0');
    assert.equal(regex_exec('12.3 123 123 / 0.123', REGEXP)[1], '12.3 123 123 / 0.123');
    assert.equal(regex_exec('12.3 123 123 / 0.0%', REGEXP)[1], '12.3 123 123 / 0.0%');
    assert.equal(regex_exec('12.3 123 123 / .4%', REGEXP)[1], '12.3 123 123 / .4%');
    assert.equal(regex_exec('12.3 123 123 / 12.3%', REGEXP)[1], '12.3 123 123 / 12.3%');
  });
});
