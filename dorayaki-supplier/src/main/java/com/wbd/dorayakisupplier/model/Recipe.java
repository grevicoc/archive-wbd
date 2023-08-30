
package com.wbd.dorayakisupplier.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for recipe complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="recipe">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="idRecipe" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="recipeName" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "recipe", propOrder = {
    "idRecipe",
    "recipeName"
})
public class Recipe {

    protected int idRecipe;
    @XmlElement(required = true)
    protected String recipeName;

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
     * Gets the value of the recipeName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRecipeName() {
        return recipeName;
    }

    /**
     * Sets the value of the recipeName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRecipeName(String value) {
        this.recipeName = value;
    }

}
