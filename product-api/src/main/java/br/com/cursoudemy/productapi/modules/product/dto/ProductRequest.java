package br.com.cursoudemy.productapi.modules.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ProductRequest {

    private Integer categoryId;
    private Integer supplierId;
    @JsonProperty("quantity_available")
    private Integer quantityAvailable;
    private String name;

}
