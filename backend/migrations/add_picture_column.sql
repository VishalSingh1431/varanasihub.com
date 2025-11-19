-- Migration: Add picture column to users table if it doesn't exist
-- Run this if you need to fix the database immediately without restarting the server

-- Check if picture column exists, if not add it
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'picture'
    ) THEN
        ALTER TABLE users ADD COLUMN picture TEXT;
        RAISE NOTICE 'Added picture column to users table';
    ELSE
        RAISE NOTICE 'picture column already exists';
    END IF;
END $$;

-- Check if google_id column exists, if not add it
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'google_id'
    ) THEN
        ALTER TABLE users ADD COLUMN google_id VARCHAR(255);
        RAISE NOTICE 'Added google_id column to users table';
    ELSE
        RAISE NOTICE 'google_id column already exists';
    END IF;
END $$;

