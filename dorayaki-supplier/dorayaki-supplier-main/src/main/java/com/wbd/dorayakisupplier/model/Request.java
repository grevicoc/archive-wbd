
package com.wbd.dorayakisupplier.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for request complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="request">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="idRequest" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="idRecipe" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="amount" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="status" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "request", propOrder = {
    "idRequest",
    "idRecipe",
    "amount",
    "status"
})
public class Request {

    protected int idRequest;
    protected int idRecipe;
    protected int amount;
    @XmlElement(required = true)
    protected String status;

    /**
     * Gets the value of the idRequest property.
     * 
     */
    public int getIdRequest() {
        return idRequest;
    }

    /**
     * Sets the value of the idRequest property.
     * 
     */
    public void setIdRequest(int value) {
        this.idRequest = value;
    }

    /**
     * Gets the value of the idRecipe property.
     * 
     */
    public int getIdRecipe() {
        return idRecipe;
    }

    /**
     * Sets the value of the idRecipe property.
     * 
     */
    public void setIdRecipe(int value) {
        this.idRecipe = value;
    }

    /**
     * Gets the value of the amount property.
     * 
     */
    public int getAmount() {
        return amount;
    }

    /**
     * Sets the value of the amount property.
     * 
     */
    public void setAmount(int value) {
        this.amount = value;
    }

    /**
     * Gets the value of the status property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStatus() {
        return status;
    }

    /**
     * Sets the value of the status property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStatus(String value) {
        this.status = value;
    }

}
