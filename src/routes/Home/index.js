import Home from './Home'

import _ from 'lodash'
import { connect } from 'react-redux'

import {getDomains} from '../../reducers/assessment/getDomains'
import {getQuestions} from '../../reducers/assessment/getQuestions'
import {selectDomain} from '../../reducers/assessment/selectDomain'
import {newQuestion} from '../../reducers/assessment/createQuestion'
import {changeSearchQuery} from '../../reducers/assessment/changeSearchQuery'
import {getMapping} from '../../reducers/mapping/getMapping'

import {selectUser, selectQuestions, questionsByModule} from '../../selectors/'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in home container', state)

  return {
    user: selectUser(state),
    domains: state.assessment.domains,
    currentDomain: state.assessment.currentDomain,
    currentModule: state.assessment.currentModule,
    mapping: state.mapping,
    questions: selectQuestions(state),
    questionsByModule: questionsByModule(state),
    searchQuery: state.assessment.searchQuery,
    matchedQuestions: state.assessment.matchedQuestions,
    isGetQuestionsInProgress: state.assessment.isGetQuestionsInProgress,
    isEditInProgress: state.assessment.isEditInProgress
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDomains: (user) => dispatch(getDomains(user)),
    onClickDomain: (entityTypes, relationshipTypes, domain, user) => {
      dispatch(selectDomain(domain));
      dispatch(getMapping({
        entityTypes,
        relationshipTypes,
        domain,
        user
      }));
      dispatch(getQuestions(domain, user));
    },
    onClickNewQuestion: (domain) => dispatch(newQuestion(domain)),
    onSelectModule: module => {

    },
    onChangeSearchQuery: (query, questionsByModule, questions) => dispatch(changeSearchQuery(query, questionsByModule, questions))
  }
}


export default {
  component : connect(mapStateToProps, mapDispatchToProps)(Home)
}
