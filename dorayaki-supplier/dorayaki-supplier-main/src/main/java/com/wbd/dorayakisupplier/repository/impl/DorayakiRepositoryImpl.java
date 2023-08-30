package com.wbd.dorayakisupplier.repository.impl;

import com.wbd.dorayakisupplier.model.entity.LogRequest;
import com.wbd.dorayakisupplier.repository.DorayakiRepository;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.sql.Statement;

public class DorayakiRepositoryImpl implements DorayakiRepository {

  private final String url = "jdbc:mysql://localhost:3306/pabrikdorayaki";
  private final String user = "root";
  private final String password = "root";
  private Connection connection;

  @Override
  public int getCountOfRequestInXMinute(String ipAddress, String endpoint, int minute) {
    openConnection();
    String substractTime = "0 0:"+ minute +":0";
    String query = "SELECT COUNT(*) FROM log_request WHERE ip_address = ? AND endpoint = ? AND "
        + "timestamp > SUBTIME(CURTIME(), ?)";
    try{
      PreparedStatement preparedStatement = this.connection.prepareStatement(query);
      preparedStatement.setString(1,ipAddress);
      preparedStatement.setString(2,endpoint);
      preparedStatement.setString(3,substractTime);
      ResultSet resultSet = preparedStatement.executeQuery();

      resultSet.next();
      int retval = resultSet.getInt(1);
      closeConnection(preparedStatement);

      return retval;
    }catch (SQLException e){
      throw new Error("Problem", e);
    }
  }

  @Override
  public void insertRequest(String ipAddress, String endpoint) {
    openConnection();
    String query = "INSERT INTO log_request (ip_address,endpoint,timestamp) VALUES (?,?,CURTIME())";
    try{
      PreparedStatement preparedStatement = this.connection.prepareStatement(query);
      preparedStatement.setString(1,ipAddress);
      preparedStatement.setString(2,endpoint);
      preparedStatement.executeUpdate();
      closeConnection(preparedStatement);
    }catch (SQLException e){
      throw new Error("Problem", e);
    }
  }

  private void openConnection(){
    try{
      this.connection = DriverManager.getConnection(url,user,password);
      System.out.println("Database succesfully connected!");
    }catch (SQLException e){
      throw new Error("Problem", e);
    }
  }

  private void closeConnection(Statement statement){
    try{
      statement.close();
      this.connection.close();
    }catch (SQLException e){
      throw new Error("Problem", e);
    }
  }
}
