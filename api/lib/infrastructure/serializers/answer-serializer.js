const JSONAPISerializer = require('./jsonapi-serializer');
const Answer = require('../../domain/models/data/answer');

class AssessmentSerializer extends JSONAPISerializer {

  constructor() {
    super('answers');
  }

  serializeAttributes(model, data) {
    data.attributes.value = model.value;
    data.attributes.result = model.result;
  }

  serializeRelationships(model, data) {
    data.relationships = {};

    data.relationships.assessment = {
      data: {
        type: 'assessments',
        id: model.assessmentId
      }
    };

    data.relationships.challenge = {
      data: {
        type: 'challenges',
        id: model.challengeId
      }
    };
  }

  deserialize(json) {
    const answer = new Answer({
      value: json.data.attributes.value,
      result: json.data.attributes.result,
      assessmentId: json.data.relationships.assessment.data.id,
      challengeId: json.data.relationships.challenge.data.id
    });

    if (json.data.id) {
      answer.set('id', json.data.id);
    }

    return answer;
  }

}

module.exports = new AssessmentSerializer();
