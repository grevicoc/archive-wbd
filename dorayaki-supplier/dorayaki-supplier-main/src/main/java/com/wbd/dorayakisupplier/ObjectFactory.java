
package com.wbd.dorayakisupplier;

import com.wbd.dorayakisupplier.model.ListRecipe;
import com.wbd.dorayakisupplier.model.Recipe;
import com.wbd.dorayakisupplier.model.Request;
import com.wbd.dorayakisupplier.request.AddStockRequest;
import com.wbd.dorayakisupplier.response.AddStockResponse;
import com.wbd.dorayakisupplier.response.GetAllRecipeResponse;
import com.wbd.dorayakisupplier.response.GetStatusResponse;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.wbd.dorayakisupplier package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _IdRequest_QNAME = new QName("http://dorayakisupplier.wbd.com/", "idRequest");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.wbd.dorayakisupplier
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link GetStatusResponse }
     * 
     */
    public GetStatusResponse createGetStatusResponse() {
        return new GetStatusResponse();
    }

    /**
     * Create an instance of {@link Request }
     * 
     */
    public Request createRequest() {
        return new Request();
    }

    /**
     * Create an instance of {@link GetAllRecipeResponse }
     * 
     */
    public GetAllRecipeResponse createGetAllRecipeResponse() {
        return new GetAllRecipeResponse();
    }

    /**
     * Create an instance of {@link ListRecipe }
     * 
     */
    public ListRecipe createListRecipe() {
        return new ListRecipe();
    }

    /**
     * Create an instance of {@link AddStockResponse }
     * 
     */
    public AddStockResponse createAddStockResponse() {
        return new AddStockResponse();
    }

    /**
     * Create an instance of {@link AddStockRequest }
     * 
     */
    public AddStockRequest createAddStockRequest() {
        return new AddStockRequest();
    }

    /**
     * Create an instance of {@link Recipe }
     * 
     */
    public Recipe createRecipe() {
        return new Recipe();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Integer }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://dorayakisupplier.wbd.com/", name = "idRequest")
    public JAXBElement<Integer> createIdRequest(Integer value) {
        return new JAXBElement<Integer>(_IdRequest_QNAME, Integer.class, null, value);
    }

}
