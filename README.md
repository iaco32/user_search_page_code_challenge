# user_search_page_code_challenge
This is a User search Page.
This page will allow the users to lookup other users in the company, list 
all the matching results and, when one selected, display that user 
profile and detailed information. 

In order to get the user information, the [randomuser.me](https://randomuser.me/) API will be used. 
This Api will generate random user data on each request.

## App behavior

1. By the time the page loads we want to populate the results list with 25 user entries with an infinite scrolling on the search list.
2. On top of the search list, a free text input that will filter the current results by the user First name or Last name field and their gender (the Api only handles 
“male” and “female” as possible genders).
3. On the results list each user entry display their name, email information and a thumbnail picture of them. The name and last name must have their first letter capitalized. 
4. When clicking one of the user entries the detailed information are displayed on the screen.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
