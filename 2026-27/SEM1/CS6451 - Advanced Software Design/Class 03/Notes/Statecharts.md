# Statecharts

## Said in class (Wed 23 Sep 2026)

> **Q:** What is the purpose of a state chart?
> **A:** To model state independent variation and behaviour.

## What the slides say

Lecture C, slide 37 says it is "important to **model state dependent variations in behaviour** since they represent constraints on the way the system should behave". So the word is *dependent*, and "independent" was probably misheard.

- A statechart describes every possible life cycle an object of one class can follow.
- It captures **all the responses of a single object** across every use case it takes part in. A sequence diagram, by contrast, captures all the objects in a **single use case**.
- Example: a vending machine responds to the same input differently depending on its state.
- The notation comes from Harel (1987), later adopted by OMT and Booch (1994).

## Exam relevance

The 24/25 midterm, Q6, asked: *"What is the purpose of a state chart? Write the implementation for the `authorised(authorisationCode)` method given the state chart for the Campaign class in the Agate case study."* See Lecture C, slides 42–48. See also [Assignment Part 1 §6](../../Assignments/Part%201%20-%20OOAD,%20OOP,%20Patterns,%20Refactoring/README.md), which requires one state chart with annotated transition strings.
