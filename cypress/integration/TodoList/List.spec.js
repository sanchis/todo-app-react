/// <reference types="cypress" />
import localforage from 'localforage'
import { CHECK_BTN, DELETE_BTN, FAV_BTN, LIST } from '../../support/selectors'

describe('example to-do app', () => {
  beforeEach(() => {
    localforage.setItem('todos', [{
      id: 1,
      checked: false,
      name: 'todo test',
      fav: false
    }])
    cy.visit('/')
  })

  it('Todo list can render', () => {
    cy.get(LIST).should('exist')
    cy.get(`${LIST} li ${CHECK_BTN}`).should('not.have.property', 'checked')
    cy.get(`${LIST} li ${FAV_BTN}`).should('have.value', 'false')
    cy.get(`${LIST} li`).should('have.length', 1)
  })

  it('Todo list can delete', () => {
    cy.get(DELETE_BTN).first().click()
    cy.get(`${LIST} li`).should('not.exist')
  })

  it('Todo list can make fav', () => {
    cy.get(`${LIST} li ${FAV_BTN}`).should('have.value', 'false')
    cy.get(`${LIST} li ${FAV_BTN}`).click()
    cy.get(`${LIST} li ${FAV_BTN}`).should('have.value', 'true')
  })

  it('Todo list can mark as done', () => {
    cy.get(`${LIST} li ${CHECK_BTN}`).should('not.have.property', 'checked')
    cy.get(`${LIST} li ${CHECK_BTN}`).check().should('be.checked')
  })
})
