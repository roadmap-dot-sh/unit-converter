/*
 * UnitConverterService.java
 *
 * Copyright (c) 2025 Nguyen. All rights reserved.
 * This software is the confidential and proprietary information of Nguyen.
 */

package com.example.unit_converter_be.service;

import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * UnitConverterService.java
 *
 * @author Nguyen
 */
@Service
public class UnitConverterService {
    private static final Map<String, Double> LENGTH = Map.of(
            "mm", 0.001,
            "cm", 0.01,
            "m", 1.0,
            "km", 1000.0,
            "inch", 0.0254,
            "ft", 0.3048,
            "yard", 0.9144,
            "mile", 1609.34
    );

    private static final Map<String, Double> WEIGHT = Map.of(
            "mg", 0.001,
            "g", 1.0,
            "kg", 1000.0,
            "oz", 28.3495,
            "lb", 453.592
    );

    public double convertLength(double value, String from, String to) {
        return value * LENGTH.get(from) / LENGTH.get(to);
    }

    public double convertWeight(double value, String from, String to) {
        return value * WEIGHT.get(from) / WEIGHT.get(to);
    }

    public double convertTemperature(double value, String from, String to) {
        double celsius = switch (from) {
            case "C" -> value;
            case "F" -> (value - 32) * 5 / 9;
            case "K" -> value - 273.15;
            default -> throw new IllegalArgumentException();
        };

        return switch (to) {
            case "C" -> celsius;
            case "F" -> celsius * 9 / 5 + 32;
            case "K" -> celsius + 273.15;
            default -> throw new IllegalArgumentException();
        };
    }
}
