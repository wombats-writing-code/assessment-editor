import _ from 'lodash'

import {search} from '../../selectors/search'

import {GET_DOMAINS_OPTIMISTIC, GET_DOMAINS_SUCCESS} from './getDomains'
import {GET_QUESTIONS_OPTIMISTIC, GET_QUESTIONS_SUCCESS} from './getQuestions'
import {CHANGE_SEARCH_QUERY} from './changeSearchQuery'

import {SELECT_MODULE} from './selectModule'
import {SELECT_QUESTION} from './selectQuestion'
import {SELECT_DOMAIN} from './selectDomain'
import {VISUALIZE_ENTITY, CLOSE_VISUALIZE_ENTITY} from './visualizeEntity'

import {EDIT_QUESTION} from './editQuestion'
import {CLOSE_EDIT_QUESTION} from './closeEditQuestion'
import {LINK_OUTCOME} from './linkOutcome'
import {CLOSE_LINK_OUTCOME} from './closeLinkOutcome'
import {SELECT_LINK_OUTCOME} from './selectLinkOutcome'
import {DELETE_CHOICE} from './deleteChoice'
import {ADD_CHOICE} from './addChoice'
import {CHANGE_QUESTION_FIELD} from './changeQuestionField'

import {UPDATE_LINK_OUTCOME_OPTIMISTIC, UPDATE_LINK_OUTCOME_SUCCESS} from './updateLinkOutcome'
import {UPDATE_QUESTION_OPTIMISTIC, UPDATE_QUESTION_SUCCESS} from './updateQuestion'
import {NEW_QUESTION, CREATE_QUESTION_OPTIMISTIC, CREATE_QUESTION_SUCCESS} from './createQuestion'
import {DELETE_QUESTION_OPTIMISTIC, DELETE_QUESTION_SUCCESS} from './deleteQuestion'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  domains: null,
  visibleModules: true,
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
        searchQuery: '',
        currentDomain: action.domain,
        questions: null
      })

    case CHANGE_SEARCH_QUERY:
      // let visibleModules =
      let matchedQuestions = _.filter(action.questions, q => {
        return search(action.query, q.displayName) || search(action.query, q.text);
      })

      // console.log('matchedQuestions', matchedQuestions);

      // let matchedModules = _.compact(_.map(matchedQuestions, q => {
      //   let module = _.find(action.questionsByModule, (questions) => questions.indexOf(q) > -1)
      //   return module;
      // }))
      //
      // console.log('matchedModules', matchedModules);

      return _.assign({}, state, {
        searchQuery: action.query,
        matchedQuestions: matchedQuestions
      })

    case SELECT_MODULE:
      // console.log(action.module)
      return _.assign({}, state, {
        currentModule: state.currentModule && state.currentModule.id === action.module.id ? null : action.module // unselect it if it's already the current module
      })

    case SELECT_QUESTION:
      // console.log(action.module)
      return _.assign({}, state, {
        currentQuestion: state.currentQuestion === action.question ? null : action.question // unselect it if it's already the current question
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

    case NEW_QUESTION:
      return _.assign({}, state, {
        isEditInProgress: true,
        editQuestionCopy: _stampNewQuestion(action.domain),
        editType: 'new',
      })

    case EDIT_QUESTION:
      return _.assign({}, state, {
        isEditInProgress: true,
        editQuestionCopy: _.cloneDeep(action.question),
        editType: 'edit'
      })

    case CHANGE_QUESTION_FIELD:
      // console.log('CHANGE_QUESTION_FIELD', action.data)
      return _.assign({}, state, {
        editQuestionCopy: _.assign({}, state.editQuestionCopy, action.data)
      })

    case DELETE_CHOICE:
      // remove the choice at index idx
      state.editQuestionCopy.choices.splice(action.idx, 1);

      return _.assign({}, state, {
        editQuestionCopy: _.assign({}, state.editQuestionCopy, {
          choices: _.slice(state.editQuestionCopy.choices)
        })
      })

    case ADD_CHOICE:
      return _.assign({}, state, {
        editQuestionCopy: _.assign({}, state.editQuestionCopy, {
          choices: _.concat(state.editQuestionCopy.choices, _stampNewChoice())
        })
      })

    case CLOSE_EDIT_QUESTION:
      return _.assign({}, state, {
        isEditInProgress: false,
        editQuestionCopy: null,
        editType: null
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
        currentQuestion: action.question,
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
        currentQuestion: action.question,
        currentChoice: null
      })

    case CREATE_QUESTION_OPTIMISTIC:
      return _.assign({}, state, {
        currentModule: _stampUncategorizedModule(),
        isSaveQuestionInProgress: true,
        editQuestionCopy: null
      })

    case CREATE_QUESTION_SUCCESS:
      return _.assign({}, state, {
        isSaveQuestionInProgress: false,
        questions: _.concat(action.question, state.questions)
      })

    case DELETE_QUESTION_OPTIMISTIC:
      return _.assign({}, state, {
        isDeleteQuestionInProgress: true
      })

    case DELETE_QUESTION_SUCCESS:
      return _.assign({}, state, {
        isDeleteQuestionInProgress: false,
        questions: _.reject(state.questions, {id: action.question.id})
      })

    case VISUALIZE_ENTITY:
      return _.assign({}, state, {
        isVisualizeInProgress: true,
        currentEntityId: action.entityId
      })

    case CLOSE_VISUALIZE_ENTITY:
      return _.assign({}, state, {
        isVisualizeInProgress: false
      })

    default:
      return state
  }
}

function _stampUncategorizedModule() {
  return {
    id: 'Uncategorized',
    displayName: 'Uncategorized'
  }
}

function _stampNewChoice(choiceId) {
  return {
    text: '',
    confusedOutcomes: [],
    feedback: '',
    choiceId
  }
}

function _stampNewQuestion(domain) {
  let choices = _.map(_.range(4), idx => _stampNewChoice());

  return {
    // itemId: String,
    displayName: `dev question ${_.uniqueId()}`,
    description: '',
    solution: choices[0],
    feedback: '',
    text: 'stamp new question',								// the actual text of the question
    outcome: '',
    choices,
    domain: domain.id,
  }
}
