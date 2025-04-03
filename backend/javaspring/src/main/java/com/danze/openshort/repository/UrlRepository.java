package com.danze.openshort.repository;

import com.danze.openshort.model.Url;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UrlRepository extends JpaRepository<Url, String> {
    Url findByShortCode(String shortCode);
}