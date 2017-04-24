import _ from 'lodash'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import VisualizeTree from './VisualizeTree'
import {visualizeEntity, closeVisualizeEntity} from '../../reducers/assessment/visualizeEntity'

const mapStateToProps = (state, ownProps) => {
  console.log('state in VisualizeTreeContainer', state)

  return {
    isOpen: state.assessment.isVisualizeInProgress,
    currentEntity: entitySelector(state),
    visualizedEntities: entitiesSelector(state),
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

const entitiesSelector = createSelector([
  state => state.mapping,
  state => state.assessment.currentEntityId
], (mapping, currentEntityId) => {

  let entity = _.find(mapping.outcomes, {id: currentEntityId});
  // if the entity is an outcome, get ALL of its prerequisites
  if (entity) {
    let rels = _.filter(mapping.relationships, {sourceId: entity.id, type: 'HAS_PREREQUISITE_OF'});
    let prereqs = _.map(rels, r => _.find(mapping.outcomes, {id: r.targetId}));

    return _.concat(entity, prereqs);
  }

  // if the entity is a module, get the children
  let rels = _.filter(mapping.relationships, {targetId: currentEntityId, type: 'HAS_PARENT_OF'});
  let children = _.map(rels, r => _.find(mapping.outcomes, {id: r.sourceId}));

  return children;
})


export default connect(mapStateToProps, mapDispatchToProps)(VisualizeTree)
