from fastapi import APIRouter, HTTPException, status,UploadFile,File,Form
from typing import Optional
from app.schemas.user_schema import UserRegister, UserLogin, UserOut,UserUpdate
from app.models.user import get_user_by_email, create_user, update_user
from app.utils.auth import hash_password, verify_password, create_access_token
from app.utils.cloudinary_utils import upload_image_file


router = APIRouter(prefix="/api", tags=["User"])

@router.post("/register")
async def register(user: UserRegister):
    existing = await get_user_by_email(user.email)
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_pwd = hash_password(user.password)
    user_dict = {
        "name": user.name,
        "email": user.email,
        "password": hashed_pwd,
        "location": user.location,
        "about": user.about,
        "availability": user.availability,
        "skills_offered": user.skills_offered,
        "skills_wanted": user.skills_wanted,
    }

    user_id = await create_user(user_dict)
    return {"message": "User registered", "user_id": user_id}


@router.post("/login")
async def login(user: UserLogin):
    db_user = await get_user_by_email(user.email)
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": db_user["email"]})
    return {"access_token": token, "token_type": "bearer"}


print("User router loaded")

from app.utils.auth import get_current_user
from fastapi import Depends

@router.get("/me")
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    return {
        "id": str(current_user["_id"]),
        "name": current_user["name"],
        "email": current_user["email"]
    }




@router.put("/update-profile")
async def update_profile(
    name: Optional[str] = Form(None),
    bio: Optional[str] = Form(None),
    skills_offered: Optional[str] = Form(None),
    skills_needed: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    current_user: dict = Depends(get_current_user)
):
    update_data = {}

    if name: update_data["name"] = name
    if bio: update_data["bio"] = bio
    if skills_offered:
        update_data["skills_offered"] = [s.strip() for s in skills_offered.split(",")]
    if skills_needed:
        update_data["skills_needed"] = [s.strip() for s in skills_needed.split(",")]

    if image:
        image_url = await upload_image_file(image)
        update_data["profile_image"] = image_url

    success = await update_user(current_user["email"], update_data)

    if success:
        return {"message": "Profile updated"}
    else:
        raise HTTPException(status_code=400, detail="Update failed")

from app.models.user import get_all_users_except

@router.get("/users")
async def list_users(current_user: dict = Depends(get_current_user)):
    users = await get_all_users_except(current_user["email"])
    return {"users": users}
