import _ from 'lodash'

import {GET_DOMAINS_OPTIMISTIC, GET_DOMAINS_SUCCESS} from './getDomains'
import {GET_QUESTIONS_OPTIMISTIC, GET_QUESTIONS_SUCCESS} from './getQuestions'
import {SELECT_DOMAIN} from './selectDomain'
import {EDIT_QUESTION} from './editQuestion'
import {CLOSE_EDIT_QUESTION} from './closeEditQuestion'
import {LINK_OUTCOME} from './linkOutcome'
import {CLOSE_LINK_OUTCOME} from './closeLinkOutcome'
import {SELECT_LINK_OUTCOME} from './selectLinkOutcome'

import {UPDATE_LINK_OUTCOME_OPTIMISTIC, UPDATE_LINK_OUTCOME_SUCCESS} from './updateLinkOutcome'
import {UPDATE_QUESTION_OPTIMISTIC, UPDATE_QUESTION_SUCCESS} from './updateQuestion'
import {CREATE_QUESTION_OPTIMISTIC, CREATE_QUESTION_SUCCESS} from './createQuestion'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  domains: null
}
export default function assessmentReducer (state = initialState, action) {
  switch (action.type) {
    case GET_DOMAINS_OPTIMISTIC:
      return _.assign({}, state, {
        isGetDomainsInProgress: true,
      })

    case GET_DOMAINS_SUCCESS:
      return _.assign({}, state, {
        domains: action.domains,
        isGetDomainsInProgress: false,
      })

    case SELECT_DOMAIN:
      return _.assign({}, state, {
        currentDomain: action.domain,
        questions: null
      })

    case GET_QUESTIONS_OPTIMISTIC:
      return _.assign({}, state, {
        isGetQuestionsInProgress: true
      })

    case GET_QUESTIONS_SUCCESS:
      return _.assign({}, state, {
        isGetQuestionsInProgress: false,
        questions: action.questions
      })

    case EDIT_QUESTION:
      return _.assign({}, state, {
        isEditInProgress: true,
        editQuestionCopy: _.cloneDeep(action.question)
      })

    case CLOSE_EDIT_QUESTION:
      return _.assign({}, state, {
        isEditInProgress: false,
        editQuestionCopy: null
      })

    case UPDATE_QUESTION_OPTIMISTIC:
      return _.assign({}, state, {
        isUpdateQuestionInProgress: true
      })

    case UPDATE_QUESTION_SUCCESS:
      return _.assign({}, state, {
        isUpdateQuestionInProgress: false,
        questions: _.map(state.questions, q => {
          if (q.id === action.question.id) {
            return action.question;
          }

          return q;
        }),
        isEditInProgress: false,
        editQuestionCopy: null
      })

    case LINK_OUTCOME:
      return _.assign({}, state, {
        isLinkOutcomeInProgress: true,
        editQuestionCopy: _.cloneDeep(action.question),
        currentChoice: action.choice
      })

    case CLOSE_LINK_OUTCOME:
      return _.assign({}, state, {
        isLinkOutcomeInProgress: false,
        editQuestionCopy: null,
        currentChoice: null
      })

    case SELECT_LINK_OUTCOME:
      let newOutcomeId = action.outcome ? action.outcome.id : null;

      if (action.choice) {
        let newChoice = _.assign({}, action.choice, {
          confusedOutcomes: newOutcomeId ? [newOutcomeId] : []
        });

        return _.assign({}, state, {
          editQuestionCopy: _.assign({}, state.editQuestionCopy, {
            choices: _.map(state.editQuestionCopy.choices, choice => {
              if (choice.id === newChoice.id) {
                return newChoice
              }

              return choice
            })
          }),
          currentChoice: newChoice
        })

      } else {
        return _.assign({}, state, {
          editQuestionCopy: _.assign({}, state.editQuestionCopy, {
            outcome: newOutcomeId
          }),
        })
      }

    case UPDATE_LINK_OUTCOME_OPTIMISTIC:
      return _.assign({}, state, {
        isUpdateQuestionInProgress: true
      })

    case UPDATE_LINK_OUTCOME_SUCCESS:
      return _.assign({}, state, {
        isUpdateQuestionInProgress: false,
        questions: _.map(state.questions, q => {
          if (q.id === action.question.id) {
            // console.log('found action.question', action.question)
            return action.question
          }

          return q;
        }),
        isLinkOutcomeInProgress: false,
        editQuestionCopy: null,
        currentChoice: null
      })

    case CREATE_QUESTION_OPTIMISTIC:
      return _.assign({}, state, {
        isSaveQuestionInProgress: true,
        editQuestionCopy: null
      })

    case CREATE_QUESTION_SUCCESS:
      return _.assign({}, state, {
        isSaveQuestionInProgress: false,
        questions: _.concat(action.question, state.questions)
      })

    default:
      return state
  }
}
