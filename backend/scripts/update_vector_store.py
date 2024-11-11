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
openai_client = OpenAI(api_key=config.OPENAI_API_KEY)

def get_vector_store_id_dict():
    """
    Get the vector store ID for a given content type
    """
    vector_stores = openai_client.beta.vector_stores.list()
    vector_store_dict = {}
    for vs in vector_stores.data:
        vector_store_dict[vs.name] = vs.id
    return vector_store_dict

def retrieve_vector_store(content_type, vector_store_dict):
    """
    Retrieve the vector store for a given content type
    """
    if content_type in vector_store_dict.keys():
        vector_store = openai_client.beta.vector_stores.retrieve(vector_store_id=vector_store_dict[content_type])
        return vector_store
    else:
        # vector_store = openai_client.beta.vector_stores.create(name=content_type, metadata={"last_updated": datetime.now().isoformat(), "total_files": 0})
        vector_store = openai_client.beta.vector_stores.create(name=content_type, metadata={"last_updated": datetime(2024, 11, 10).isoformat(), "total_files": "0"})
        return vector_store
    
def add_file_to_vector_store(file_content, vector_store_id):
    """
    Add a file to a vector store
    """
    file_bytes = json.dumps({
            "article_id": file_content["article_id"],
            "text_content": file_content["text_content"]
        }).encode('utf-8')
    file_obj = io.BytesIO(file_bytes)
    file_obj.name = f"{file_content["article_id"]}.json"
    uploaded_file = openai_client.files.create(
        file=file_obj,
        purpose="assistants"
        )
    vector_store_file = openai_client.beta.vector_stores.files.create(
        vector_store_id=vector_store_id,
        file_id=uploaded_file.id
        )
    return vector_store_file

def update_vector_stores():
    """
    Update the vector stores for all articles in the database
    """
    # Get the database and collection
    db = mongo_client[config.DB_NAME]
    collection = db[config.ARTICLE_COLLECTION_NAME]

    vector_store_dict = get_vector_store_id_dict()

    for content_type in collection.distinct("content_type"):
        vector_store = retrieve_vector_store(content_type, vector_store_dict)
        vs_last_update = vector_store.metadata.get("last_updated")
        # Get all files with the current content type and a "date_retrieved" later than the last update
        new_files = collection.find({
            "content_type": content_type,
            "date_retrieved": {"$gt": vs_last_update}
        }).to_list()
        if len(new_files) == 0:
            print(f"No new files found")
        else:
            vs_total_files = int(vector_store.metadata.get("total_files"))
            vs_total_files += len(new_files)
            print(f"Updating {len(new_files)} files")
            for file in new_files:
                vector_store_file = add_file_to_vector_store(file, vector_store.id)
            vector_store = openai_client.beta.vector_stores.update(
                    vector_store_id=vector_store.id,
                    metadata={"last_updated": datetime.now().isoformat(), "total_files": str(vs_total_files)}
                )
        
    return True

if __name__ == "__main__":
    update_successful = update_vector_stores()
    if update_successful:
        sys.stdout.write("Vector stores updated successfully.\n")
    else:
        sys.stderr.write("Vector store update failed.\n")