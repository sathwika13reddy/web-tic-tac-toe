<%@ page import="java.sql.*" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String player1 = request.getParameter("player1");
    String player2 = request.getParameter("player2");
    String winner = request.getParameter("winner");

    Connection conn = null;
    PreparedStatement stmt = null;

    try {
        // Load Oracle JDBC driver
        Class.forName("oracle.jdbc.driver.OracleDriver");

        // Connect to Oracle DB
        conn = DriverManager.getConnection(
            "jdbc:oracle:thin:@localhost:1521:ORCL", 
            "scott", 
            "tiger"
        );

        // Prepare SQL insert statement
        String sql = "INSERT INTO scores (player1_name, player2_name, winner) VALUES (?, ?, ?)";
        stmt = conn.prepareStatement(sql);
        stmt.setString(1, player1);
        stmt.setString(2, player2);
        stmt.setString(3, winner);

        // Execute update
        int rowsInserted = stmt.executeUpdate();

        if (rowsInserted > 0) {
            out.println("Score saved successfully!");
        } else {
            out.println("Failed to save the score.");
        }
    } catch (Exception e) {
        out.println("Error: " + e.getMessage());
    } finally {
        try {
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        } catch (SQLException ex) {
            out.println("Error closing resources: " + ex.getMessage());
        }
    }
%>
