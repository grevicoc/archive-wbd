package com.wbd.dorayakisupplier.service.impl;

import com.sun.net.httpserver.HttpExchange;
import com.sun.xml.internal.ws.developer.JAXWSProperties;
import com.wbd.dorayakisupplier.client.DorayakiBackendFeign;
import com.wbd.dorayakisupplier.client.impl.DorayakiBackendFeignImpl;
import com.wbd.dorayakisupplier.model.ListRecipe;
import com.wbd.dorayakisupplier.model.Request;
import com.wbd.dorayakisupplier.repository.DorayakiRepository;
import com.wbd.dorayakisupplier.repository.impl.DorayakiRepositoryImpl;
import com.wbd.dorayakisupplier.request.AddStockRequest;
import com.wbd.dorayakisupplier.response.AddStockResponse;
import com.wbd.dorayakisupplier.response.GetAllRecipeResponse;
import com.wbd.dorayakisupplier.response.GetStatusResponse;
import com.wbd.dorayakisupplier.service.DorayakiSupplierPortType;

import javax.annotation.Resource;
import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.xml.ws.WebServiceContext;
import javax.xml.ws.handler.MessageContext;
import java.net.InetSocketAddress;

@WebService(
    name = "DorayakiSupplierPortType",
    endpointInterface = "com.wbd.dorayakisupplier.service.DorayakiSupplierPortType",
    targetNamespace = "http://dorayakisupplier.wbd.com/")
public class DorayakiSupplierPortTypeImpl implements DorayakiSupplierPortType {

  private final int thresholdRequest = 10;
  private final DorayakiRepository dorayakiRepository = new DorayakiRepositoryImpl();
  private final DorayakiBackendFeign dorayakiBackendFeign = new DorayakiBackendFeignImpl();

  @Resource
  private WebServiceContext wsContext;

  @WebMethod
  public AddStockResponse addStock(AddStockRequest parameters) {
    if (isEligibleRequest()){
      //terima request dari toko, harusnya udah ada di dalem parameters
      //lanjutin request ke backend nodejs
      //terima response dari backend nodejs (idrequest, idresep, jumlah, status)
      //compose response dari backend nodejs tadi ke dalem AddStockResponse
      //return hasil compose

      AddStockResponse retval = new AddStockResponse();
      retval.setCode(200);
      retval.setMessage("Success!");
      retval.setData(dorayakiBackendFeign.addStock(parameters));  // <-- isi di sini harusnya

      return retval;
    }
    AddStockResponse retval = new AddStockResponse();
    retval.setCode(400);
    retval.setMessage("Error! Your request exceed limit.");
    retval.setData(null);
    return retval;
  }

  @WebMethod
  public GetAllRecipeResponse getAllRecipe() {
    if (isEligibleRequest()){
      //request ke backend nodejs
      //terima response dari backend node js berupa kumpulan idresep dan namaresep
      //compose ke dalem GetAllRecipeResponse
      //return hasil compose
      GetAllRecipeResponse retval = new GetAllRecipeResponse();
      retval.setCode(200);
      retval.setMessage("Success!");
      retval.setData(dorayakiBackendFeign.getAllRecipe());   //<-- isi di sini  harusnya
      return retval;
    }
    GetAllRecipeResponse retval = new GetAllRecipeResponse();
    retval.setCode(400);
    retval.setMessage("Error! Your request exceed limit.");
    retval.setData(null);
    return retval;
  }

  @WebMethod
  public GetStatusResponse getStatusRequest(int parameters) {
    if (isEligibleRequest()){
      //request ke backend nodejs getStatusRequestById dengan parameter dari parameters
      //terima response dari backend nodejs berupa idrequest, idresep, jumlah, status
      //compose response tersebut ke dalem GetStatusResponse
      //return hasil compose
      GetStatusResponse retval = new GetStatusResponse();
      retval.setCode(200);
      retval.setMessage("Success!");
      retval.setData(dorayakiBackendFeign.getStatusRequest(parameters));    //<-- harusnya isi di sini
      return retval;
    }
    GetStatusResponse retval = new GetStatusResponse();
    retval.setCode(400);
    retval.setMessage("Error! Your request exceed limit.");
    retval.setData(null);
    return retval;
  }

  private boolean isEligibleRequest(){
    MessageContext msgx = wsContext.getMessageContext();
    HttpExchange exchange = (HttpExchange)msgx.get(JAXWSProperties.HTTP_EXCHANGE);
    InetSocketAddress remoteAddress = exchange.getRemoteAddress();

    //get IP Address
    String ipAddress = remoteAddress.getAddress().getHostAddress();
    //get endpoint
    String endpoint = exchange.getRequestURI().getPath();

//    System.out.println(ipAddress);
//    System.out.println(endpoint);

    int countRequestSoFar = dorayakiRepository.getCountOfRequestInXMinute(ipAddress,endpoint,1);
    if (countRequestSoFar<thresholdRequest){
      dorayakiRepository.insertRequest(ipAddress,endpoint);
      return true;
    }
    return false;
  }
}
