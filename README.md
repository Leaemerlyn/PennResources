# Welcome to Penn Resources
## Overview
### Project summary
This tool is meant for MCIT students who are looking for supplemental resources for course material. In the site, users can select a course and a module within that course, and it will display all of the available resources that other students have posted. Users can also see their own contributions on a dedicated page.

It was made using React for the frontend, and Firebase for the backend.

Include the link to your Devpost project page here: [Devpost](https://devpost.com/software/penn-resources)

### Authors

* **Lea Emerlyn** -leaodovia – lemerlyn@seas.upenn.edu – [GitHub](https://github.com/Leaemerlyn)
* **Ben Swanson** - Devpost ID – bswan1@seas.upenn.edu – [GitHub](https://github.com/user_name)
* **Leven Cai** - levencai – levencai@seas.upenn.edu – [GitHub](https://github.com/208cai5099)
* **Abdullah Amer** - Devpost ID - abdamer@seas.upenn.edu - [GitHub](https://github.com/user_name)

## Usage

As MCIT students, we use a multitude of resources to supplement course material. These can be articles, videos, forums, or anything that clarifies what’s being taught in class. Often, these resources are shared between individuals, in study groups, or through other informal channels. However, this leads to valuable resources being lost deep in the archives of Slack, and most students who would benefit from these materials may never see them.
This is why we created Penn Resources, a site where students can share and describe anything they found useful, as well as upvote resources posted by others. Our goal is to combine the resourcefulness of all MCIT students in a way that will be helpful in all phases of class preparation. We hope you enjoy it!


### Prerequisites

There are no prerequisites to using the site. However, if you want to contribute a resource, you must have a @seas.upenn.edu email. This is to ensure that only Penn students can contribute resources. 

```
Provide code samples in this fenced code block.
```

### Installation

Give a step-by-step rundown of how to **install** your project.

To install dependencies, run 

```
npm 
```

Then to start up the app run
```
npm start
```


### Deployment

To view resources, use the two drop down menus. 

![Screenshot](courseModuleDropdown.png)

Then click on any card:

![Screenshot](cards.png)

To submit a resource, users need to login with their @seas.upenn.edu email. Use the login button on the top right corner.

Click on your name and go to My Contributions. Here you will see a list of your contributions to Penn Resources. 

![Screenshot](profile.png)

Click on the Add resources button to add a new resource. 

Click on the pencil icon next to each resource card to update a resource.

If there is any trouble, please contact us with emails in the contact tab. 


Etc.

## Additional information

### Tools used

* [React](https://react.dev/) - A Javascript-based framework for website development
* [RSuite](https://rsuitejs.com/) - A library of React user-interface components for website development
* [Firebase](https://firebase.google.com/) - A backend infrastructure service provided by Google
* [React Icons](https://react-icons.github.io/react-icons) - A library of icons for website design

### Acknowledgments

* Inspiration: The layout of the website was inspired by [MCITCentral](https://mcitcentral.com/).
* Use of RSuite: We followed the instructions and code examples from the official [RSuite](https://rsuitejs.com/) website and online guides to use their provided components ([React Form](https://www.geeksforgeeks.org/react-suite-form-component/) and [React Button](https://www.geeksforgeeks.org/react-suite-button-size/)).
* Google Authentication: Like MCITCentral, we use Google Sign In as the login authenticator. We followed the directions and code examples from the [Firebase](https://firebase.google.com/docs) documentation to facilitate the login and logout process. We also followed the instructions and code from two webpages ([page 1](https://textav.gitbook.io/firebase-react-notes/auth/google-sign-in/google-sign-in-custom-domain) and [page 2](https://zachrussell.net/blog/firebase-auth-restrict-login-by-domain/)) to restrict the email domain to seas.upenn.edu.
* Use of React Icons: We used the [React Icons](https://react-icons.github.io/react-icons) library to add a thumbs up icon in our website for the upvote feature
* Use of Firestore: We followed the directions and code examples from the Firebase documentation about [Firestore](https://firebase.google.com/docs/firestore), which stores the backend data for this project.
* React and JavaScript Fundamentals: Since most of the group members were new to React and JavaScript, we used multiple resources to learn the fundamentals. We watched tutorial videos ([tutorial 1](https://www.youtube.com/watch?v=2hR-uWjBAgw) and [tutorial 2](https://www.youtube.com/watch?v=U2Wltnv-doo&list=PLpPqplz6dKxW5ZfERUPoYTtNUNvrEebAR)) and read online guides ([JavaScript var, const, let](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/), [JavaScript ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator), [JavaScript spread operator](https://www.w3schools.com/react/react_es6_spread.asp), [JavaScript regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions), [JavaScript map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [JavaScript array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [JavaScript function](https://www.w3schools.com/js/js_function_invocation.asp), [JavaScript function parameters](https://www.w3schools.com/js/js_function_parameters.asp#:~:text=Arguments%20are%20Passed%20by%20Value,change%20the%20parameter's%20original%20value.), [React key identifier](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key), [React useState](https://react.dev/reference/react/useState), [React useEffect](https://www.w3schools.com/react/react_useeffect.asp), [React onChangeCapture Event](https://www.geeksforgeeks.org/what-is-onchangecapture-event-in-reactjs/), [React CRUD](https://www.geeksforgeeks.org/how-to-do-crud-operations-in-reactjs/)).

### License

>This package is licensed under the GNU General Public License v3.0 (<a href="https://choosealicense.com/licenses/gpl-3.0/" target="_blank">GPL-3</a>).
