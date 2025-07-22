from app.database import db
from bson import ObjectId
from datetime import datetime

swap_collection = db.get_collection("swaps")

async def send_swap_request(from_email, to_email):
    request = {
        "from_email": from_email,
        "to_email": to_email,
        "status": "pending",  # "accepted" or "rejected"
        "timestamp": datetime.utcnow()
    }
    existing = await swap_collection.find_one({
        "from_email": from_email,
        "to_email": to_email,
        "status": "pending"
    })
    if existing:
        return None  # prevent duplicate pending request

    result = await swap_collection.insert_one(request)
    return str(result.inserted_id)

async def get_swap_requests(email):
    incoming_cursor = swap_collection.find({"to_email": email})
    outgoing_cursor = swap_collection.find({"from_email": email})
    
    incoming = []
    async for req in incoming_cursor:
        incoming.append({**req, "_id": str(req["_id"])})
    
    outgoing = []
    async for req in outgoing_cursor:
        outgoing.append({**req, "_id": str(req["_id"])})
    
    return incoming, outgoing

async def update_swap_status(swap_id, new_status):
    result = await swap_collection.update_one(
        {"_id": ObjectId(swap_id)},
        {"$set": {"status": new_status}}
    )
    return result.modified_count > 0
