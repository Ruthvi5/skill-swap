import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("CLOUD_API_KEY"),
    api_secret=os.getenv("CLOUD_API_SECRET"),
    secure=True
)

def upload_image(file_path):
    result = cloudinary.uploader.upload(file_path)
    return result.get("secure_url")

from fastapi import UploadFile

async def upload_image_file(file: UploadFile):
    contents = await file.read()
    result = cloudinary.uploader.upload(contents, resource_type="image")
    return result["secure_url"]

