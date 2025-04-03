-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$'),
    password_hash VARCHAR(60), -- BCrypt
    email_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Authentication Methods
CREATE TABLE auth_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(20) NOT NULL CHECK (provider IN ('google', 'password', 'github')),
    provider_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (provider, provider_id)
);

-- URLs Table
CREATE TABLE urls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    short_code VARCHAR(10) NOT NULL UNIQUE CHECK (short_code ~ '^[a-zA-Z0-9]{6,10}$'),
    original_url TEXT NOT NULL CHECK (original_url ~ '^https?://[^\s/$.?#].[^\s]*$'),
    clicks INT DEFAULT 0,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clicks Analytics
CREATE TABLE clicks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url_id UUID NOT NULL REFERENCES urls(id) ON DELETE CASCADE,
    country_code CHAR(2) CHECK (country_code ~ '^[A-Z]{2}$'),
    device_type VARCHAR(20),
    clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_urls_user ON urls(user_id);
CREATE INDEX idx_urls_short_code ON urls(short_code);
CREATE INDEX idx_clicks_url ON clicks(url_id);