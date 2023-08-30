package com.wbd.dorayakisupplier;

import com.wbd.dorayakisupplier.service.impl.DorayakiSupplierPortTypeImpl;

import javax.xml.ws.Endpoint;

public class DorayakiSupplierPublisher {
  public static void main(String[] args) {
    Endpoint.publish(
        "http://localhost:8080/dorayakisupplier",
        new DorayakiSupplierPortTypeImpl()
    );
  }
}
