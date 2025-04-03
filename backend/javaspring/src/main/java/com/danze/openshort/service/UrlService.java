package com.danze.openshort.service;

import com.danze.openshort.model.Url;
import com.danze.openshort.repository.UrlRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UrlService {
    private final UrlRepository urlRepository;

    public String createShortUrl(String originalUrl) {
        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        url.setShortCode(UUID.randomUUID().toString().substring(0, 8));
        return urlRepository.save(url).getShortCode();
    }
}