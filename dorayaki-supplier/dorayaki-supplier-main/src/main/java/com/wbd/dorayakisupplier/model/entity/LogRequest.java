package com.wbd.dorayakisupplier.model.entity;

import java.sql.Timestamp;

public class LogRequest {
  private int idLogRequest;
  private String ipAddress;
  private String endpoint;
  private Timestamp timestamp;

  public LogRequest(int idLogRequest, String ipAddress, String endpoint, Timestamp timestamp) {
    this.idLogRequest = idLogRequest;
    this.ipAddress = ipAddress;
    this.endpoint = endpoint;
    this.timestamp = timestamp;
  }

  public int getIdLogRequest() {
    return idLogRequest;
  }

  public void setIdLogRequest(int idLogRequest) {
    this.idLogRequest = idLogRequest;
  }

  public String getIpAddress() {
    return ipAddress;
  }

  public void setIpAddress(String ipAddress) {
    this.ipAddress = ipAddress;
  }

  public String getEndpoint() {
    return endpoint;
  }

  public void setEndpoint(String endpoint) {
    this.endpoint = endpoint;
  }

  public Timestamp getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(Timestamp timestamp) {
    this.timestamp = timestamp;
  }
}
