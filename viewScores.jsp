<%@ page import="java.sql.*" %>
<html>
<head>
  <title>Scoreboard</title>
  <style>
    body {
      background-color: #0d0d0d;
      color: #0ff;
      font-family: 'Orbitron', sans-serif;
      text-align: center;
      padding: 40px;
    }

    table {
      margin: 0 auto;
      border-collapse: collapse;
      width: 80%;
      box-shadow: 0 0 20px #0ff;
    }

    th, td {
      padding: 12px;
      border: 1px solid #0ff;
    }

    th {
      background-color: #111;
      color: #0ff;
    }

    tr:nth-child(even) {
      background-color: #1a1a1a;
    }

    tr:hover {
      background-color: #333;
    }

    h1 {
      margin-bottom: 20px;
      text-shadow: 0 0 10px #0ff;
    }
  </style>
</head>
<body>
  <h1>🎮 Game Scoreboard</h1>
  <%
    try {
      Class.forName("oracle.jdbc.driver.OracleDriver");
      Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:ORCL", "scott", "tiger");
      Statement stmt = conn.createStatement();
      ResultSet rs = stmt.executeQuery("SELECT * FROM scores ORDER BY id DESC");
  %>
  <table>
    <tr>
      <th>ID</th>
      <th>Player 1</th>
      <th>Player 2</th>
      <th>Winner</th>
    </tr>
    <%
      while (rs.next()) {
    %>
    <tr>
      <td><%= rs.getInt("id") %></td>
      <td><%= rs.getString("player1_name") %></td>
      <td><%= rs.getString("player2_name") %></td>
      <td><%= rs.getString("winner") %></td>
    </tr>
    <% } %>
  </table>
  <%
      conn.close();
    } catch (Exception e) {
      out.println("Error: " + e.getMessage());
    }
  %>
</body>
</html>
