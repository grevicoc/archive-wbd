package com.wbd.dorayakisupplier.client.impl;

import com.wbd.dorayakisupplier.client.DorayakiBackendFeign;
import com.wbd.dorayakisupplier.model.ListRecipe;
import com.wbd.dorayakisupplier.model.Recipe;
import com.wbd.dorayakisupplier.model.Request;
import com.wbd.dorayakisupplier.request.AddStockRequest;
import org.apache.commons.io.IOUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class DorayakiBackendFeignImpl implements DorayakiBackendFeign{

  private final String endpointBackend = "http://localhost:3000";

  @Override
  public Request addStock(AddStockRequest addStockRequest) {
    CloseableHttpClient client = HttpClients.createDefault();
    HttpPost httpPost = new HttpPost(endpointBackend+"/request/add");
    String jsonBodyRequest = "{\"id_recipe\": " + addStockRequest.getIdRecipe() +
        ", \"amount\": " + addStockRequest.getAmount() + "}";
    try{
      StringEntity entity = new StringEntity(jsonBodyRequest);
      httpPost.setEntity(entity);
      httpPost.setHeader("Accept","application/json");
      httpPost.setHeader("Content-type","application/json");

      CloseableHttpResponse response = client.execute(httpPost);
      String stringResponse = IOUtils.toString(response.getEntity().getContent(), "UTF-8");
      JSONObject jsonObject = new JSONObject(stringResponse);

      Request retval = new Request();
      retval.setIdRequest(jsonObject.getJSONObject("data").getInt("id_request"));
      retval.setIdRecipe(jsonObject.getJSONObject("data").getInt("id_recipe"));
      retval.setAmount(jsonObject.getJSONObject("data").getInt("amount"));
      retval.setStatus(jsonObject.getJSONObject("data").getString("status"));

      return retval;
    }catch (Exception e){
      throw new Error(e.getMessage());
    }
  }

  @Override
  public ListRecipe getAllRecipe() {
    CloseableHttpClient client = HttpClients.createDefault();
    HttpGet httpGet = new HttpGet(endpointBackend+"/resep/allResep");

    try{
      CloseableHttpResponse response = client.execute(httpGet);

      String stringResponse = IOUtils.toString(response.getEntity().getContent(), "UTF-8");
      JSONObject jsonObject = new JSONObject(stringResponse);
      JSONArray result = jsonObject.getJSONArray("results");
      ListRecipe retval = new ListRecipe();
      List<Recipe> recipes = new ArrayList<>();
      for (int i = 0; i < result.length(); i++) {
        JSONObject temp = result.getJSONObject(i);
        Recipe newRecipe = new Recipe();
        newRecipe.setIdRecipe(temp.getInt("id_resep"));
        newRecipe.setRecipeName(temp.getString("nama_resep"));
        recipes.add(newRecipe);
      }

      retval.setRecipes(recipes);

      return retval;
    }catch (Exception e){
      throw new Error(e.getMessage());
    }
  };

  @Override
  public Request getStatusRequest(int id_request) {
    CloseableHttpClient client = HttpClients.createDefault();
    HttpGet httpGet = new HttpGet(endpointBackend+"/request/"+id_request);

    try{
      CloseableHttpResponse response = client.execute(httpGet);
      String stringResponse = IOUtils.toString(response.getEntity().getContent(), "UTF-8");
      JSONObject jsonObject = new JSONObject(stringResponse);

      Request retval = new Request();
      retval.setIdRequest(jsonObject.getJSONObject("data").getInt("id_request"));
      retval.setIdRecipe(jsonObject.getJSONObject("data").getInt("id_recipe"));
      retval.setAmount(jsonObject.getJSONObject("data").getInt("amount"));
      retval.setStatus(jsonObject.getJSONObject("data").getString("status"));

      return retval;
    }catch (Exception e){
      throw new Error(e.getMessage());
    }
  }


}
