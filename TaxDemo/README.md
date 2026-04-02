# AI Agents + MCP + Playwright Setup Guide

## Goal
Set up AI-powered automation using GitHub Copilot, the MCP concept, and Playwright to generate, fix, and run automation scripts. This guide demonstrates how to build AI automation for a login page, specifically covering positive, negative, and edge cases, alongside security testing.

## Step 1: Install Prerequisites
Install Node.js and verify using `node -v` and `npm -v`. Install VS Code. Then run: 
`npm init playwright@latest`

## Step 2: Setup GitHub Copilot
Create a GitHub account, enable a Copilot subscription, install the GitHub Copilot and Copilot Chat extensions in your editor, and sign in to activate.

## Step 3: Understanding MCP
MCP is not a downloadable file. It works behind the scenes. Copilot reads your project structure, understands files, and generates context-aware code.

## Step 4: Project Structure
Create folders: `pages/`, `tests/`, `utils/`, `test-data/`. This helps Copilot understand and generate structured automation.

## Step 5: Planner Agent
Use the Copilot Chat prompt: *Generate test scenarios for the login page, including positive, negative, and edge cases, as well as security tests.* Save the output in `test-data/test_scenarios.md`

## Step 6: Generator Agent
Prompt: *Create Playwright framework using Page Object Model.* Copilot generates page classes, test files, and assertions based on the planned scenarios.

## Step 7: Run Tests
Run command: `npx playwright test` to execute the tests.

## Step 8: Healer Agent
If a test fails, ask Copilot to fix locator issues and improve stability. Update the code accordingly.

## Step 9: Continuous Usage
Use prompts to optimize scripts, refactor code, and debug failures.

## Real Workflow
Planner → Generator → Run → Healer → Optimize

## Final Understanding
Copilot acts as the brain, MCP provides the context, and your prompts act as agents to execute complex automation tasks.
