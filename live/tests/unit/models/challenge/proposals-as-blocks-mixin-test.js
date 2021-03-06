import Ember from 'ember';
import { describe } from 'mocha';
import { it } from 'ember-mocha';
import { expect } from 'chai';
import ProposalsAsBlocksMixin from 'pix-live/models/challenge/proposals-as-blocks-mixin';

describe('Unit | Model | Challenge/Proposal As Blocks Mixin', function () {

  const testData = [
    { data: '', expected: [] },
    { data: 'Text', expected: [{ text: 'Text' }] },
    { data: 'Text test plop', expected: [{ text: 'Text test plop' }] },
    { data: '${qroc}', expected: [{ input: 'qroc' }] },
    { data: 'Test: ${test}', expected: [{ text: 'Test:' }, { input: 'test' }] },
    {
      data: 'Test: ${test} (kilometres)',
      expected: [{ text: 'Test:' }, { input: 'test' }, { text: '(kilometres)' }]
    },
    {
      data: '${plop}, ${plop} ${plop}',
      expected: [{ input: 'plop' }, { text: ',' }, { input: 'plop' }, { input: 'plop' }]
    },
    { data: '${plop#var}', expected: [{ input: 'plop', placeholder: 'var' }] },
    { data: 'line1\nline2', expected: [{ text: 'line1' }, { breakline: true }, { text: 'line2' }] },
    { data: 'line1\r\nline2', expected: [{ text: 'line1' }, { breakline: true }, { text: 'line2' }] },
    { data: 'line1\n\rline2', expected: [{ text: 'line1' }, { breakline: true }, { text: 'line2' }] },
    { data: 'line1\n\nline2', expected: [{ text: 'line1' }, { breakline: true }, { text: 'line2' }] }
  ];

  const Challenge = Ember.Object.extend(ProposalsAsBlocksMixin, {});

  testData.forEach(function ({ data, expected }) {

    it(`"${data}" retourne ${JSON.stringify(expected)}`, function () {
      const sut = Challenge.create({ proposals: data });
      const blocks = sut.get('_proposalsAsBlocks');
      expect(blocks, JSON.stringify(blocks)).to.deep.equals(expected);
    });
  });
});

