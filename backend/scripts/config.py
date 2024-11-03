import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Config:
    # MongoDB URI, fallbacks to a default if not specified
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    DB_NAME = os.getenv("DB_NAME", "mydatabase")  # default database name
    PORT = int(os.getenv("PORT", 5000))  # Port for web server if needed
    MAIN_URL = "https://usafacts.org/articles/category/health"
    BASE_URL = "https://usafacts.org/"
    OUTPUT_DIR = "backend/data/temp_outputs"
    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    }

def get_config():
    return Config()