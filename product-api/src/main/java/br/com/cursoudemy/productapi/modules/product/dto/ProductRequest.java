package br.com.cursoudemy.productapi.modules.product.dto;

import lombok.Data;

@Data
public class ProductRequest {

    private Integer categoryId;
    private Integer supplierId;
    private Integer quantityAvailable;
    private String name;

}
