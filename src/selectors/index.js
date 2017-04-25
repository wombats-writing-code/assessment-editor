import { createSelector } from 'reselect'

export const selectUser = (state) => {
  return state.login.user;
}

export const selectQuestions = (state) => {
  return state.assessment.questions;
}

export const outcomesById = createSelector([
  state => state.mapping.outcomes
  ],
  (outcomes) => {

  return _.reduce(outcomes, (result, outcome) => {
    result[outcome.id] = outcome;
    return result;
  }, {});
});


export const modulesByOutcome = createSelector([
  state => state.mapping,
],
  mapping => {
    if (!mapping) return;

    return _.reduce(mapping.outcomes, (result, outcome) => {
      let hasParent = _.find(mapping.relationships, {sourceId: outcome.id, type: 'HAS_PARENT_OF'});
      if (!hasParent) return;

      let module = _.find(mapping.modules, {id: hasParent.targetId})
      result[outcome.id] = module;

      return result;
    }, {})
  }
)

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

    result[module.id] = _.sortBy(_.filter(questions, q => {
      return moduleOutcomes.indexOf(q.outcome) > -1;
    }), q => q.displayName.startsWith('Target'));

    result['Uncategorized'] = _.filter(questions, q => !q.outcome)

    // console.log('result', result)

    return result;

  }, {});

  // console.log('dict', dict)

  return dict;
});

export const questionCountSelector = createSelector([
  state => state.mapping.outcomes,
  state => state.assessment.questions
], (outcomes, questions) => {
  return _.reduce(outcomes, (result, outcome) => {
    result[outcome.id] = _.filter(questions, {outcome: outcome.id}).length;

    return result;
  }, {})
})
