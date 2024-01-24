/// <reference types="cypress" />

import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import SavedList from './index'
import { SavedListProvider, useSavedList } from "./SavedListProvider";
import { Beer } from "../../types";

describe('<Component />', () => {
  beforeEach(() => localStorage.clear())

  it('render with no items', () => {
    cy.mount(<SavedListComponent />)
    cy.get('[data-testid=no-item]')
  })

  it('render with items', () => {
    const savedList = getDummySavedList()
    localStorage.setItem('savedBeers', JSON.stringify(savedList))

    cy.mount(<SavedListComponent />)
    cy.get('[data-testid=beer-item]').should('have.length', 3)

    savedList.forEach(item => cy.get('[data-testid=beer-item]').contains(item.name))
  })

  it('remove all items', () => {
    const savedList = getDummySavedList()
    localStorage.setItem('savedBeers', JSON.stringify(savedList))

    cy.mount(<SavedListComponent />)
    cy.get('[data-testid=beer-item]').should('have.length', 3)
    cy.get('[data-testid=remove-all]').click()
    cy.get('[data-testid=no-item]')
  })

  it('remove first item', () => {
    const savedList = getDummySavedList()
    localStorage.setItem('savedBeers', JSON.stringify(savedList))
    const firstItemName = savedList[0].name

    cy.mount(<SavedListComponent />)
    cy.contains('[data-testid=beer-item]', firstItemName).within(() => {
      cy.get('[data-testid=toggle-save]').click()
    })
    cy.contains('[data-testid=beer-item]', firstItemName).should('not.exist')
  })

  it('save a new item', () => {
    const dummyBeer = { id: "b18f7f04", name: "Wooly Pig Farm Brewery" } as Beer
    function AddButton() {
      const { toggleBeerSave } = useSavedList();
      return <button data-testid="save-beer" onClick={() => toggleBeerSave(dummyBeer)}>save</button>
    }

    cy.mount(<SavedListComponent children={<AddButton />} />)
    cy.get('[data-testid=no-item]')
    cy.get('[data-testid=save-beer]').click()
    cy.get('[data-testid=beer-item]').contains(dummyBeer.name)
  })
})

function SavedListComponent({ children }: { children?: React.ReactNode }) {
  return (
    <MemoryRouter>
      <SavedListProvider>
        <SavedList/>
        {children}
      </SavedListProvider>
    </MemoryRouter>
  )
}

function getDummySavedList() {
  return [
    { id: "5916f082", name: "Fat Hill Brewing" },
    { id: "016640d5", name: "Sager Beer Works" },
    { id: "9096ee1d", name: "Claimstake Brewing Company" },
  ]
}
