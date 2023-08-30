package com.wbd.dorayakisupplier.repository;

import com.wbd.dorayakisupplier.model.entity.LogRequest;

import java.util.List;

public interface DorayakiRepository {

  int getCountOfRequestInXMinute(String ipAddress, String endpoint, int minute);

  void insertRequest(String ipAddress, String endpoint);

}
