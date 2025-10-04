/**
 * Environment initialization module
 * 
 * CRITICAL: This module MUST be imported first in the entry point
 * to ensure environment variables are loaded before any other code runs.
 */
import { config } from 'dotenv';

// Load environment variables immediately
config({ quiet: true });
