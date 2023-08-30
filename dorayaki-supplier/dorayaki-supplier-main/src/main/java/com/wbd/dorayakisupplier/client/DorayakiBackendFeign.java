package com.wbd.dorayakisupplier.client;

import com.wbd.dorayakisupplier.model.ListRecipe;
import com.wbd.dorayakisupplier.model.Request;
import com.wbd.dorayakisupplier.request.AddStockRequest;

public interface DorayakiBackendFeign {
  Request addStock(AddStockRequest addStockRequest);
  ListRecipe getAllRecipe();
  Request getStatusRequest(int id_request);
}
