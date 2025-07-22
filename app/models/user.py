from app.database import db

user_collection = db.get_collection("users")

async def get_user_by_email(email: str):
    return await user_collection.find_one({"email": email})

async def create_user(user_data: dict):
    result = await user_collection.insert_one(user_data)
    return str(result.inserted_id)

from bson import ObjectId

async def update_user(email: str, update_data: dict):
    result = await user_collection.update_one(
        {"email": email},
        {"$set": update_data}
    )
    return result.modified_count > 0

async def get_all_users_except(email: str):
    users_cursor = user_collection.find({"email": {"$ne": email}})
    users = []
    async for user in users_cursor:
        users.append({
            "id": str(user["_id"]),
            "name": user.get("name"),
            "email": user.get("email"),
            "bio": user.get("bio", ""),
            "profile_image": user.get("profile_image", ""),
            "skills_offered": user.get("skills_offered", []),
            "skills_needed": user.get("skills_needed", [])
        })
    return users
