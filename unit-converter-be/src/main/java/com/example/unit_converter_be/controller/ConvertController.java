/*
 * ConvertController.java
 *
 * Copyright (c) 2025 Nguyen. All rights reserved.
 * This software is the confidential and proprietary information of Nguyen.
 */

package com.example.unit_converter_be.controller;

import com.example.unit_converter_be.service.UnitConverterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * ConvertController.java
 *
 * @author Nguyen
 */
@RestController
@RequestMapping("/api/convert")
@CrossOrigin(origins = "http://localhost:3000")
public class ConvertController {
    @Autowired
    private UnitConverterService service;

    @GetMapping
    public Map<String, Object> convert(
            @RequestParam double value,
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam String type
    ) {
        double result;

        switch (type) {
            case "length" -> result = service.convertLength(value, from, to);
            case "weight" -> result = service.convertWeight(value, from, to);
            case "temperature" -> result = service.convertTemperature(value, from, to);
            default -> throw new IllegalArgumentException("Invalid type");
        }

        return Map.of(
                "value", value,
                "from", from,
                "to", to,
                "result", result
        );
    }
}
