# CITS3403 Semester 1 2023 Project

**Anirecom**

**Anime Recommendation Bot by: 23346272 Fiona Hii, 22891996 Xavier Picart, 23484481 Victoria Felice**

## Table of Contents

- [Project Overview](https://github.com/Vobrymn/CITS3403_proj/blob/main/README.md#project-overview)

- [Installation](https://github.com/Vobrymn/CITS3403_proj/blob/main/README.md#installation)

- [Usage](https://github.com/Vobrymn/CITS3403_proj/blob/main/README.md#usage)

- [Development Process and Architecture](https://github.com/Vobrymn/CITS3403_proj/blob/main/README.md#development-process-and-architecture-including-challenges)

- [Testing and Validation](https://github.com/Vobrymn/CITS3403_proj/blob/main/README.md#testing-and-validation)

## Project Overview

Our project is an interactive anime recommendation chatbot designed to engage users by helping them discover personalized anime and manga recommendations. Users can answer questions about their preferences, including genres, themes, and authors, and once the user has provided their preference our application will generate up to 84 tailored recommendations that would align with their interests.

The website aims to be effective by providing valuable information, entertainment, and a sense of community to users. It offers various views, including an opening view that describes the application's purpose and allows users to create an account or log in. There's also a chat view where users can interact with the application, and a search view that enables users to review their history and previous interactions.

### Frontend:

We've designed a consistent visual style for all the pages, ensuring a cohesive and recognizable experience for our users, with each page thoughtfully crafted to be visually appealing and engaging while it being completely functional, user-friendly, and accessible. We've implemented it using widely supported technologies such as HTML5, CSS, and JavaScript with all the necessary resources like images and CSS stylesheets appropriately referenced. To maintain high quality, we've ensured the HTML and CSS code has undergone validation and that our website is compatible with popular browsers such as Chrome, Firefox and Microsoft Edge and offers a seamless experience on mobile devices. 

The frontend consists of the three main pages/views:

> Information view: Upon clicking on the info envelope in the start screen, there will be an information page that sets the context for users, allowing them to easily navigate through the web application and the features it has.

> Interactive Chat Page: The start button in the start screen will start the quiz where users can engage with our chatbot in a dynamic and engaging environment.

> Previous Interactions Search Page: The history page is available through the side bar and enables users to easily search and review their past interactions within the application.

### Backend:

The backend functionality of our web application is built using Flask, which we've used to created a reliable and efficient backend that seamlessly handles communication and data management. This integration enables us to provide a user-friendly and engaging experience throughout the application and having enhanced its capabilities with Ajax and DOM manipulation. Our backend includes essential features that contribute to a smooth user experience:

> User Account Creation and Tracking: With the register and log in function available, users can create their own accounts that would keep track of their activities such as history and preferences within the application.

**Utilizing database migrations, we have successfully implemented the following methods for interaction and result storage.**

> Interaction and Result Storage: Upon user submission, their responses, stored in an array, are sent as a JSON object to the server. The server processes each string and matches it with our results database and from there, only the valid results are sent back to the client.

> Search for Previous Interactions: The history feature is enabled for both registered and un-registered users by our dual storage design. For unregistered users, we store up to the 5 most recent search results during their session, providing a convenient reference. However, since this data expires with the session, while registered users have the advantage of a more permanent record; since their search history is stored in our database, it allows for unlimited access to their search history (currently limited to 18 entries on the website). This feature ensures that users can easily track and revisit their past responses and re-generate recommendations for new things to look up.

## Installation

To run the application, users need to ensure that all the necessary dependencies are installed. The dependencies are listed in the "requirements.txt" file provided with the project and once the dependencies are installed, users should navigate to the project directory in their terminal and launch the application by running the command 'python CAMS.py' which will start the application and make it accessible from the local machine.

## Usage

Upon launching the application, users will be greeted with several elements that enable interaction and navigation. The main page consists of a hamburger button on the left-hand side, a sign-in button, an info envelope button, a start button, and a home button.

Clicking the hamburger button opens a side navigation bar that offers three options: Quiz, History, and Register. Selecting the Quiz option leads users to the quiz section, where they are presented with a series of questions to answer, where some questions have an autocomplete feature to assist with responses and if users provide an invalid response, an error message will be displayed to indicate the issue. Once users have answered all desired questions, they will be directed to the suggestions page, which displays relevant anime or manga suggestions based on their answers; if users choose not to answer any questions, the system will generate random suggestions. In the event that no results match their preferences, a message indicating "No results" will be shown.

> The start button provides users with quick access to the quiz section
> The info envelope button opens a pop-up window that contains an information page. 
> The home button, available on all pages, allows users to navigate back to the home page for consistent navigation.

When users register or sign in, the navigation bar undergoes changes. The sign-in and register buttons disappear, and instead, a logout option and a settings option appear in the navigation bar. Clicking the settings option allows users to customize their color preferences for buttons and the side navigation bar. It also provides the option to change their passwords.

> The registration process opens a new page, while signing in is facilitated through a pop-up window.

The suggestions page offers additional functionality, including a quiz button that redirects users back to the start of the quiz and a refresh button that generates new suggestions based on their answers. In addition to this, the history option allows users to access their past responses where clicking on any of the past logs will lead users back to the suggestions page with newly generated suggestions. It's important to note that for non-logged-in users, the history is limited and stored only on the web history, meaning it will be lost upon refreshing the page.

With these interactive features and intuitive navigation options, our application offers users a captivating and accessible experience. Whether exploring the quiz, reviewing their history, or customizing preferences, users can navigate through the application effortlessly and discover personalized anime or manga recommendations.

## Development Process and Architecture (including challenges)
Our development process revolved around leveraging the built-in functionality of Flask to design our codebase, specifically utilizing static and template files provided by Flask for generating and rendering HTML files. To maintain organization and clarity, we implemented a basic separation between file types, such as CSS and JavaScript, allowing for clear file paths and back referencing.

For consistency across pages, we employed a system of default vs specified files, where shared or reusable JavaScript and CSS functions or designs were defined in default files that were called by multiple pages, while more specific functions or design elements were placed in files corresponding to the specific pages.

With a team of three members, we had designated members for design, JavaScript and backend (Flask) tasks, where each member took responsibility for their respective areas, enabling us to work simultaneously on different aspects of the project and providing clear direction for functionality and aesthetics. This collaborative workflow allowed us to delegate tasks, seek assistance, and have a fresh perspective from other team members whenever needed. 

The use of Git and its integration into VScode facilitated seamless collaboration, making it easy to pull and push code changes to the server. We followed a branching strategy, where each team member primarily worked on separate elements, minimizing code conflicts and maximizing development efficiency and at key milestones we would merge our branches, syncing all changes to the main branch, creating a new baseline of functionality to reference in future tasks. Main merging tasks were predominantly handled by the backend member, who ensured version compatibility due to their broad scope of the project, enabling us to safely combine features for testing and further development.

Initially, our main challenge stemmed from differences in coding styles, an unclear naming system within files, and an ambiguous DOM structure in our HTML files. The absence of clear conventions for classes and IDs resulted in multiple referencing and re-referencing in our CSS. Moreover, the structure of our HTML elements, such as hidden containers for storing elements, posed difficulties during the initial testing and required extensive trial and error. This issue became more pronounced when dynamically adjusting specific elements, as it necessitated additional JavaScript to accommodate for the peculiarities, occasionally requiring the creation of new elements to achieve the intended functionality.

However, we successfully addressed these challenges by establishing guidelines for new element construction, enabling the use of standardized building blocks and mitigating the issue. Additionally, we resolved complications arising from conflicting styles between the two main JavaScript developers, resulting in a more consistent and cohesive codebase. Recognizing the need for modularization and function creation, we restructured our codebase to promote better organization and facilitate the integration of subsequent features. Through our collective efforts and a commitment to continuous improvement, we successfully resolved these issues and achieved a more streamlined and harmonious development process. 

## Testing and Validation

To ensure the reliability and correctness of our application, we conducted thorough testing using the unittest library. Our testing approach involved verifying good requests between the client and server by examining the handling of various requests and we also assessed the visual aspects of our application by running tests on a live development server.

We made the deliberate choice to avoid using selenium testing, but instead prioritized confirming the visual changes and interactions using the live server, as we believed this approach to be more efficient and aligned with our development goals.

All our tests are located in the designated 'tests' folder and can be executed by running the command 'python -m test_name.py in the terminal. These tests serve as a crucial part of our development process, ensuring that our application functions as intended and upholds high standards of quality and performance.

We have placed significant emphasis on ensuring the quality and adherence to standards of our HTML and CSS code. To achieve this, we've utilized an online validator tool to assess the validity and correctness of our HTML and CSS files.

By validating our code, we aimed to guarantee compliance with web standards, enhance cross-browser compatibility, and promote a robust and error-free user experience which involved identifying and rectifying any issues or errors reported by the validator tool.

As a result of our diligent validation efforts, we can confidently state that all our HTML and CSS code successfully passed the validator tests. This commitment to code quality and standards compliance has helped us ensure a smooth and flawless user interface across various web browsers and devices.

All our tests are located in the designated 'tests' folder and can be executed by running the command 'python -m test_name.py in the terminal. These tests serve as a crucial part of our development process, ensuring that our application functions as intended and upholds high standards of quality and performance.
