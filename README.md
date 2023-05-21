# CITS3403 Semester 1 2023 Project

**By 23346272 Fiona Hii, 22891996 Xavier Picart, 23484481 Victoria Felice**

##Project Overview

Our project is an interactive anime recommendation chatbot designed to engage users by helping them discover personalized anime and manga recommendations. Users can answer questions about their preferences, including genres, themes, and authors, and once the user has provided their preference our application will generate up to 64 tailored recommendations that would align with their interests.

The website aims to be effective by providing valuable information, entertainment, and a sense of community to users. It offers various views, including an opening view that describes the application's purpose and allows users to create an account or log in. There's also a chat view where users can interact with the application, and a search view that enables users to review their history and previous interactions.

**Frontend:**

We've designed a consistent visual style for all the pages, ensuring a cohesive and recognizable experience for our users, with each page thoughtfully crafted to be visually appealing and engaging while it being completely functional, user-friendly, and accessible. We've implemented it using widely supported technologies such as HTML5, CSS, and JavaScript with all the necessary resources like images and CSS stylesheets appropriately referenced. To maintain high quality, we've ensured the HTML and CSS code has undergone validation and that our website is compatible with popular browsers such as Chrome, Firefox and Microsoft Edge and offers a seamless experience on mobile devices. 
The frontend consists of the three main pages/views:

> Information view: Upon clicking on the info envelope in the start screen, there will be an information page that sets the context for users, allowing them to easily navigate through the web application and the features it has.

> Interactive Chat Page: The start button in the start screen will start the quiz where users can engage with our chatbot in a dynamic and engaging environment.

> Previous Interactions Search Page: The history page is available through the side bar and enables users to easily search and review their past interactions within the application.

**Backend:**

The backend functionality of our web application is built using Flask, which we've used to created a reliable and efficient backend that seamlessly handles communication and data management. This integration enables us to provide a user-friendly and engaging experience throughout the application and having enhanced its capabilities with Ajax and DOM manipulation. Our backend includes essential features that contribute to a smooth user experience:

> User Account Creation and Tracking: With the register and log in function available, users can create their own accounts that would keep track of their activities such as history and preferences within the application.

Utilizing database migrations, we have successfully implemented the following methods for interaction and result storage.

> Interaction and Result Storage: Upon user submission, their responses, stored in an array, are sent as a JSON object to the server. The server processes each string and matches it with our results database and from there, only the valid results are sent back to the client.

> Search for Previous Interactions: The history feature is available to both logged in and guests, since 
