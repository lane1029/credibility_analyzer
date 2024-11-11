from openai import OpenAI
import re
from datetime import datetime
import io

import os # Used to interact with the file system
import sys # Used to access system-specific parameters and functions
from config import get_config # Used to get the configuration
import json # Used to work with JSON data
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

config = get_config()

mongo_client = MongoClient(config.MONGO_URI, server_api=ServerApi('1'))
openai_client = OpenAI()

def update_vector_stores():
    """
    Update the vector stores for all articles in the database
    """
    # Get the database and collection
    db = mongo_client[config.DB_NAME]
    collection = db[config.ARTICLE_COLLECTION_NAME]

    # Get a list of all unique "content_type" attributes in the collection
    unique_content_types = collection.distinct("content_type")
    vector_stores = openai_client.beta.vector_stores.list()
    vector_store_dict = {}
    for vs in vector_stores.data:
        vector_store_dict[vs.name] = vs.id

    for content_type in unique_content_types:
        if content_type not in vector_store_dict.keys():
            print(f"Creating vector store for {content_type}")
            # vector_store = openai_client.beta.vector_stores.create(name=content_type, metadata={"last_updated": datetime.now().isoformat()})
            vector_store = openai_client.beta.vector_stores.create(name=content_type, metadata={"last_updated": datetime(2024, 11, 1).isoformat()})            

        else:
            print(f"Updating vector store for {content_type}")
            vector_store = openai_client.beta.vector_stores.retrieve(vector_store_id=vector_store_dict[content_type])
        vs_last_update = vector_store.metadata.get("last_updated")
        # Get all files with the current content type and a "date_retrieved" later than the last update
        new_files = collection.find({
            "content_type": content_type,
            "date_retrieved": {"$gt": vs_last_update}
        }).to_list()
        for file in new_files:
            file_bytes = json.dumps({
                    "article_id": file["article_id"],
                    "text_content": file["text_content"]
                }).encode('utf-8')
            file_obj = io.BytesIO(file_bytes)
            file_obj.name = f"{file["article_id"]}.json"
            uploaded_file = openai_client.files.create(
                file=file_obj,
                purpose="assistants"
                )
            vector_store_file = openai_client.beta.vector_stores.files.create(
                vector_store_id=vector_store.id,
                file_id=uploaded_file.id
                )
            print(vector_store_file)
        
    return True

if __name__ == "__main__":
    update_successful = update_vector_stores()
    if update_successful:
        print("Vector stores updated successfully.")
    else:
        print("Vector stores update failed.")