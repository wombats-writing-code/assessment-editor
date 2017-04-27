import _ from 'lodash'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import VisualizeTree from './VisualizeTree'
import {visualizeEntity, closeVisualizeEntity} from '../../reducers/assessment/visualizeEntity'
import {questionCountSelector} from '../../selectors'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in VisualizeTreeContainer', state)

  return {
    isOpen: state.assessment.isVisualizeInProgress,
    currentEntity: entitySelector(state),
    visualizedEntities: visualizeEntitiesSelector(state),
    questionCountForEntity: questionCountSelector(state),
    entities: _.concat(state.mapping.outcomes, state.mapping.modules),
    relationships: state.mapping.relationships
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectVisualizeEntity: (entity) => dispatch(visualizeEntity(entity.id)),
    onClickClose: () => dispatch(closeVisualizeEntity())
  }
}

const entitySelector = createSelector([
  state => state.mapping,
  state => state.assessment.currentEntityId
], (mapping, currentEntityId) => {


  let entity = _.find(mapping.outcomes, {id: currentEntityId}) ||  _.find(mapping.modules, {id: currentEntityId});

  // console.log('currentEntityId', currentEntityId)
  // console.log('found visualize entity', entity);

  return entity;
})

const visualizeEntitiesSelector = createSelector([
  state => state.mapping,
  state => state.assessment.questions,
  state => state.assessment.currentEntityId
], (mapping, questions, currentEntityId) => {

  let entity = _.find(mapping.outcomes, {id: currentEntityId});
  let entities;
  // if the entity is an outcome, get ALL of its prerequisites
  if (entity) {
    let rels = _.filter(mapping.relationships, {sourceId: entity.id, type: 'HAS_PREREQUISITE_OF'});
    let prereqs = _.map(rels, r => _.find(mapping.outcomes, {id: r.targetId}));

    entities = _.concat(entity, prereqs);

  } else {
    // if the entity is a module, get the children
    let rels = _.filter(mapping.relationships, {targetId: currentEntityId, type: 'HAS_PARENT_OF'});
    let children = _.map(rels, r => _.find(mapping.outcomes, {id: r.sourceId}));

    entities = children;
  }

  entities = _.compact(entities)

  let visualizeEntities = _.map(entities, entity => {
    let questionsForEntity = _.filter(questions, {outcome: entity.id});

    return _.assign({}, entity, {
      questionCount: `(${questionsForEntity.length}) ${entity.displayName}`
    })
  })


  return visualizeEntities;
})


export default connect(mapStateToProps, mapDispatchToProps)(VisualizeTree)
