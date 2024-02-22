# Content

<!-- vim-markdown-toc Marked -->

* [How to run in local environment](#how-to-run-in-local-environment)
* [Visit deploy](#visit-deploy)
* [Developer documentation](#developer-documentation)
    * [Repo folder organization](#repo-folder-organization)

<!-- vim-markdown-toc -->

# How to run in local environment

1. Install `node` 20.x from [node](https://nodejs.org/)
2. Run `npm i` to install all dependencies
3. Run `npm run dev` to run app in development mode
4. Visit http://localhost:3000/ to access development build

# Visit deploy

1. Navigate to https://tech-test.felipe-sanchez.space/login to use the deployed production build

# Developer documentation

## Repo folder organization

```
├── public                    - Files public to anyone
└── src                       - Application code
    ├── app                   - View components. The route of the view is the path to the component relative to this folder
    │   ├── auth
    │   │   └── login         - View in charge of handling login callback from OAuth
    │   ├── formulario        - View in charge of demonstrating the dynamic input generation from API endpoint
    │   ├── login             - View in charge of showing login option
    │   └── pokemons          - View in charge of showing all pokemons in an infinite list
    │       └── [pokemonName] - View in charge of showing a pokemon's details
    ├── components            - Independent components used in the app
    ├── services              - API services
    └── stores                - State management with redux
```

