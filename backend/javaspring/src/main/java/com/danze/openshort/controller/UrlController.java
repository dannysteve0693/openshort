package com.danze.openshort.controller;

import com.danze.openshort.service.UrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.danze.openshort.dto.CreateUrlRequest;

@RestController
@RequestMapping("/api/urls")
@RequiredArgsConstructor
public class UrlController {
    private final UrlService urlService;

    @PostMapping
    public String createShortUrl(@RequestBody CreateUrlRequest request) {
        return urlService.createShortUrl(request.originalUrl());
    }
}