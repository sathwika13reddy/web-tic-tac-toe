# Tic Tac Toe Web App

A web-based Tic Tac Toe game built using JSP, JDBC, and Oracle DB. This project allows two players to compete, enter their names, and view a scoreboard that stores and displays match history using database integration.

## ✨ Features
- 🎯 Player name input
- 🏆 Score tracking and persistence
- 📜 View scoreboard stored in Oracle DB
- 🔄 Reset board for new games
- 🎮 Human vs Human game mode
- 🖥️ Clean, responsive UI

## 🛠️ Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Java Server Pages (JSP)
- **Database:** Oracle DB with JDBC

## 🚀 How to Run
1. Clone the repository or download the ZIP.
2. Open the project in Eclipse or your preferred Java IDE.
3. Set up Oracle DB:
   - Create a table to store player names and scores.
   - Update JDBC connection details in your `.jsp` files.
4. Deploy the project on Apache Tomcat.
5. Run in your browser and enjoy the game!

## 🗃️ Database Table Structure (Example)
```sql
CREATE TABLE scoreboard (
    id NUMBER GENERATED ALWAYS AS IDENTITY,
    player1 VARCHAR2(100),
    player2 VARCHAR2(100),
    winner VARCHAR2(100),
    played_on DATE DEFAULT SYSDATE
);
