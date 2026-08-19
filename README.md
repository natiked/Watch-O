# 🎬 Movie Discovery App
Watch-O is a movie discovery responsive website that helps you look up your favorite movies and know a bit more about them. 


<img width="1342" height="696" alt="image" src="https://github.com/user-attachments/assets/45ba6b94-9478-4781-a026-392bc639d929" />

[Check it out live](https://watch-o-sandy.vercel.app/)

---

## ✨ Features
Currently it has the following features:
-** Trending Movies : Fetches trending movies automatically from the TMDB API
-** Movie search : It allows searching for any movies available on TMDB
-** Detailed Description : The website provides a detailed description for specific movies selected by the use
-** Smooth animations : I've used Tailwind CSS to allow a smooth navigation and usage of the website

---

## 🛠️ Tech Stack

- **Frontend:** React
- **Routing:** React Router v6
- **Styling:** Tailwind CSS

---

## How to use 
To run this project you'll need Node.js installed on your device. After installing node and cloning this repo run the following commands:
 - npm install
 - npm run dev
You'll need to get you're own API key from TMDB and save it inside a .env file. The API Key should be stored with the variable name RAT.

## My thought process
I wanted to build this project because I really like watching movies. I thought it would be cool to build something that would help me find trending movies easily and look up movies that I have in mind. It is my first project to be built with react, react router, and tailwind. 

# How it works
It uses 2 page layouts and 1 dynamic component that fetches trending and searched movies. I used the useEffect hook to dynamically display the list of movies depending on whether the user searched for a movie or just wants trending movies. I implemented React router to handle dynamic parameters in the routes visited. TMDB provides an excellent documentation on how to use it's API which came in very handy during my development process.  

Leave a star if you like the project !
