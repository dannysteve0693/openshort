package com.danze.openshort.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/db-check")
    public ResponseEntity<String> checkDbConnection() {
        try (Connection conn = dataSource.getConnection()) {
            return ResponseEntity.ok("✅ Database connected! " +
                    conn.getMetaData().getDatabaseProductName() +
                    " v" + conn.getMetaData().getDatabaseProductVersion());
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("❌ Connection failed: " + e.getMessage());
        }
    }

    @GetMapping("/db-aa")
    public ResponseEntity<String> checkDanzeDbConnection() {
        try (Connection conn = dataSource.getConnection()) {
            return ResponseEntity.ok("✅ Database connected! " +
                    conn.getMetaData().getDatabaseProductName() +
                    " v" + conn.getMetaData().getDatabaseProductVersion());
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("❌ Connection failed: " + e.getMessage());
        }
    }

}