from fastapi import APIRouter, Depends, HTTPException
from app.models import swap
from app.schemas.swap_schema import SwapRequestCreate, SwapStatusUpdate
from app.utils.auth import get_current_user
from app.models.swap import send_swap_request, get_swap_requests, update_swap_status

router = APIRouter(prefix="/api", tags=["Swap Requests"])

@router.post("/swap-requests")
async def send_swap_request(req: SwapRequestCreate, current_user=Depends(get_current_user)):
    swap_id = await send_swap_request(current_user["email"], req.to_email)
    if swap_id is None:
        return {"detail": "Already sent a pending request"}
    return {"swap_id": swap_id}

@router.get("/swap-requests")
async def get_swap_requests(current_user=Depends(get_current_user)):
    incoming, outgoing = await get_swap_requests(current_user["email"])
    return {"incoming": incoming, "outgoing": outgoing}

@router.put("/swap-requests/status")
async def update_swap_status(req: SwapStatusUpdate, current_user=Depends(get_current_user)):
    success = await update_swap_status(req.swap_id, req.status)
    return {"updated": success}

print("🚀 swap.py router loaded")
