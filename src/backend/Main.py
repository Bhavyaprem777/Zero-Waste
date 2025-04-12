from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image

app = FastAPI()

# 🔓 Allow all origins during development (do NOT use in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],              # Allow ALL origins (dev only)
    allow_credentials=True,
    allow_methods=["*"],              # Allow all HTTP methods
    allow_headers=["*"],              # Allow all headers
)

@app.post("/estimate-weight/")
async def estimate_weight(file: UploadFile = File(...)):
    try:
        # Read image data from upload
        image_data = await file.read()
        image = Image.open(BytesIO(image_data))

        # Mock AI model weight estimation
        estimated_weight = mock_estimate_weight(image)

        return JSONResponse(content={
            "food_item": file.filename,
            "estimated_weight": estimated_weight
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

def mock_estimate_weight(image: Image.Image):
    """
    Simulate a food weight estimator based on image size.
    Replace this with real ML logic later.
    """
    width, height = image.size
    return round(10 + 5 * (width * height) / 100000, 2)
