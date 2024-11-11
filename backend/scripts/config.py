import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Config:
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # OpenAI API key
    # MongoDB URI, fallbacks to a default if not specified
    MONGO_URI = os.getenv("MONGODB_URI")
    DB_NAME = os.getenv("DB_NAME", "CredAnalyzer")  # default database name
    ARTICLE_COLLECTION_NAME = os.getenv("COLLECTION_NAME", "articles")  # default collection name
    METADATA_COLLECTION_NAME = os.getenv("METADATA_COLLECTION_NAME", "metadata")  # default
    PORT = int(os.getenv("PORT", 5000))  # Port for web server if needed
    MAIN_URL = "https://usafacts.org/articles/category/health"
    BASE_URL = "https://usafacts.org/"
    OUTPUT_DIR = "backend/data/temp_outputs"
    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    }

def get_config():
    return Config()