
package com.wbd.dorayakisupplier.service;

import com.wbd.dorayakisupplier.ObjectFactory;
import com.wbd.dorayakisupplier.request.AddStockRequest;
import com.wbd.dorayakisupplier.response.AddStockResponse;
import com.wbd.dorayakisupplier.response.GetAllRecipeResponse;
import com.wbd.dorayakisupplier.response.GetStatusResponse;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.bind.annotation.XmlSeeAlso;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.9-b130926.1035
 * Generated source version: 2.2
 * 
 */
@WebService(name = "DorayakiSupplierPortType", targetNamespace = "http://dorayakisupplier.wbd.com/")
@SOAPBinding(parameterStyle = SOAPBinding.ParameterStyle.BARE)
@XmlSeeAlso({
    ObjectFactory.class
})
public interface DorayakiSupplierPortType {


    /**
     * 
     * @param parameters
     * @return
     *     returns com.wbd.dorayakisupplier.AddStockResponse
     */
    @WebMethod(action = "http://dorayakisupplier.wbd.com/addStock")
    @WebResult(name = "addStockResponse", targetNamespace = "http://dorayakisupplier.wbd.com/", partName = "parameters")
    public AddStockResponse addStock(
        @WebParam(name = "addStockRequest", targetNamespace = "http://dorayakisupplier.wbd.com/", partName = "parameters") AddStockRequest parameters);

    /**
     * 
     * @return
     *     returns com.wbd.dorayakisupplier.GetAllRecipeResponse
     */
    @WebMethod(action = "http://dorayakisupplier.wbd.com/getAllRecipe")
    @WebResult(name = "getAllRecipeResponse", targetNamespace = "http://dorayakisupplier.wbd.com/", partName = "parameters")
    public GetAllRecipeResponse getAllRecipe();

    /**
     * 
     * @param parameters
     * @return
     *     returns com.wbd.dorayakisupplier.GetStatusResponse
     */
    @WebMethod(action = "http://dorayakisupplier.wbd.com/getStatusRequest")
    @WebResult(name = "getStatusResponse", targetNamespace = "http://dorayakisupplier.wbd.com/", partName = "parameters")
    public GetStatusResponse getStatusRequest(
        @WebParam(name = "idRequest", targetNamespace = "http://dorayakisupplier.wbd.com/", partName = "parameters")
        int parameters);

}