import { createSelector } from 'reselect'

export const selectUser = (state) => {
  let temp = {
    id: 'dev-editor',
    displayName: 'dev editor'
  }
  return state.login.user || temp;
}

export const selectQuestions = (state) => {
  return state.assessment.questions;
}

export const questionsByModule = createSelector([
  state => state.mapping,
  state => state.assessment.questions,
  ],
  (mapping, questions) => {

  if (!mapping || !mapping.modules) return null;


  let dict = _.reduce(mapping.modules, (result, module) => {
    let moduleOutcomes = _.map(_.filter(mapping.outcomes, outcome => {
      let hasParent = _.find(mapping.relationships, {sourceId: outcome.id, targetId: module.id});
      return hasParent;
    }), 'id');

    // console.log('moduleOutcomes', module.displayName, moduleOutcomes.length);

    result[module.id] = _.filter(questions, q => {
      return moduleOutcomes.indexOf(q.outcome) > -1;
    });

    return result;

  }, {});

  return dict;
});
