# App scaffoldin: 
- App -> has two components and manages the scores state for them: Scores and Cards
  - Scores would just display the scores based on the props passed to them and will be using useRef; need to learn about useRef
  - Cards has all the logic for the "game" fetching the (photos, names) and passing them for each card to display; each card knows how many times it was clicked on by? 

<!-- No plan ever comes to existence as pictured; a lot of times it turns out better, but sometimes worse. -->
<!-- " - there is a current score which we increment when the user clicks on a flag that he hasn't clicked on yet 
  - so we have to keep a record of the things the user clicks on in a set
  - we also use this score for best score when it exceeds best score
- if user clicks on same flag he has clicked on in the round we rerender everything so there should be clicked on countries; re-render("lost" boolean or state passed down from app);  " -->

- future features: 
  - scroll bar

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
